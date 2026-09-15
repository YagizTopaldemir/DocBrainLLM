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

        payload = result.payload or {}

        text = payload.get("text")
        page = payload.get("page")

        if not text:
            continue

        print(
            f"SCORE: {result.score:.4f} | PAGE: {page}"
        )

        context_parts.append(
            f"[Sayfa {page}]\n{text}"
        )

    context = "\n\n".join(context_parts)

    print("\n========== RETRIEVAL ==========")
    print(f"Chunks: {len(context_parts)}")

    print("\n========== FINAL CONTEXT ==========")
    print(context)

    print("\n========== QUESTION ==========")
    print(question)

    return generate_answer(
        question=question,
        context=context
    )