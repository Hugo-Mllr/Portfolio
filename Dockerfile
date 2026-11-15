# syntax=docker/dockerfile:1

# --- Build : site statique Astro ---
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci
COPY . .
ARG SITE_URL=https://example.com
ENV SITE_URL=$SITE_URL
RUN npm run build

# --- Runtime : nginx non privilégié, fichiers statiques uniquement ---
FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:8080/fr/ || exit 1
