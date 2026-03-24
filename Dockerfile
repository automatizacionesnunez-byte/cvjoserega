# Stage 1: Build
FROM node:18-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Pass build-time environment variables (important for NEXT_PUBLIC_)
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_API_URL

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

# Stage 2: Serve
FROM node:18-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

# Re-copy public and static assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Next.js standalone mode (outputs to .next/standalone/server.js)
COPY --from=builder /app/.next/standalone ./

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Change server.js entry point (standard for standalone)
CMD ["node", "server.js"]
