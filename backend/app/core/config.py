from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "CV-Pilot API"
    VERSION: str = "1.0.0"
    
    # AI Keys
    GROQ_API_KEY: Optional[str] = None
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "llama3"
    
    # Generic OpenAI Compatible API
    OPENAI_API_KEY: Optional[str] = None
    OPENAI_BASE_URL: Optional[str] = None
    OPENAI_MODEL: str = "deepseek-v3.1:671b-cloud"
    
    # Supabase (SaaS)
    SUPABASE_URL: Optional[str] = None
    SUPABASE_SERVICE_KEY: Optional[str] = None
    SUPABASE_ANON_KEY: Optional[str] = None
    
    class Config:
        env_file = ".env"
        extra = "allow" # To prevent "extra_forbidden" errors with other .env vars

settings = Settings()
