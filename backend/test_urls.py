import urllib.request
import json
import ssl

api_key = "8fa216489b794cac82cbf824d4df9c73.WGcBO_jcY2QAm3EtJA43p9Qf"
# The API key matches the Zhipu AI / BigModel Open Platform exactly. Let's test it.
url = "https://open.bigmodel.cn/api/paas/v4/chat/completions"

data = {
    "model": "glm-4",
    "messages": [{"role": "user", "content": "Hola"}],
    "max_tokens": 10
}
req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'))
req.add_header('Authorization', f'Bearer {api_key}')
req.add_header('Content-Type', 'application/json')

try:
    context = ssl._create_unverified_context()
    response = urllib.request.urlopen(req, context=context, timeout=10)
    print("SUCCESS ZHIPU:", json.loads(response.read().decode('utf-8')))
except Exception as e:
    print("FAILED ZHIPU:", e)

# Test SiliconFlow just in case
req_sf = urllib.request.Request("https://api.siliconflow.cn/v1/chat/completions", data=json.dumps(data).encode('utf-8'))
req_sf.add_header('Authorization', f'Bearer {api_key}')
req_sf.add_header('Content-Type', 'application/json')
try:
    response = urllib.request.urlopen(req_sf, context=context, timeout=10)
    print("SUCCESS SILICONFLOW:", json.loads(response.read().decode('utf-8')))
except Exception as e:
    print("FAILED SILICONFLOW:", e)

