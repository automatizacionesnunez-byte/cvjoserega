import asyncio
from app.core.scraper_service import scraper_service

async def main():
    print("Iniciando scraper...")
    try:
        results = await scraper_service.find_recruiters("Google")
        print("Scraper encontrado:", results)
    except Exception as e:
        print("Scraper error:", e)

if __name__ == "__main__":
    asyncio.run(main())
