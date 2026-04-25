from groq import Groq
import os
import json
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def analyze_news(text: str) -> dict:
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

    # Clean all markdown variations
    if "```json" in raw:
        raw = raw.split("```json")[1].split("```")[0]
    elif "```" in raw:
        raw = raw.split("```")[1].split("```")[0]

    raw = raw.strip()

    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        # Find JSON object in response
        start = raw.find("{")
        end = raw.rfind("}") + 1
        if start != -1 and end > start:
            return json.loads(raw[start:end])
        raise ValueError("Could not parse JSON from response")