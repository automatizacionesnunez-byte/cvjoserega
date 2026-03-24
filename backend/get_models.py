import requests

api_key = "8fa216489b794cac82cbf824d4df9c73.WGcBO_jcY2QAm3EtJA43p9Qf"
url = "https://api.siliconflow.cn/v1/models"

headers = {
    "Authorization": f"Bearer {api_key}"
}

try:
    resp = requests.get(url, headers=headers)
    print("Status:", resp.status_code)
    if resp.status_code == 200:
        models = resp.json().get('data', [])
        print("Models available:", [m['id'] for m in models[:5]])
    else:
        print("Error:", resp.text)
except Exception as e:
    print("Exception:", e)
