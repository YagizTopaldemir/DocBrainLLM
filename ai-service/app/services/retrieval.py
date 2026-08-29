from app.services.embedding import get_embedding
from app.services.vector_store import search_similar


def retrieve_relevant_chunks(
    query: str,
    document_id: int,
    limit: int = 5
):
    query_vector = get_embedding(query)

    results = search_similar(
        vector=query_vector,
        document_id=document_id,
        limit=limit
    )

    return results