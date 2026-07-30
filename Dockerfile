# Etapa 1: build del sitio estático (output: "export" → /app/out)
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: nginx sirve los estáticos (TLS lo maneja el nginx del host/VPS)
FROM nginx:alpine
COPY nginx.container.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html
