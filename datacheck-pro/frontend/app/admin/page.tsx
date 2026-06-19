"use client";

import { useState } from "react";
import { apiRequest } from "../../lib/api";

type AdminOverview = {
  stats: {
    users: number;
    consultations: number;
    payments: number;
    logs: number;
  };
};

export default function AdminPage() {
  const [data, setData] = useState<AdminOverview | null>(null);
  const [message, setMessage] = useState("");

  async function loadAdmin() {
    const token = localStorage.getItem("datacheck_token");
    if (!token) return setMessage("Token JWT não encontrado.");
    try {
      const response = await apiRequest<AdminOverview>("/admin/overview", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(response);
      setMessage("");
    } catch (error) {
      setMessage((error as Error).message);
    }
  }

  return (
    <section className="section">
      <div className="container grid">
        <h1>Painel Administrativo</h1>
        <p className="muted">Gestão de usuários, planos, pagamentos, permissões, logs e auditoria.</p>
        <button className="btn btn-primary" onClick={loadAdmin}>
          Carregar visão administrativa
        </button>
        {data && (
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
            <article className="card">
              <h3>{data.stats.users}</h3>
              <p className="muted">Usuários</p>
            </article>
            <article className="card">
              <h3>{data.stats.consultations}</h3>
              <p className="muted">Consultas</p>
            </article>
            <article className="card">
              <h3>{data.stats.payments}</h3>
              <p className="muted">Pagamentos</p>
            </article>
            <article className="card">
              <h3>{data.stats.logs}</h3>
              <p className="muted">Logs de auditoria</p>
            </article>
          </div>
        )}
        {message && <p className="muted">{message}</p>}
      </div>
    </section>
  );
}
