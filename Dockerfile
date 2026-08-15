# syntax=docker/dockerfile:1.7

# Build the Next.js standalone runtime separately so production does not ship
# source maps, development dependencies, or the full node_modules tree.
FROM node:22-bookworm-slim AS frontend-builder
WORKDIR /workspace/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend ./
ARG NEXT_PUBLIC_API_URL=/api
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm run build


# A single runtime image intentionally hosts the web UI and the Flask API.
# Nginx exposes one port and routes /api/* internally to Gunicorn.
FROM node:22-bookworm-slim AS runtime
ENV NODE_ENV=production \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=3000 \
    HOSTNAME=127.0.0.1 \
    PATH=/opt/venv/bin:$PATH

RUN apt-get update \
    && apt-get install --no-install-recommends -y python3 python3-venv nginx supervisor tini \
    && rm -rf /var/lib/apt/lists/* /etc/nginx/sites-enabled/default \
    && useradd --system --create-home --uid 10001 app

WORKDIR /opt/backend
COPY backend/requirements.txt ./
RUN python3 -m venv /opt/venv \
    && pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

COPY backend ./

WORKDIR /opt/frontend
COPY --from=frontend-builder /workspace/frontend/.next/standalone ./
COPY --from=frontend-builder /workspace/frontend/.next/static ./.next/static
COPY --from=frontend-builder /workspace/frontend/public ./public

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/leomd317.conf
COPY docker/start-backend.sh /usr/local/bin/start-backend
RUN chmod +x /usr/local/bin/start-backend \
    && mkdir -p /var/lib/nginx /var/cache/nginx /var/log/nginx \
    && chown -R app:app /opt/backend /opt/frontend /var/lib/nginx /var/cache/nginx /var/log/nginx

USER app

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=25s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:8080/healthz').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/conf.d/leomd317.conf"]
