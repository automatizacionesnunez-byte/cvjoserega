# CV-Pilot SaaS - Guía de Despliegue en Producción 🚀

Este repositorio contiene el código completo para desplegar **CV-Pilot** en cualquier VPS (Virtual Private Server) usando Docker.

## 🏗️ Requisitos en el Servidor
- **Docker** y **Docker Compose** instalados.
- Un subdominio o IP pública accesible.
- Claves de **Supabase** (URL y Anon Key).
- Clave de **OpenAI Compatible API** (SiliconFlow, DeepSeek, etc.).

## 🛠️ Configuración (Pasos Obligatorios)

### 1. Variables de Entorno del Sistema
Crea un archivo `.env` en la raíz del proyecto para que Docker Compose pueda leer las variables de construcción del frontend:

```bash
# Archivo: .env (en la raíz)
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
NEXT_PUBLIC_API_URL=http://tu-ip-o-dominio:8000
```

### 2. Variables del Backend
Crea un archivo `.env` dentro de la carpeta `backend/`:

```bash
# Archivo: backend/.env
OPENAI_API_KEY=tu_api_key
OPENAI_BASE_URL=https://api.siliconflow.cn/v1 # O el de tu proveedor
OPENAI_MODEL=deepseek-v3.1:671b-cloud
SUPABASE_URL=tu_supabase_url
SUPABASE_SERVICE_KEY=tu_service_role_key
```

## 🚀 Despliegue con Un Solo Comando

Desde la raíz del proyecto:

```bash
docker-compose up -d --build
```

Esto hará:
1.  **Construir el Frontend**: Compilará Next.js (esto puede tardar unos minutos).
2.  **Construir el Backend**: Instalará Python y los drivers de scraping.
3.  **Iniciar**: Los servicios estarán disponibles en los puertos **3000** (Web) y **8000** (API).

## 🛡️ Configuración de Proxy (Recomendado)
Para producción, se recomienda usar **Nginx** o **Caddy** como proxy inverso para habilitar HTTPS (SSL) y mapear los puertos a nombres de dominio:
- `cvpilot.com` -> Puerto 3000
- `api.cvpilot.com` -> Puerto 8000

---

## 🔧 Mantenimiento
- **Ver Logs**: `docker-compose logs -f`
- **Detener**: `docker-compose down`
- **Actualizar**: `git pull origin main && docker-compose up -d --build`

---
*Hecho para el equipo de Automatizaciones Nuñez Byte. Built for Winners.*
