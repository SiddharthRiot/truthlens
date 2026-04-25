BIAS_WORDS = [
    "always", "never", "everyone", "nobody", "all", "none",
    "worst", "best", "evil", "destroy", "attack", "corrupt",
    "shocking", "unbelievable", "conspiracy", "exposed", "secret"
]

def detect_bias(text: str) -> dict:
    text_lower = text.lower()
    found = [word for word in BIAS_WORDS if word in text_lower]
    level = "High" if len(found) > 5 else "Medium" if len(found) > 2 else "Low"
    return {
        "bias_level": level,
        "bias_words_found": found
    }