# DataCheck Pro
Plataforma SaaS B2B e B2C para consultas cadastrais, KYC, Compliance, análise de crédito e due diligence.

## Stack
- Frontend: Next.js (React + TypeScript)
- Backend: Node.js + Express + TypeScript
- Banco: PostgreSQL
- Auth: JWT + API Key (B2B)

## Estrutura
- `frontend`: aplicação web (landing, dashboard cliente, painel admin, docs e API B2B)
- `backend`: API REST, autenticação, consultas, logs e auditoria
- `infra`: scripts SQL para criação da base

## Como rodar
1. Backend:
   - `cd backend`
   - `cp .env.example .env`
   - Ajuste variáveis
   - `npm install`
   - `npm run dev`
2. Frontend:
   - `cd frontend`
   - `cp .env.local.example .env.local`
   - `npm install`
   - `npm run dev`

## Avisos legais implementados
- LGPD
- Marco Civil da Internet
- Lei do Cadastro Positivo
- Normas de prevenção à lavagem de dinheiro

O aceite dos Termos de Uso é obrigatório antes de qualquer consulta, e o backend registra trilha de auditoria.
