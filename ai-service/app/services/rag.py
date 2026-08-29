from app.services.retrieval import retrieve_relevant_chunks
from app.services.generation import generate_answer


def ask_question(
    question: str,
    document_id: int,
    limit: int = 5
) -> dict:

    results = retrieve_relevant_chunks(
        query=question,
        document_id=document_id,
        limit=limit
    )

    context_parts = []

    for result in results:
        text = result.payload.get("text")
        page = result.payload.get("page")

        print("SCORE:", result.score)
        print("PAGE:", page)
        print("TEXT:", text)

        if text:
            context_parts.append(
                f"[Sayfa {page}]\n{text}"
            )

    context = "\n\n".join(context_parts)

    answer = generate_answer(
        question=question,
        context=context
    )

    return answer