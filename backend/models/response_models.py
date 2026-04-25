from pydantic import BaseModel
from typing import List

class AnalysisResponse(BaseModel):
    trust_score: int
    verdict: str
    verdict_color: str
    bias_level: str
    emotional_language: str
    clickbait: str
    suspicious_phrases: List[str]
    summary: str
    positive_signals: List[str]
    negative_signals: List[str]