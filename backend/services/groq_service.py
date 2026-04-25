from groq import Groq
import os
import json
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

client = None
if api_key:
    client = Groq(api_key=api_key)


def analyze_news(text: str) -> dict:
    if client is None:
        return {
            "trust_score": 50,
            "verdict": "Suspicious",
            "verdict_color": "yellow",
            "bias_level": "Unknown",
            "emotional_language": "Unknown",
            "clickbait": "Maybe",
            "suspicious_phrases": [],
            "summary": "Mock response (API key not set)",
            "positive_signals": [],
            "negative_signals": []
        }

    prompt = f"""
    You are a fake news detection expert. Analyze the following news article and return ONLY a JSON response with no extra text, no markdown, no backticks.

    Return ONLY this JSON format:
    {{
        "trust_score": <number 0-100>,
        "verdict": "<Fake | Suspicious | Mostly True | Real>",
        "verdict_color": "<red | orange | yellow | green>",
        "bias_level": "<High | Medium | Low | None>",
        "emotional_language": "<High | Medium | Low | None>",
        "clickbait": "<Yes | No | Maybe>",
        "suspicious_phrases": ["<phrase1>", "<phrase2>"],
        "summary": "<2-3 line explanation of verdict in English>",
        "positive_signals": ["<signal1>", "<signal2>"],
        "negative_signals": ["<signal1>", "<signal2>"]
    }}

    Article:
    {text}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
    )

    raw = response.choices[0].message.content.strip()

    if "```json" in raw:
        raw = raw.split("```json")[1].split("```")[0]
    elif "```" in raw:
        raw = raw.split("```")[1].split("```")[0]

    raw = raw.strip()

    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        start = raw.find("{")
        end = raw.rfind("}") + 1
        if start != -1 and end > start:
            return json.loads(raw[start:end])
        raise ValueError("Could not parse JSON from response")