import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentação | DataCheck Pro"
};

export default function DocumentacaoPage() {
  return (
    <section className="section">
      <div className="container grid">
        <h1>Documentação da API</h1>
        <article className="card">
          <h3>Introdução</h3>
          <p className="muted">A API DataCheck Pro oferece endpoints REST para consultas e compliance em tempo real.</p>
        </article>
        <article className="card">
          <h3>Autenticação</h3>
          <p className="muted">JWT para área autenticada e API Key para integrações B2B.</p>
        </article>
        <article className="card">
          <h3>Endpoints</h3>
          <ul className="muted">
            <li>/auth/register</li>
            <li>/auth/login</li>
            <li>/consultas/:module</li>
            <li>/consultas/b2b/cpf</li>
            <li>/payments/checkout</li>
            <li>/export/pdf e /export/excel</li>
          </ul>
        </article>
        <article className="card">
          <h3>Limites</h3>
          <p className="muted">Controle de uso por créditos e plano contratado.</p>
        </article>
        <article className="card">
          <h3>SDKs e exemplos</h3>
          <p className="muted">Bibliotecas de referência em Python, PHP, JavaScript, C# e Java.</p>
        </article>
      </div>
    </section>
  );
}
