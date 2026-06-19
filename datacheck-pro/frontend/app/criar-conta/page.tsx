"use client";

import { CSSProperties, FormEvent, useState } from "react";
import { apiRequest } from "../../lib/api";

export default function CriarContaPage() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? "")
    };
    try {
      const response = await apiRequest<{ token: string }>("/auth/register", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      localStorage.setItem("datacheck_token", response.token);
      setResult("Conta criada com sucesso. Token salvo no navegador.");
    } catch (error) {
      setResult((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section">
      <div className="container">
        <h1>Criar Conta</h1>
        <p className="muted">Cadastro rápido para iniciar consultas com créditos iniciais.</p>
        <form className="card grid" style={{ maxWidth: 560 }} onSubmit={handleSubmit}>
          <label>
            Nome
            <input name="name" style={inputStyle} required />
          </label>
          <label>
            E-mail
            <input name="email" type="email" style={inputStyle} required />
          </label>
          <label>
            Senha
            <input name="password" type="password" style={inputStyle} required />
          </label>
          <div style={{ display: "grid", gap: 8 }}>
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Criando..." : "Criar conta"}
            </button>
            <button className="btn btn-outline" type="button">
              Continuar com Google
            </button>
            <button className="btn btn-outline" type="button">
              Continuar com Microsoft
            </button>
          </div>
          {result && <p className="muted">{result}</p>}
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