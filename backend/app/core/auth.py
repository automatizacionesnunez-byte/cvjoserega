from fastapi import Request, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.db_service import db_service

auth_scheme = HTTPBearer()

async def get_current_user(token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    \"\"\"
    Extracts the user from the Supabase JWT token.
    \"\"\"
    try:
        client = db_service.get_client()
        # Supabase Python client auth.get_user(jwt)
        res = client.auth.get_user(token.credentials)
        if not res.user:
            raise HTTPException(status_code=401, detail="Usuario no autenticado o token inválido")
        return res.user
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Error de autenticación: {str(e)}")
