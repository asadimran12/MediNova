import requests
import os
from dotenv import load_dotenv

load_dotenv()

def test_chat():
    url = "http://127.0.0.1:8000/chat/"
    payload = {"message": "Hello, how are you?"}
    try:
        response = requests.post(url, json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_chat()
