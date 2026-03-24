from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.ai_service import ai_service
from app.core.url_scraper_service import url_scraper_service
from app.core.prompts import HRPrompts
from typing import Optional
import json

router = APIRouter()

class AnalysisRequest(BaseModel):
    cv_text: str
    job_description: Optional[str] = None
    job_url: Optional[str] = None

@router.post("/analyze")
async def analyze_compatibility(request: AnalysisRequest):
    try:
        # Resolve Job Description from URL if provided
        job_context = request.job_description or ""
        if request.job_url:
            scraped_job = await url_scraper_service.extract_text_from_url(request.job_url)
            job_context += f"\n\n[Contexto extraído de {request.job_url}]:\n{scraped_job}"
            
        if not job_context.strip():
            raise HTTPException(status_code=400, detail="Debe proporcionar job_description o job_url")
            
        result = await ai_service.analyze_match_expert(request.cv_text, job_context)
        # Attempt to parse result if it's a string
        if isinstance(result, str):
            try:
                # Basic cleaning if AI returns markdown or text around JSON
                if "```json" in result:
                    result = result.split("```json")[1].split("```")[0].strip()
                elif "{" in result:
                    result = result[result.find("{"):result.rfind("}")+1]
                return json.loads(result)
            except:
                return {"raw_analysis": result}
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
