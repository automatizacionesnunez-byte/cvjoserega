from playwright.async_api import async_playwright
import urllib.parse
from bs4 import BeautifulSoup
import asyncio

class ScraperService:
    async def find_recruiters(self, company_name: str, role: str = "Recruiter"):
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
            )
            page = await context.new_page()
            
            # Google Dorking for LinkedIn profiles
            query = f'site:linkedin.com/in "{role}" "{company_name}"'
            search_url = f"https://www.google.com/search?q={urllib.parse.quote(query)}"
            
            await page.goto(search_url)
            # Wait for search results
            await page.wait_for_selector("div.g")
            
            content = await page.content()
            soup = BeautifulSoup(content, 'html.parser')
            
            leads = []
            for g in soup.find_all('div', class_='g'):
                title = g.find('h3')
                link = g.find('a')
                if title and link:
                    name_raw = title.text.split("-")[0].strip()
                    leads.append({
                        "name": name_raw,
                        "url": link['href'],
                        "company": company_name,
                        "role_found": role
                    })
            
            await browser.close()
            return leads[:5]

    def predict_email(self, name: str, domain: str):
        # Basic pattern prediction
        name_parts = name.lower().split()
        if len(name_parts) >= 2:
            first = name_parts[0]
            last = name_parts[1]
            return [
                f"{first}.{last}@{domain}",
                f"{first[0]}{last}@{domain}",
                f"{first}@{domain}",
                f"{first}_{last}@{domain}"
            ]
        return [f"{name_parts[0]}@{domain}"]

scraper_service = ScraperService()
