import type { Metadata } from "next";
import Link from "next/link";
import { PricingTable } from "../../components/pricing-table";

export const metadata: Metadata = {
  title: "Planos e Preços | DataCheck Pro"
};

export default function PlanosPage() {
  return (
    <section className="section">
      <div className="container">
        <h1>Planos DataCheck Pro</h1>
        <p className="muted">
          Starter para início rápido, Business para times em escala e Enterprise para operação ilimitada.
        </p>
        <PricingTable />
        <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
          <Link href="/criar-conta" className="btn btn-primary">
            Criar Conta
          </Link>
          <Link href="/contato" className="btn btn-outline">
            Falar com Vendas
          </Link>
        </div>
      </div>
    </section>
  );
}
