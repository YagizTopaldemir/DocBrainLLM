from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
import uuid

import os
import shutil

from app.services.vector_store import create_collection
from app.services.rag import ask_question
from app.services.ingestion import process_document
from app.services.general_chat import generate_general_answer
from app.services.topic_summary import summarize_topic


MAX_FILE_SIZE = 20 * 1024 * 1024


app = FastAPI(
    title="DocBrainLLM AI Service",
    version="1.0.0"
)


create_collection()


class ChatRequest(BaseModel):
    question: str


class TopicSummaryRequest(BaseModel):
    topic: str


class PDFQuestionRequest(BaseModel):
    document_id: int
    question: str


@app.get("/")
def root():
    return {
        "message": "DocBrainLLM AI Service çalışıyor."
    }


@app.post("/api/pdf/upload")
async def upload_pdf(
    file: UploadFile = File(...)
):

    file_header = await file.read(5)

    if file_header != b"%PDF-":
     raise HTTPException(
        status_code=400,
        detail="Geçersiz PDF dosyası."
    )

    await file.seek(0)

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

    upload_dir = "uploads"

    os.makedirs(upload_dir, exist_ok=True)

    safe_filename = f"{uuid.uuid4()}.pdf"

    file_path = os.path.join(
      upload_dir,
    safe_filename
       )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    document_id = 1

    chunk_count = process_document(
        file_path=file_path,
        document_id=document_id
    )

    return {
        "message": "PDF başarıyla işlendi.",
        "document_id": document_id,
        "chunk_count": chunk_count
    }


@app.post("/api/pdf/ask")
def pdf_ask(request: PDFQuestionRequest):

    result = ask_question(
        question=request.question,
        document_id=request.document_id
    )

    return result


@app.post("/api/chat")
def chat(request: ChatRequest):

    answer = generate_general_answer(
        question=request.question
    )

    return {
        "answer": answer
    }


@app.post("/api/topic-summary")
def topic_summary(request: TopicSummaryRequest):

    summary = summarize_topic(
        topic=request.topic
    )

    return {
        "summary": summary
    }