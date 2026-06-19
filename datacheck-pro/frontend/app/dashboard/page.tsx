"use client";

import { useMemo, useState } from "react";
import { apiRequest, DashboardOverview } from "../../lib/api";

const modules = ["cpf", "cnpj", "veiculos", "telefonica", "enderecos", "kyc", "credito", "investigacao"] as const;

export default function DashboardPage() {
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [message, setMessage] = useState("");
  const token = useMemo(() => (typeof window !== "undefined" ? localStorage.getItem("datacheck_token") : null), []);

  async function loadOverview() {
    if (!token) return setMessage("Faça login/cadastro antes de acessar o dashboard.");
    try {
      const data = await apiRequest<DashboardOverview>("/dashboard/overview", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOverview(data);
      setMessage("");
    } catch (error) {
      setMessage((error as Error).message);
    }
  }

  async function acceptTerms() {
    if (!token) return;
    await apiRequest("/auth/terms/accept", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });
    await loadOverview();
  }

  async function runConsulta(moduleName: string) {
    if (!token) return;
    try {
      await apiRequest(`/consultas/${moduleName}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ documento: "00000000000" })
      });
      setMessage(`Consulta ${moduleName.toUpperCase()} executada com sucesso.`);
      await loadOverview();
    } catch (error) {
      setMessage((error as Error).message);
    }
  }

  return (
    <section className="section">
      <div className="container grid">
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={loadOverview}>
            Carregar Dashboard
          </button>
          <button className="btn btn-outline" onClick={acceptTerms}>
            Aceitar Termos de Uso
          </button>
        </div>

        {overview && (
          <>
            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
              <article className="card">
                <h3 style={{ margin: 0 }}>{overview.stats.totalConsultations}</h3>
                <p className="muted">Consultas realizadas</p>
              </article>
              <article className="card">
                <h3 style={{ margin: 0 }}>{overview.stats.creditsAvailable}</h3>
                <p className="muted">Créditos disponíveis</p>
              </article>
              <article className="card">
                <h3 style={{ margin: 0 }}>{overview.stats.favorites}</h3>
                <p className="muted">Favoritos</p>
              </article>
              <article className="card">
                <h3 style={{ margin: 0 }}>{overview.stats.exportedReports}</h3>
                <p className="muted">Relatórios exportados</p>
              </article>
            </div>

            <div className="card">
              <h3>Módulos de consulta</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {modules.map(moduleName => (
                  <button key={moduleName} className="btn btn-outline" onClick={() => runConsulta(moduleName)}>
                    {moduleName.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="card">
              <h3>Notificações</h3>
              <ul className="muted" style={{ marginBottom: 0 }}>
                {overview.notifications.map(notification => (
                  <li key={notification.id}>
                    {notification.title}: {notification.message}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {message && <p className="muted">{message}</p>}
      </div>
    </section>
  );
}
