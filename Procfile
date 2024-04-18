web: gunicorn app:start.py
worker: node index.js
release: python mongo.py migrate --no-input