import asyncio
from services.scraper import scrape_url

def test_scraper():
    result = asyncio.run(scrape_url("https://www.bbc.com"))
    assert len(result) > 0
    print("Scraper working:", result[:100])