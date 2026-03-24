import requests

# Test the backend /api/analyze endpoint which uses the AI
try:
    response = requests.post(
        "http://127.0.0.1:8000/api/analyze",
        json={
            "cv_text": "Experiencia en Python, React. 5 años trabajando como desarrollador.",
            "job_description": "Buscamos desarrollador Fullstack con Python y React. Al menos 3 años de experiencia."
        }
    )
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error testing backend: {e}")
