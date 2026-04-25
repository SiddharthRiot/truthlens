from typing import Optional
import hashlib

cache = {}

def get_cache_key(text: str) -> str:
    return hashlib.md5(text.encode()).hexdigest()

def get_cached(text: str) -> Optional[dict]:
    key = get_cache_key(text)
    return cache.get(key)

def set_cache(text: str, result: dict):
    key = get_cache_key(text)
    cache[key] = result