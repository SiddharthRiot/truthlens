import httpx
import os

async def get_related_articles(query: str) -> list:
    api_key = os.getenv("NEWS_API_KEY")
    url = f"https://newsapi.org/v2/everything?q={query}&pageSize=5&apiKey={api_key}"

    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        data = response.json()

    articles = []
    for article in data.get("articles", []):
        articles.append({
            "title": article["title"],
            "source": article["source"]["name"],
            "url": article["url"],
            "publishedAt": article["publishedAt"]
        })

    return articles