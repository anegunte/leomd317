# Deployment

The production image contains the Next.js frontend and Flask API in one
container, exposed through Nginx on port `8080`. Requests to `/api/*` remain
same-origin, so no browser-side API URL change is required.

## Run locally with Docker

1. Add a unique 32+ character `SECRET_KEY` to `backend/.env` (for example,
   `openssl rand -base64 48`). Never commit that file. The required `MONGO_URI`
   and optional `DB_NAME` follow the same environment-variable convention.
2. Build and start the service:

   ```sh
   docker compose --env-file backend/.env up --build -d
   ```

3. Open `http://localhost:8080`. Confirm health with:

   ```sh
   curl http://localhost:8080/healthz
   curl http://localhost:8080/api/health
   ```

4. Stop it with:

   ```sh
   docker compose --env-file backend/.env down
   ```

`backend/.env` is deliberately excluded from the image and build context. Use
`.env.example` as the safe template for a new environment.

## Create administrative accounts

The application ships without demo accounts or source-controlled passwords.
After the container is running, create the first administrator interactively:

```sh
docker compose --env-file backend/.env exec -it leomd317 \
  python /opt/backend/create_admin.py \
  --username superadmin \
  --name "Your Name" \
  --role "Super Admin" \
  --district 317
```

The command prompts for a 12+ character password and stores only a password
hash in MongoDB. Running it again for the same username rotates the password
and invalidates that account's existing sessions.

## Container design

- Next.js is built as a standalone production bundle in a multi-stage build.
- Gunicorn uses gevent workers, so live SSE connections are multiplexed rather
  than consuming a backend thread per visitor. Each process maintains one
  MongoDB change stream and fans updates out to its connected browsers.
- Nginx is the only public listener and proxies `/api/*`, preserves the SSE
  stream at `/api/live/stream`, and caches immutable Next.js static assets.
- All processes run as the unprivileged `app` user (UID `10001`).
- `tini` handles signal forwarding and Supervisor keeps the frontend, API, and
  proxy processes together, as requested for a single-container deployment.

## Kubernetes

Update the `image` in `k8s/deployment.yaml`, then create the runtime secret:

```sh
kubectl create secret generic leomd317-runtime \
  --from-literal=mongo-uri='YOUR_MONGODB_URI' \
  --from-literal=secret-key='A_LONG_RANDOM_SECRET'
kubectl apply -f k8s/deployment.yaml
```

The manifest includes two replicas, resource requests/limits, a database-aware
readiness probe, a process liveness probe, a non-root security context, a
disruption budget, and CPU-based autoscaling from 2 to 10 replicas (requires
Metrics Server). Live ribbon/confetti events use MongoDB change streams,
allowing updates to reach connected users across Gunicorn workers and
Kubernetes replicas.
