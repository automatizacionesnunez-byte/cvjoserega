from fastapi import APIRouter, File, UploadFile, HTTPException
import fitz
from app.core.ai_service import ai_service
from app.core.prompts import HRPrompts
import json

router = APIRouter()

@router.post("/parse")
async def parse_cv(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Solo se admiten archivos PDF")
    
    try:
        contents = await file.read()
        doc = fitz.open(stream=contents, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        
        # Use AI to structure the CV data into the precise schema
        prompt = HRPrompts.CV_PARSING_PROMPT + f"\n{text}\n----"
        
        structured_data = await ai_service.chat_completion(prompt)
        
        # Cleaning and parsing
        if "```json" in structured_data:
            structured_data = structured_data.split("```json")[1].split("```")[0].strip()
        elif "{" in structured_data:
            structured_data = structured_data[structured_data.find("{"):structured_data.rfind("}")+1]
            
        return json.loads(structured_data)
    except Exception as e:
        # Fallback to raw text if AI processing fails
        return {"raw_text": text, "error": f"IA parsing failed: {str(e)}"}
