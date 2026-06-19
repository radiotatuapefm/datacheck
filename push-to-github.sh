#!/bin/bash
set -e

# Caminho do projeto local
PROJECT_DIR="/home/zorin/wize"

# Repositório remoto
REMOTE_REPO="https://github.com/radiotatuapefm/DataCheck.git"

cd "$PROJECT_DIR"

echo "🚀 Inicializando repositório Git..."
git init

echo "🔗 Adicionando repositório remoto..."
git remote add origin "$REMOTE_REPO"

echo "📦 Adicionando arquivos..."
git add .

echo "📝 Criando commit inicial..."
git commit -m "Primeiro commit - upload do projeto local"

echo "⬆️ Enviando para GitHub..."
git branch -M main
git push -u origin main

echo "✅ Projeto enviado com sucesso para $REMOTE_REPO"

