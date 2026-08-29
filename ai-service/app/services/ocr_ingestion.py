from app.services.ocr import extract_text_from_image
from app.services.chunking import split_text
from app.services.embedding import get_embedding
from app.services.vector_store import insert_vector


def process_image(
    file_path: str,
    document_id: int
):

    text = extract_text_from_image(file_path)

    if not text.strip():
        return 0


    chunks = split_text(text)

    chunk_index = 0

  
    for chunk in chunks:

        vector = get_embedding(chunk)

        insert_vector(
            vector=vector,
            document_id=document_id,
            chunk_index=chunk_index,
            text=chunk,
            page=None
        )

        chunk_index += 1

    return chunk_index