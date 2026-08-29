import os

from dotenv import load_dotenv
from openai import OpenAI


load_dotenv()


client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def generate_general_answer(
    question: str
) -> str:

    response = client.responses.create(
        model="gpt-5-mini",
     instructions=(
    "DocBrainLLM, eğitim odaklı bir asistandır. "
    "Eğitim, yazılım, programlama, yapay zeka ve teknik soruları cevapla. "
    "Basit soruları 2-4 cümlede, doğrudan cevapla. "
    "Kullanıcı detay istemedikçe liste, örnek veya uzun açıklama ekleme. "
    "Konu kapsam dışındaysa cevap vermek yerine eğitim odaklı olduğunu belirt."
),
        input=question
    )

    return response.output_text