from app.services.document import extract_pages_from_pdf
from app.services.chunking import split_text
from app.services.embedding import get_embedding
from app.services.vector_store import insert_vector


def process_document(
    file_path: str,
    document_id: int
):
    try:
        pages = extract_pages_from_pdf(file_path)

        if not pages:
            raise ValueError(
                "PDF'den okunabilir metin çıkarılamadı."
            )

        chunk_index = 0

        for page_data in pages:

            page_number = page_data["page"]
            page_text = page_data["text"]

            chunks = split_text(page_text)

            for chunk in chunks:

                if not chunk.strip():
                    continue

                vector = get_embedding(chunk)

                insert_vector(
                    vector=vector,
                    document_id=document_id,
                    chunk_index=chunk_index,
                    text=chunk,
                    page=page_number
                )

                chunk_index += 1

        if chunk_index == 0:
            raise ValueError(
                "PDF işlenemedi veya içerik bulunamadı."
            )

        return chunk_index

    except Exception as e:
        raise RuntimeError(
            f"PDF işleme sırasında hata oluştu: {str(e)}"
        )