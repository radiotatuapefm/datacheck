import { Building2, Car, CreditCard, FileSearch, Phone, ShieldAlert, UserRound, Warehouse } from "lucide-react";

const modules = [
  {
    title: "Consulta CPF",
    items: ["Dados cadastrais", "Situação cadastral", "Score de risco", "Telefones e endereços vinculados"]
  },
  {
    title: "Consulta CNPJ",
    items: ["Receita Federal", "Quadro societário", "CNAE", "Capital social e situação fiscal"]
  },
  {
    title: "Consulta Veículos",
    items: ["Placa e Renavam", "Restrições", "Débitos", "Histórico de leilão"]
  },
  {
    title: "Consulta Telefônica",
    items: ["Titular", "Operadora", "Endereços vinculados"]
  },
  {
    title: "Consulta Endereços",
    items: ["CEP", "Geolocalização", "Histórico de alterações"]
  },
  {
    title: "KYC e Compliance",
    items: ["PEP", "Sanções nacionais", "Sanções internacionais", "Due Diligence"]
  },
  {
    title: "Análise de Crédito",
    items: ["Score", "Renda estimada", "Capacidade de pagamento", "Indicadores financeiros"]
  },
  {
    title: "Investigação Corporativa",
    items: ["Vínculos empresariais", "Participações societárias", "Empresas relacionadas", "Estrutura societária"]
  }
];

const icons = [UserRound, Building2, Car, Phone, Warehouse, ShieldAlert, CreditCard, FileSearch];

export function ConsultationModules() {
  return (
    <section id="modulos" className="section">
      <div className="container">
        <h2>Módulos de consulta</h2>
        <p className="muted">Cobertura ampla para operações B2B e B2C com foco em prevenção de risco.</p>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", marginTop: 18 }}>
          {modules.map((module, index) => {
            const Icon = icons[index];
            return (
              <article key={module.title} className="card">
                <div style={{ display: "inline-flex", padding: 8, borderRadius: 10, background: "var(--bg-soft)" }}>
                  <Icon size={18} color="var(--primary)" />
                </div>
                <h3>{module.title}</h3>
                <ul className="muted" style={{ paddingLeft: 18, marginBottom: 0 }}>
                  {module.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
