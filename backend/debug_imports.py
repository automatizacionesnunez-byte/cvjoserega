print("Testing imports...")
try:
    import fastapi
    print("fastapi OK")
    import uvicorn
    print("uvicorn OK")
    import fitz
    print("fitz OK")
    from supabase import create_client
    print("supabase OK")
    import docx
    print("python-docx OK")
    import playwright
    print("playwright OK")
    import jinja2
    print("jinja2 OK")
    print("All core imports OK")
except Exception as e:
    print(f"FAILED IMPORT: {e}")
