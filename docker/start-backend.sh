#!/bin/sh
set -eu

exec gunicorn \
  --bind 127.0.0.1:5000 \
  --workers "${GUNICORN_WORKERS:-2}" \
  --worker-class "${GUNICORN_WORKER_CLASS:-gevent}" \
  --worker-connections "${GUNICORN_WORKER_CONNECTIONS:-1000}" \
  --timeout "${GUNICORN_TIMEOUT:-120}" \
  --access-logfile - \
  --error-logfile - \
  app:app
