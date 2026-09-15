from app.services.embedding import get_embedding
from app.services.vector_store import search_similar


def retrieve_relevant_chunks(
    query: str,
    document_id: int,
    limit: int = 5
):
    query = query.strip()

    if not query:
        raise ValueError("Soru boş olamaz.")

    if limit <= 0:
        raise ValueError("limit 0'dan büyük olmalıdır.")

    query_vector = get_embedding(query)

    return search_similar(
        vector=query_vector,
        document_id=document_id,
        limit=limit
    )