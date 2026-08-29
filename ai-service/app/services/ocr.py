import easyocr


reader = easyocr.Reader(
    ["tr", "en"]
)


def extract_text_from_image(
    file_path: str
) -> str:

    results = reader.readtext(file_path)

    texts = []

    for _, text, confidence in results:

        if confidence >= 0.5:
            texts.append(text)

    return "\n".join(texts)