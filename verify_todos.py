import requests
import sys

BASE_URL = "http://localhost:8000"

def run_tests():
    try:
        # 1. Create - Using ID 2 since 1 might exist
        print("Testing CREATE...")
        resp = requests.post(f"{BASE_URL}/todos", json={"id": 2, "title": "PyTest", "description": "Auto"})
        if resp.status_code != 200:
             print(f"CREATE failed: {resp.text}")
             sys.exit(1)
        print("CREATE OK")

        # 2. List
        print("Testing LIST...")
        resp = requests.get(f"{BASE_URL}/todos")
        data = resp.json()
        if not any(t['id'] == 2 for t in data):
             print("LIST failed: item 2 not found")
             sys.exit(1)
        print("LIST OK")

        # 3. Update
        print("Testing UPDATE...")
        resp = requests.put(f"{BASE_URL}/todos/2", json={"id": 2, "title": "PyTest Updated", "completed": True})
        if resp.status_code != 200:
             print(f"UPDATE failed: {resp.text}")
             sys.exit(1)
        if not resp.json()['completed']:
             print("UPDATE failed: not completed")
             sys.exit(1)
        print("UPDATE OK")

        # 4. Delete
        print("Testing DELETE...")
        resp = requests.delete(f"{BASE_URL}/todos/2")
        if resp.status_code != 200:
             print(f"DELETE failed: {resp.text}")
             sys.exit(1)
        
        resp = requests.get(f"{BASE_URL}/todos/2")
        if resp.status_code != 404:
             print("DELETE failed: Item still exists")
             sys.exit(1)
        print("DELETE OK")

        # 5. Root Redirect
        print("Testing ROOT REDIRECT...")
        resp = requests.get(f"{BASE_URL}/", allow_redirects=False)
        if resp.status_code != 307:
             print(f"ROOT REDIRECT failed: Status {resp.status_code}")
             # Depending on FastAPI version/starlette, it might be 307 or 302. Let's check location header if 3xx
             if not (300 <= resp.status_code < 400):
                 sys.exit(1)
        if "/docs" not in resp.headers['location']:
             print(f"ROOT REDIRECT failed: Unexpected location {resp.headers.get('location')}")
             sys.exit(1)
        print("ROOT REDIRECT OK")

        print("ALL TESTS PASSED")

    except Exception as e:
        print(f"Test Exception: {e}")
        sys.exit(1)

if __name__ == "__main__":
    run_tests()
