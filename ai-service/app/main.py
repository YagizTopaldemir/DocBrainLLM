from fastapi import Depends, FastAPI, UploadFile, File, Header, HTTPException, Form
from pydantic import BaseModel, Field

import os
import shutil
import uuid

from dotenv import load_dotenv

from app.services.vector_store import create_collection
from app.services.rag import ask_question
from app.services.ingestion import process_document


load_dotenv()


MAX_FILE_SIZE = 20 * 1024 * 1024
UPLOAD_DIR = "uploads"
INTERNAL_API_SECRET = os.getenv("INTERNAL_API_SECRET")


app = FastAPI(
    title="DocBrainLLM AI Service",
    version="1.0.0"
)


def verify_internal_secret(
    x_internal_api_key: str = Header(default=None)
):
    if not INTERNAL_API_SECRET:
        raise HTTPException(
            status_code=500,
            detail="INTERNAL_API_SECRET yapılandırılmamış."
        )

    if x_internal_api_key != INTERNAL_API_SECRET:
        raise HTTPException(
            status_code=401,
            detail="Yetkisiz istek."
        )


@app.on_event("startup")
def startup():
    create_collection()






class PDFQuestionRequest(BaseModel):
    document_id: int = Field(gt=0)
    question: str = Field(
        min_length=1,
        max_length=5000
    )


@app.get("/")
def root():
    return {
        "message": "DocBrainLLM AI Service çalışıyor."
    }


@app.post("/api/pdf/upload", dependencies=[Depends(verify_internal_secret)])
async def upload_pdf(
    document_id: int = Form(...),
    file: UploadFile = File(...)
):

    if document_id <= 0:
        raise HTTPException(
            status_code=400,
            detail="Geçersiz document_id."
        )

    # PDF header kontrolü
    file_header = await file.read(5)

    if file_header != b"%PDF-":
        raise HTTPException(
            status_code=400,
            detail="Geçersiz PDF dosyası."
        )

    await file.seek(0)

    # Dosya boyutu kontrolü
    file_size = 0

    while True:

        chunk = await file.read(1024 * 1024)

        if not chunk:
            break

        file_size += len(chunk)

        if file_size > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413,
                detail="PDF dosyası 20 MB'dan büyük olamaz."
            )

    await file.seek(0)

    os.makedirs(
        UPLOAD_DIR,
        exist_ok=True
    )

    file_path = os.path.join(
        UPLOAD_DIR,
        f"{uuid.uuid4()}.pdf"
    )

    try:

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer
            )

        chunk_count = process_document(
            file_path=file_path,
            document_id=document_id
        )

    except ValueError as e:

        raise HTTPException(
            status_code=422,
            detail=str(e)
        )

    except RuntimeError as e:

        raise HTTPException(
            status_code=422,
            detail=str(e)
        )

    except Exception:

        raise HTTPException(
            status_code=500,
            detail="PDF işlenirken beklenmeyen bir hata oluştu."
        )

    finally:

        if os.path.exists(file_path):
            os.remove(file_path)

        await file.close()

    return {
        "message": "PDF başarıyla işlendi.",
        "document_id": document_id,
        "chunk_count": chunk_count
    }


@app.post("/api/pdf/ask", dependencies=[Depends(verify_internal_secret)])
def pdf_ask(
    request: PDFQuestionRequest
):

    return ask_question(
        question=request.question.strip(),
        document_id=request.document_id
    )



