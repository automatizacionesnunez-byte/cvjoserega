import os
import requests

api_key = "8fa216489b794cac82cbf824d4df9c73.WGcBO_jcY2QAm3EtJA43p9Qf"
base_url = "https://open.bigmodel.cn/api/paas/v4/"

# Some platforms use the hostname of the gateway, what if we just test SiliconFlow?
# SiliconFlow base url is https://api.siliconflow.cn/v1/

def test_api(url, model):
    try:
        if not url.endswith("/"): url += "/"
        headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
        data = {"model": model, "messages": [{"role": "user", "content": "Hola"}], "max_tokens": 10}
        resp = requests.post(url + "chat/completions", headers=headers, json=data, timeout=5)
        print(f"[{url}] {model} => Status: {resp.status_code}")
        if resp.status_code == 200:
            print("Response:", resp.json())
    except Exception as e:
        print(f"[{url}] Error:", e)

test_api("https://open.bigmodel.cn/api/paas/v4", "glm-4.6:cloud")
test_api("https://api.siliconflow.cn/v1", "deepseek-v3.1:671b-cloud")
test_api("https://api.openai.com/v1", "gpt-oss:120b-cloud")
