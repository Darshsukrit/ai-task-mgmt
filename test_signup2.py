import urllib.request, json

url = 'http://127.0.0.1:8002/auth/signup'
data = json.dumps({"name": "Test User 2", "email": "test2@example.com", "password": "pass123"}).encode()
req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
with urllib.request.urlopen(req) as resp:
    print(resp.status)
    print(resp.read().decode())
