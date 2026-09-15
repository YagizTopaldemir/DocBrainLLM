import os

from dotenv import load_dotenv
from openai import OpenAI


load_dotenv()


client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


EMBEDDING_MODEL = "text-embedding-3-small"


def get_embedding(text: str) -> list[float]:

    if not text or not text.strip():
        raise ValueError("Embedding için boş metin gönderilemez.")

    text = text.strip()

    response = client.embeddings.create(
        model=EMBEDDING_MODEL,
        input=text
    )

    return response.data[0].embedding