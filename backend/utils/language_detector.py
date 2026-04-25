def detect_language(text: str) -> str:
    hindi_chars = set('अआइईउऊएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह')
    count = sum(1 for char in text if char in hindi_chars)
    return "hi" if count > 10 else "en"