import http.client, json
conn = http.client.HTTPConnection('127.0.0.1', 8001)
payload = json.dumps({"name":"Test User","email":"test@example.com","password":"password123"})
headers = {'Content-Type': 'application/json'}
conn.request('POST', '/auth/signup', body=payload, headers=headers)
res = conn.getresponse()
print(res.status, res.reason)
print(res.read().decode())
