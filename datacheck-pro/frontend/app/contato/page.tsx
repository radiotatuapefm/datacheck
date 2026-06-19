import type { Metadata } from "next";
import { CSSProperties } from "react";

export const metadata: Metadata = {
  title: "Contato | DataCheck Pro"
};

export default function ContatoPage() {
  return (
    <section className="section">
      <div className="container">
        <h1>Contato comercial</h1>
        <p className="muted">Solicite demonstração, proposta Enterprise e integração assistida.</p>
        <form className="card grid" style={{ maxWidth: 700 }}>
          <label>
            Nome
            <input style={inputStyle} placeholder="Seu nome" />
          </label>
          <label>
            E-mail corporativo
            <input style={inputStyle} type="email" placeholder="voce@empresa.com" />
          </label>
          <label>
            Empresa
            <input style={inputStyle} placeholder="Razão social" />
          </label>
          <label>
            Mensagem
            <textarea style={{ ...inputStyle, minHeight: 120 }} placeholder="Descreva sua necessidade" />
          </label>
          <button className="btn btn-primary" type="button">
            Enviar solicitação
          </button>
        </form>
      </div>
    </section>
  );
}

const inputStyle: CSSProperties = {
  display: "block",
  width: "100%",
  marginTop: 6,
  border: "1px solid var(--border)",
  borderRadius: 10,
  background: "var(--bg)",
  color: "var(--text)",
  padding: "12px 14px"
};
