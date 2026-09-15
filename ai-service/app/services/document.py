import pymupdf
import re


def clean_text(text: str) -> str:
    # Fazla boşlukları temizle
    text = re.sub(r"[ \t]+", " ", text)

    # Fazla satır boşluklarını azalt
    text = re.sub(r"\n{3,}", "\n\n", text)

    return text.strip()


def extract_pages_from_pdf(file_path: str) -> list[dict]:

    document = pymupdf.open(file_path)

    total_pages = len(document)

    pages = []

    for page_number, page in enumerate(document, start=1):

        text = page.get_text("text")

        text = clean_text(text)

        if not text:
            continue

        pages.append({
            "page": page_number,
            "total_pages": total_pages,
            "text": text
        })

    document.close()

    return pages