import os

from dotenv import load_dotenv
from openai import OpenAI


load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def generate_answer(
    question: str,
    context: str
) -> dict:

    response = client.responses.create(
        model="gpt-5-mini",

      instructions="""
Sen DocBrainLLM'sin. Yalnızca verilen DOKÜMAN BAĞLAMI ile cevap ver.

Kurallar:
- Cevabı sadece DOKÜMAN BAĞLAMI'na dayanarak oluştur.
- Kendi genel bilgini kullanma.
- Cevap bağlamda yoksa kesinlikle tahmin etme veya tamamlamaya çalışma.
- Bilgi yoksa: "Bu dokümanda bu konu hakkında bilgi bulunmuyor." de.
- Kaynak olarak yalnızca cevabı destekleyen sayfaları ekle.
- Cevabı destekleyen kaynak yoksa sources boş liste olsun.
""",

        input=f"""
DOKÜMAN BAĞLAMI:

{context}

KULLANICI SORUSU:

{question}
""",

        text={
            "format": {
                "type": "json_schema",
                "name": "document_answer",
                "schema": {
                    "type": "object",
                    "properties": {
                        "answer": {
                            "type": "string"
                        },
                        "sources": {
                            "type": "array",
                            "items": {
                                "type": "integer"
                            }
                        }
                    },
                    "required": [
                        "answer",
                        "sources"
                    ],
                    "additionalProperties": False
                },
                "strict": True
            }
        }
    )

    return response.output_text