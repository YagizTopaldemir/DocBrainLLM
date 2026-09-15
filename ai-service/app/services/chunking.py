import re


def split_text(
    text: str,
    chunk_size: int = 1000,
    overlap: int = 200
) -> list[str]:

    if overlap >= chunk_size:
        raise ValueError(
            "overlap, chunk_size değerinden küçük olmalıdır."
        )

    text = re.sub(r"\s+", " ", text).strip()

    if not text:
        return []

    sentences = re.split(
        r"(?<=[.!?])\s+",
        text
    )

    chunks = []
    current = ""

    for sentence in sentences:

        sentence = sentence.strip()

        if not sentence:
            continue

        # Normal durumda cümleyi mevcut chunk'a ekle
        if len(current) + len(sentence) + 1 <= chunk_size:
            current = (
                current + " " + sentence
            ).strip()

            continue

        # Mevcut chunk'ı kaydet
        if current:
            chunks.append(current)

        # Yeni chunk için overlap
        overlap_text = current[-overlap:] if current else ""

        # Çok uzun cümle
        if len(sentence) > chunk_size:

            words = sentence.split()

            current = overlap_text.strip()

            for word in words:

                if len(current) + len(word) + 1 <= chunk_size:
                    current = (
                        current + " " + word
                    ).strip()

                else:
                    chunks.append(current)

                    current = word

        else:
            current = (
                overlap_text + " " + sentence
            ).strip()

    if current:
        chunks.append(current)

    return chunks