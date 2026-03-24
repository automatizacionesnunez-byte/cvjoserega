from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from app.core.db_service import db_service
from typing import List, Optional
import uuid

router = APIRouter()

class CVSaveRequest(BaseModel):
    id: Optional[str] = None
    user_id: str
    cv_data: dict
    title: str
    template_id: str = "modern"

@router.post("/")
async def save_cv(request: CVSaveRequest):
    try:
        data = {
            "user_id": request.user_id,
            "cv_data": request.cv_data,
            "template_id": request.template_id,
            "title": request.title,
            "updated_at": "now()"
        }
        if request.id:
            data["id"] = request.id
            res = db_service.get_client().table("cvs").upsert(data).execute()
        else:
            data["id"] = str(uuid.uuid4())
            res = db_service.get_client().table("cvs").insert(data).execute()
        return res.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{user_id}")
async def get_user_cvs(user_id: str):
    try:
        res = db_service.get_client().table("cvs").select("*").eq("user_id", user_id).order("updated_at", desc=True).execute()
        return res.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/get/{cv_id}")
async def get_cv_by_id(cv_id: str):
    try:
        res = db_service.get_client().table("cvs").select("*").eq("id", cv_id).single().execute()
        return res.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{cv_id}")
async def delete_cv(cv_id: str):
    try:
        res = db_service.get_client().table("cvs").delete().eq("id", cv_id).execute()
        return {"status": "deleted", "id": cv_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/duplicate/{cv_id}")
async def duplicate_cv(cv_id: str):
    try:
        # 1. Fetch original
        orig = db_service.get_client().table("cvs").select("*").eq("id", cv_id).single().execute()
        if not orig.data:
            raise HTTPException(status_code=404, detail="CV no encontrado")
        
        # 2. Create copy
        new_data = orig.data.copy()
        new_data["id"] = str(uuid.uuid4())
        new_data["title"] = f"{new_data['title']} (Copia)"
        new_data["updated_at"] = "now()"
        
        res = db_service.get_client().table("cvs").insert(new_data).execute()
        return res.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
