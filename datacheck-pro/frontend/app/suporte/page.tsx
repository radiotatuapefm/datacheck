import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suporte | DataCheck Pro"
};

export default function SuportePage() {
  return (
    <section className="section">
      <div className="container">
        <h1>Suporte</h1>
        <p className="muted">Atendimento técnico, onboarding e comunidade para clientes B2B e B2C.</p>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <article className="card">
            <h3>Canal técnico</h3>
            <p className="muted">suporte@datacheckpro.com</p>
          </article>
          <article className="card">
            <h3>SLA empresarial</h3>
            <p className="muted">Enterprise: atendimento dedicado.</p>
          </article>
          <article className="card">
            <h3>Status API</h3>
            <p className="muted">Monitoramento contínuo de disponibilidade.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
