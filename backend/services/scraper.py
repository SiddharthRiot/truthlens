import httpx
from bs4 import BeautifulSoup

async def scrape_url(url: str) -> str:
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(url)
            soup = BeautifulSoup(response.text, "html.parser")
            paragraphs = soup.find_all("p")
            text = " ".join([p.get_text() for p in paragraphs])
            return text[:5000]
    except Exception as e:
        return f"Error scraping URL: {str(e)}"