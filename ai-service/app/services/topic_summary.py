import os

from dotenv import load_dotenv
from openai import OpenAI


load_dotenv()


client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def summarize_topic(topic: str) -> str:

    response = client.responses.create(
        model="gpt-5-mini",
        instructions=(
            "Sen DocBrainLLM'sin, eğitim odaklı bir asistansın. "
            "Kullanıcının verdiği eğitim konusunu öğretici bir şekilde özetle. "
            "Ana kavramları, önemli noktaları ve aralarındaki ilişkileri açıkla. "
            "Özet anlaşılır ve orta uzunlukta olsun; gerektiğinde maddeler kullan. "
            "Kullanıcı detay istemedikçe gereksiz ayrıntıya girme. "
            "Konu eğitim, ders veya bilgi edinme ile ilgili değilse uzun cevap verme; "
            "yalnızca eğitim odaklı bir asistan olduğunu belirt."
        ),
        input=f"Şu eğitim konusunu özetle: {topic}",
        text={
            "verbosity": "medium"
        }
    )

    return response.output_text