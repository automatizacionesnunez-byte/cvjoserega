import os
import json
from groq import Groq
from openai import AsyncOpenAI
import ollama
from app.core.config import settings

class AIService:
    def __init__(self):
        self.openai_client = None
        self.groq_client = None
        
        if settings.OPENAI_API_KEY:
            self.openai_client = AsyncOpenAI(
                api_key=settings.OPENAI_API_KEY,
                base_url=settings.OPENAI_BASE_URL
            )
        elif settings.GROQ_API_KEY:
            self.groq_client = Groq(api_key=settings.GROQ_API_KEY)
        
    async def chat_completion(self, prompt: str, system_prompt: str = "Eres un experto en reclutamiento y optimización de currículums."):
        # 1. Intentar con proxy/OpenAI compatible (ej. el que pasaste con DeepSeek-v3.1)
        if self.openai_client:
            try:
                response = await self.openai_client.chat.completions.create(
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": prompt}
                    ],
                    model=settings.OPENAI_MODEL,
                    response_format={"type": "json_object"} if "json" in prompt.lower() else None,
                    max_tokens=2000
                )
                return response.choices[0].message.content
            except Exception as e:
                print(f"Error en OpenAI Compatible API: {e}. Reintentando con alternativas...")

        # 2. Reintentar con Groq
        if self.groq_client:
            try:
                chat_completion = self.groq_client.chat.completions.create(
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": prompt}
                    ],
                    model="llama3-8b-8192",
                    response_format={"type": "json_object"} if "json" in prompt.lower() else None
                )
                return chat_completion.choices[0].message.content
            except Exception as e:
                print(f"Error en Groq: {e}. Reintentando con Ollama...")
        
        # Fallback to Ollama
        try:
            response = ollama.chat(
                model=settings.OLLAMA_MODEL,
                messages=[
                    {'role': 'system', 'content': system_prompt},
                    {'role': 'user', 'content': prompt},
                ]
            )
            return response['message']['content']
        except Exception as e:
            print(f"Error en Ollama: {e}")
            
        # GACEFUL DEGRADATION: If all fails (e.g. 401/404 Invalid Token), return a mock JSON if requesting JSON
        prompt_lower = prompt.lower()
        system_lower = system_prompt.lower() if system_prompt else ""
        
        if "json" in prompt_lower or "json" in system_lower:
            # Check if it's a parsing request
            if "convierte el texto completo" in prompt_lower or "esquema exacto" in prompt_lower:
                return json.dumps({
                  "personal_info": {
                     "name": "Candidato de Prueba (Fallback)", "email": "test@cvpilot.com", "phone": "+34 600 000 000", "location": "Madrid, ES", "linkedin": "linkedin.com/in/test", "website": "", "summary": "Soy un candidato mock generado porque falló la API.", "photo_url": ""
                  },
                  "experience": [
                     {"company": "Tech Corp", "role": "Senior Developer", "start_date": "01/2020", "end_date": "", "present": True, "location": "Remote", "achievements": ["Incrementé ingresos un 20%", "Lideré equipo de 5"]}
                  ],
                  "education": [
                     {"institution": "Universidad Falsa", "degree": "Ingeniería", "start_date": "2015", "end_date": "2019", "present": False, "location": "Madrid"}
                  ],
                  "skills": {
                     "technical": ["Python", "React", "Docker"],
                     "soft": ["Liderazgo"],
                     "languages": [{"language": "Inglés", "level": "C1"}]
                  },
                  "custom_sections": []
                })
            else:
                # Default to Analysis Mock
                return json.dumps({
                    "match_score": 85,
                    "strengths": ["[MOCK] Experiencia Relevante", "[MOCK] Habilidades Técnicas Sólidas"],
                    "weaknesses": ["[MOCK] Faltan palabras clave específicas de la oferta"],
                    "structural_critique": "[MOCK] El formato es bueno pero los logros deben ser cuantificables.",
                    "actionable_corrections": [
                        {
                            "section": "Experience",
                            "issue": "Descripción de tareas sin impacto.",
                            "suggested_revision": "Redactar como: 'Logré X métrica usando Y herramienta'."
                        }
                    ],
                    "ats_keywords_missing": ["Docker", "Kubernetes"]
                })
            
        return "Error en servicios de IA. Respuesta de fallback generada."

    async def analyze_match_expert(self, cv_text: str, job_context: str):
        from app.core.prompts import HRPrompts
        prompt = f"CV:\n{cv_text}\n\nCONTEXTO DE TRABAJO:\n{job_context}"
        return await self.chat_completion(prompt, system_prompt=HRPrompts.EXPERT_SYSTEM_PROMPT + "\n" + HRPrompts.CV_ANALYSIS_PROMPT)

ai_service = AIService()
