import asyncio
from playwright.async_api import async_playwright
from bs4 import BeautifulSoup
import re

class URLScraperService:
    async def extract_text_from_url(self, url: str) -> str:
        """
        Visits a URL and extracts the visible text, focusing on job descriptions or about pages.
        Bypasses basic JS-rendered domains by waiting for network idle.
        """
        text_content = ""
        try:
            async with async_playwright() as p:
                browser = await p.chromium.launch(headless=True)
                context = await browser.new_context(
                    user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    viewport={"width": 1920, "height": 1080}
                )
                page = await context.new_page()
                
                # Navigate and wait for content to load
                await page.goto(url, wait_until="domcontentloaded", timeout=15000)
                # Quick wait to ensure dynamic job descriptions load
                await page.wait_for_timeout(2000)
                
                html_content = await page.content()
                await browser.close()
                
                # Extract logic via BeautifulSoup
                soup = BeautifulSoup(html_content, 'html.parser')
                
                # Remove useless tags
                for tag in soup(['script', 'style', 'nav', 'footer', 'iframe', 'noscript']):
                    tag.decompose()
                
                # Get text and clean it
                raw_text = soup.get_text(separator='\n')
                
                # Clean up empty lines and spaces
                lines = (line.strip() for line in raw_text.splitlines())
                chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
                text_content = '\n'.join(chunk for chunk in chunks if chunk)
                
        except Exception as e:
            text_content = f"Error scraping URL: {str(e)}"
            
        return text_content[:15000] # Limit context size

url_scraper_service = URLScraperService()
