from fastapi import APIRouter, File, UploadFile, HTTPException
from app.core.db_service import db_service
import uuid

router = APIRouter()

@router.post("/upload-photo")
async def upload_photo(file: UploadFile = File(...)):
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="El archivo no es una imagen")
        
    try:
        client = db_service.get_client()
        content = await file.read()
        
        # Generar nombre único
        ext = file.filename.split('.')[-1]
        filename = f"{uuid.uuid4()}.{ext}"
        filepath = f"photos/{filename}"
        
        # Subir a Supabase Storage: 'cv_assets' Bucket
        res = client.storage.from_('cv_assets').upload(
            path=filepath, 
            file=content, 
            file_options={"content-type": file.content_type}
        )
        
        # Obtener la URL publica
        public_url = client.storage.from_('cv_assets').get_public_url(filepath)
        
        return {"url": public_url, "path": filepath}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error subiendo el archivo a Supabase: {str(e)}")
