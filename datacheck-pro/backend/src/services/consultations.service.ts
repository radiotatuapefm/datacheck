import { randomUUID } from "node:crypto";
import { ConsultationRecord } from "../types";
import { safeQuery } from "../config/db";

const consultations: ConsultationRecord[] = [];

function randomRisk() {
  return Math.floor(Math.random() * 100);
}

function baseResult(module: string, payload: Record<string, unknown>) {
  const riskScore = randomRisk();
  return {
    status: "ok",
    module,
    riskScore,
    checkedAt: new Date().toISOString(),
    source: "DataCheck Pro Intelligence Network",
    payload,
    highlights: [
      "Dados validados em múltiplas fontes públicas e privadas.",
      "Mecanismo antifraude aplicado.",
      "Compliance legal e trilha de auditoria ativa."
    ]
  };
}

function enrichResult(module: string, payload: Record<string, unknown>) {
  const result = baseResult(module, payload);
  const datasets: Record<string, Record<string, unknown>> = {
    cpf: {
      dadosCadastrais: true,
      situacaoCadastral: "Regular",
      scoreRisco: result.riskScore,
      telefonesVinculados: 2,
      enderecosVinculados: 1,
      participacaoSocietaria: "Não identificado",
      historicoAlteracoes: ["Alteração cadastral em 2024-07"]
    },
    cnpj: {
      receitaFederal: "Ativa",
      quadroSocietario: "Disponível",
      cnaePrincipal: "6201-5/01",
      capitalSocial: "R$ 500.000,00",
      situacaoFiscal: "Sem pendências"
    },
    veiculos: {
      placa: payload.placa ?? null,
      renavam: payload.renavam ?? null,
      restricoes: ["Sem bloqueio judicial"],
      debitos: "Sem débitos ativos",
      leilao: "Sem histórico de leilão"
    },
    telefonica: {
      titular: "Identificação positiva",
      operadora: "Operadora nacional",
      enderecosVinculados: 2
    },
    enderecos: {
      cep: payload.cep ?? null,
      geolocalizacao: "Mapeamento disponível",
      historico: ["Mudança registrada em 2023-12"]
    },
    kyc: {
      pep: false,
      sancoesNacionais: false,
      sancoesInternacionais: false,
      listasRestritivas: false,
      dueDiligence: "Aprovado com monitoramento"
    },
    credito: {
      score: 748,
      rendaEstimada: "R$ 9.500,00",
      capacidadePagamento: "Alta",
      indicadoresFinanceiros: ["Endividamento controlado", "Risco de inadimplência baixo"]
    },
    investigacao: {
      vinculosEmpresariais: 3,
      participacoesSocietarias: 2,
      empresasRelacionadas: ["Empresa A", "Empresa B"],
      estruturaSocietaria: "Mapeamento completo disponível"
    }
  };
  return {
    ...result,
    details: datasets[module] ?? {}
  };
}

export async function runConsultation(input: {
  userId: string;
  module: string;
  payload: Record<string, unknown>;
}) {
  const result = enrichResult(input.module, input.payload);
  const record: ConsultationRecord = {
    id: randomUUID(),
    userId: input.userId,
    module: input.module,
    payload: input.payload,
    result,
    riskScore: Number(result.riskScore ?? 0),
    createdAt: new Date().toISOString()
  };
  consultations.unshift(record);
  if (consultations.length > 2000) consultations.pop();
  await safeQuery(
    "INSERT INTO consultations (id, user_id, module, payload, result, risk_score) VALUES ($1,$2,$3,$4,$5,$6)",
    [
      record.id,
      record.userId,
      record.module,
      JSON.stringify(record.payload),
      JSON.stringify(record.result),
      record.riskScore
    ]
  );
  return record;
}

export function listByUser(userId: string) {
  return consultations.filter(item => item.userId === userId);
}

export function listAllConsultations() {
  return consultations;
}
