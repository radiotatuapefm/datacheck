import Link from "next/link";
import { ConsultationModules } from "../components/consultation-modules";
import { LegalNotice } from "../components/legal-notice";
import { PricingTable } from "../components/pricing-table";

export default function HomePage() {
  return (
    <>
      <section className="hero section">
        <div className="container">
          <span className="badge">Plataforma premium de inteligência cadastral</span>
          <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 3.1rem)", marginBottom: 12, maxWidth: 800 }}>
            Plataforma Completa para Consultas Cadastrais, KYC e Compliance
          </h1>
          <p className="muted" style={{ maxWidth: 760, fontSize: 18 }}>
            Valide identidades, analise riscos, consulte empresas e proteja seu negócio com tecnologia avançada.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24 }}>
            <Link className="btn btn-primary" href="/criar-conta">
              Teste Grátis
            </Link>
            <Link className="btn btn-outline" href="/planos">
              Ver Planos
            </Link>
            <Link className="btn btn-accent" href="/contato">
              Solicitar Demonstração
            </Link>
          </div>
        </div>
      </section>

      <ConsultationModules />

      <section className="section" id="planos">
        <div className="container">
          <h2>Planos e preços</h2>
          <p className="muted">Escolha o plano ideal para operação de baixa, média ou alta escala.</p>
          <PricingTable />
        </div>
      </section>

      <section className="section">
        <div className="container grid" style={{ gridTemplateColumns: "1.2fr 1fr" }}>
          <div className="card">
            <h3>API B2B com autenticação por API Key</h3>
            <p className="muted">
              Integre com seu fluxo interno via REST, webhooks e documentação Swagger. Exemplo principal:
            </p>
            <pre className="card" style={{ overflow: "auto", margin: 0 }}>
              <code>{`POST /api/v1/consultas/cpf\n{\n  "cpf": "00000000000"\n}`}</code>
            </pre>
            <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Python", "PHP", "JavaScript", "C#", "Java"].map(lang => (
                <span key={lang} className="badge">
                  SDK {lang}
                </span>
              ))}
            </div>
          </div>
          <LegalNotice />
        </div>
      </section>
    </>
  );
}
