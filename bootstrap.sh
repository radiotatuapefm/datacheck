#!/bin/bash
set -e

# Caminhos
BACKEND_DIR="/home/zorin/wize/datacheck-pro/backend"
FRONTEND_DIR="/home/zorin/wize/datacheck-pro/frontend"

echo "🚀 Iniciando bootstrap do projeto..."

# Backend
echo "📦 Configurando backend..."
cp "$BACKEND_DIR/.env.example" "$BACKEND_DIR/.env"
npm --prefix "$BACKEND_DIR" install
npm --prefix "$BACKEND_DIR" run dev &

# Frontend
echo "📦 Configurando frontend..."
cp "$FRONTEND_DIR/.env.local.example" "$FRONTEND_DIR/.env.local"
npm --prefix "$FRONTEND_DIR" install
npm --prefix "$FRONTEND_DIR" run dev &

echo "✅ Backend e Frontend iniciados!"
echo "Use Ctrl+C para parar ambos."
wait

