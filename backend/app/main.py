from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import parser, analyzer, leads, generators, exports, advanced_ai, storage, cv_storage


app = FastAPI(title="CV-Pilot API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(parser.router, prefix="/api", tags=["Parser"])
app.include_router(analyzer.router, prefix="/api", tags=["Analyzer"])
app.include_router(leads.router, prefix="/api", tags=["Leads"])
app.include_router(generators.router, prefix="/api", tags=["Generators"])
app.include_router(exports.router, prefix="/api/export", tags=["Exports"])
app.include_router(advanced_ai.router, prefix="/api/ai", tags=["Advanced AI"])
app.include_router(cv_storage.router, prefix="/api/cvs", tags=["CV Storage"])
app.include_router(storage.router, prefix="/api/storage", tags=["Storage"])


@app.get("/")
async def root():
    return {"message": "Welcome to CV-Pilot API", "status": "online"}
