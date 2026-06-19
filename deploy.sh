#!/bin/bash
set -e

# Caminhos
BACKEND_DIR="/home/zorin/wize/datacheck-pro/backend"
FRONTEND_DIR="/home/zorin/wize/datacheck-pro/frontend"

echo "🚀 Preparando projeto para deploy no Vercel..."

# Backend
echo "📦 Configurando backend..."
cp "$BACKEND_DIR/.env.example" "$BACKEND_DIR/.env"
npm --prefix "$BACKEND_DIR" install
npm --prefix "$BACKEND_DIR" run build

# Frontend
echo "📦 Configurando frontend..."
cp "$FRONTEND_DIR/.env.local.example" "$FRONTEND_DIR/.env.local"
npm --prefix "$FRONTEND_DIR" install
npm --prefix "$FRONTEND_DIR" run build

echo "✅ Build concluído! Os artefatos estão prontos em 'dist'."
echo "Agora basta fazer commit e push para o GitHub, o Vercel cuidará do deploy automático."

