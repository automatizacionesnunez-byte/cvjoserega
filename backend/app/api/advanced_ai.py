from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.ai_service import ai_service
import json

router = APIRouter()

class TranslationRequest(BaseModel):
    cv_data: dict
    target_language: str

class InterviewPrepRequest(BaseModel):
    cv_data: dict
    job_description: str

@router.post("/translate-cv")
async def translate_cv(request: TranslationRequest):
    prompt = f"""
    Traduce EXACTAMENTE la estructura de este JSON de Curriculum al idioma '{request.target_language}'.
    
    JSON ORIGINAL:
    {json.dumps(request.cv_data, ensure_ascii=False)}
    
    CRÍTICO: Retorna única y estrictamente el JSON entero traducido. Mismo formato y llaves de objeto, solo traduce los valores. No añadas nada más.
    """
    try:
        translated_json_str = await ai_service.chat_completion(prompt)
        # Attempt minimal cleanup
        if "```json" in translated_json_str:
            translated_json_str = translated_json_str.split("```json")[1].split("```")[0].strip()
        elif "{" in translated_json_str:
            translated_json_str = translated_json_str[translated_json_str.find("{"):translated_json_str.rfind("}")+1]
            
        return json.loads(translated_json_str)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Translation failed: {str(e)}")

@router.post("/interview-prep")
async def interview_prep(request: InterviewPrepRequest):
    prompt = f"""
    Eres un Headhunter preparando a un candidato para una entrevista para esta posición.
    
    OFERTA DE EMPLEO:
    {request.job_description}
    
    PERFIL DE CANDIDATO:
    {json.dumps(request.cv_data, ensure_ascii=False)}
    
    Genera un JSON con 5 preguntas que MUY PROBABLEMENTE le harán en la entrevista.
    Mapea cada pregunta al siguiente formato:
    [
        {{
            "question": "Pregunta",
            "reason": "Por qué se la van a preguntar (basado en su CV o la oferta)",
            "suggested_answer_strategy": "Cómo debería responder estratégicamente usando elementos de su CV"
        }}
    ]
    """
    try:
        data = await ai_service.chat_completion(prompt)
        if "```json" in data:
            data = data.split("```json")[1].split("```")[0].strip()
        elif "[" in data:
            data = data[data.find("["):data.rfind("]")+1]
        return json.loads(data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Interview prep failed: {str(e)}")

class CoverLetterRequest(BaseModel):
    cv_data: dict
    job_url: str

@router.post("/generate-cover-letter")
async def generate_cover_letter(request: CoverLetterRequest):
    prompt = f"""
    Eres un experto en redacción de cartas de presentación profesionales.
    
    PERFIL DEL CANDIDATO (CV):
    {json.dumps(request.cv_data, ensure_ascii=False)}
    
    URL DE LA OFERTA: {request.job_url}
    
    Genera una carta de presentación profesional en español que:
    1. Sea personalizada conectando el perfil del candidato con la posición
    2. Destaque 2-3 logros cuantificables del CV
    3. Muestre entusiasmo genuino por la empresa
    4. Tenga un tono profesional pero cercano
    5. Sea de 3-4 párrafos (máximo 300 palabras)
    6. Incluya saludo y despedida formal
    
    Retorna SOLO el texto de la carta, sin formato JSON ni explicaciones adicionales.
    """
    try:
        letter = await ai_service.chat_completion(prompt)
        return {"letter": letter.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Cover letter generation failed: {str(e)}")

class LinkedInRequest(BaseModel):
    profile_url: str

@router.post("/analyze-linkedin")
async def analyze_linkedin(request: LinkedInRequest):
    # Prompt to analyze and suggest improvements
    prompt = f"""
    Eres un experto en optimización de perfiles de LinkedIn (Top Voice).
    
    PERFIL A ANALIZAR: {request.profile_url}
    
    Genera un informe detallado en formato JSON con la siguiente estructura:
    {{
        "score": 0-100,
        "headline": {{
            "current": "...",
            "suggested": "...",
            "score": 0-100
        }},
        "summary": {{
            "current": "...",
            "suggested": "...",
            "score": 0-100
        }},
        "skills": {{
            "missing": ["...", "..."],
            "score": 0-100
        }},
        "experience": {{
            "tip": "...",
            "score": 0-100
        }},
        "overall_tips": ["...", "..."]
    }}
    
    Analiza basándote en estándares de la industria para perfiles similares al que se deduce de la URL (o genera una auditoría genérica de altísima calidad si no puedes acceder).
    IMPORTANTE: Retorna ÚNICAMENTE el JSON.
    """
    try:
        data = await ai_service.chat_completion(prompt)
        if "```json" in data:
            data = data.split("```json")[1].split("```")[0].strip()
        elif "{" in data:
            data = data[data.find("{"):data.rfind("}")+1]
        return json.loads(data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LinkedIn analysis failed: {str(e)}")
