import os
from supabase import create_client, Client

class DBService:
    def __init__(self):
        # Initializing the client securely with provided keys
        self.supabase_url = os.environ.get("SUPABASE_URL")
        self.supabase_key = os.environ.get("SUPABASE_SERVICE_KEY")
        
        self.client: Client | None = None
        if self.supabase_url and self.supabase_key:
            self.client = create_client(self.supabase_url, self.supabase_key)
            
    def get_client(self) -> Client:
        if not self.client:
            raise Exception("Supabase client is not initialized. Please check your .env file.")
        return self.client

db_service = DBService()
