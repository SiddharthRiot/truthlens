from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_analyze():
    response = client.post("/api/analyze", json={
        "text": "This is a test news article about politics and corruption."
    })
    assert response.status_code == 200
    assert response.json()["success"] == True