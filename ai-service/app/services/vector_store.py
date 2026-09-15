from uuid import uuid4

from qdrant_client import QdrantClient
from qdrant_client.models import (
    Distance,
    VectorParams,
    PointStruct,
    Filter,
    FieldCondition,
    MatchValue,
)


client = QdrantClient(path="qdrant_data")

COLLECTION_NAME = "documents"
VECTOR_SIZE = 1536


def create_collection():

    collections = client.get_collections().collections

    if COLLECTION_NAME not in {
        collection.name for collection in collections
    }:

        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(
                size=VECTOR_SIZE,
                distance=Distance.COSINE,
            ),
        )


def insert_vector(
    vector: list[float],
    document_id: int,
    chunk_index: int,
    text: str,
    page: int | None = None,
    total_pages: int | None = None,
):

    if len(vector) != VECTOR_SIZE:
        raise ValueError(
            f"Embedding boyutu {VECTOR_SIZE} olmalıdır."
        )

    if not text or not text.strip():
        raise ValueError(
            "Boş chunk Qdrant'a eklenemez."
        )

    point = PointStruct(
        id=str(uuid4()),
        vector=vector,
        payload={
            "document_id": document_id,
            "chunk_index": chunk_index,
            "page": page,
            "total_pages": total_pages,
            "text": text.strip(),
        },
    )

    client.upsert(
        collection_name=COLLECTION_NAME,
        points=[point],
    )


def search_similar(
    vector: list[float],
    document_id: int,
    limit: int = 5,
):

    if len(vector) != VECTOR_SIZE:
        raise ValueError(
            f"Query vector boyutu {VECTOR_SIZE} olmalıdır."
        )

    if limit <= 0:
        raise ValueError(
            "limit 0'dan büyük olmalıdır."
        )

    results = client.query_points(
        collection_name=COLLECTION_NAME,
        query=vector,
        query_filter=Filter(
            must=[
                FieldCondition(
                    key="document_id",
                    match=MatchValue(
                        value=document_id
                    ),
                )
            ]
        ),
        limit=limit,
    )

    return results.points


def close():
    client.close()