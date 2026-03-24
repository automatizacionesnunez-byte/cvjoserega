from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.ai_service import ai_service

router = APIRouter()

class GenerationRequest(BaseModel):
    cv_data: dict
    job_description: str
    company_name: str
    recipient_name: str = "Responsable de Selección"

@router.post("/recommendation-letter")
async def generate_letter(request: GenerationRequest):
    prompt = f"""
    Genera una carta de presentación altamente personalizada para esta empresa.
    
    CANDIDATO (JSON): {request.cv_data}
    EMPRESA: {request.company_name}
    OFERTA: {request.job_description}
    DESTINATARIO: {request.recipient_name}
    
    La carta debe ser profesional, persuasiva y resaltar el "Match" perfecto entre el candidato y el puesto.
    """
    try:
        letter = await ai_service.chat_completion(prompt)
        return {"content": letter}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/email-hook")
async def generate_email_hook(request: GenerationRequest):
    prompt = f"""
    Genera un "Hook" de email corto (máximo 3 párrafos) para contactar directamente a {request.recipient_name} en {request.company_name}.
    
    CANDIDATO: {request.cv_data.get('personal_info', {}).get('name', 'Candidato')}
    VALOR DIFERENCIAL: Resalta un punto clave del CV que encaje con la oferta.
    
    Debe ser breve, directo y llamar a la acción (pedir una llamada o feedback).
    """
    try:
        hook = await ai_service.chat_completion(prompt)
        return {"content": hook}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
