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


def create_collection():
    collections = client.get_collections().collections

    existing_collections = [
        collection.name
        for collection in collections
    ]

    if COLLECTION_NAME not in existing_collections:
        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(
                size=1536,
                distance=Distance.COSINE,
            ),
        )


def insert_vector(
    vector: list[float],
    document_id: int,
    chunk_index: int,
    text: str,
    page: int | None = None,
):
    point = PointStruct(
        id=str(uuid4()),
        vector=vector,
        payload={
            "document_id": document_id,
            "chunk_index": chunk_index,
            "page": page,
            "text": text,
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
    score_threshold: float = 0.5,
):
    results = client.query_points(
        collection_name=COLLECTION_NAME,
        query=vector,
        query_filter=Filter(
            must=[
                FieldCondition(
                    key="document_id",
                    match=MatchValue(value=document_id),
                )
            ]
        ),
        limit=limit,
        score_threshold=score_threshold,
    )

    return results.points


def close():
    client.close()