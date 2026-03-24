from fastapi import APIRouter, HTTPException
from typing import Optional
from app.core.scraper_service import scraper_service
import urllib.parse

router = APIRouter()

@router.get("/leads")
async def get_leads(company_name: str, company_url: Optional[str] = None):
    try:
        # If a URL is provided, try to extract the base domain
        domain = "company.com"
        search_query = company_name
        
        if company_url:
            parsed_url = urllib.parse.urlparse(company_url)
            domain = parsed_url.netloc.replace("www.", "")
            if domain:
                search_query += f" OR site:{domain}"
                
        results = await scraper_service.find_recruiters(search_query)
        
        # Enrich with predicted emails using the exact domain
        for lead in results:
            lead["emails"] = scraper_service.predict_email(lead["name"], domain)
            
        return {"company": company_name, "domain": domain, "results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al buscar leads: {str(e)}")
