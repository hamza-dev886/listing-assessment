#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi
PORT=${APP_PORT:-5005}
php artisan serve --host=127.0.0.1 --port="$PORT"
