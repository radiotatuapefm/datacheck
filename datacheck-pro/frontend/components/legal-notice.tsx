export function LegalNotice() {
  return (
    <div className="card" style={{ borderLeft: "4px solid var(--accent)" }}>
      <h3 style={{ marginTop: 0 }}>Avisos Legais e Compliance</h3>
      <p className="muted" style={{ marginTop: 0 }}>
        As consultas exigem aceite prévio dos Termos de Uso, com trilha de auditoria para rastreabilidade total.
      </p>
      <ul className="muted" style={{ marginBottom: 0 }}>
        <li>LGPD</li>
        <li>Marco Civil da Internet</li>
        <li>Lei do Cadastro Positivo</li>
        <li>Normas de Prevenção à Lavagem de Dinheiro</li>
      </ul>
    </div>
  );
}
