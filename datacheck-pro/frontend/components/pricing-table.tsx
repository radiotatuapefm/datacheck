const planRows = [
  { feature: "Consultas por mês", starter: "100", business: "1.000", enterprise: "Ilimitado" },
  { feature: "KYC e Compliance", starter: "Básico", business: "Completo", enterprise: "Completo + avançado" },
  { feature: "API B2B", starter: "Opcional", business: "Inclusa", enterprise: "Inclusa + SLA" },
  { feature: "Exportação PDF/Excel", starter: "PDF", business: "PDF + Excel", enterprise: "Completo" },
  { feature: "Suporte", starter: "E-mail", business: "Prioritário", enterprise: "Dedicado" }
];

export function PricingTable() {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Recursos</th>
            <th>Starter</th>
            <th>Business</th>
            <th>Enterprise</th>
          </tr>
        </thead>
        <tbody>
          {planRows.map(row => (
            <tr key={row.feature}>
              <td>{row.feature}</td>
              <td>{row.starter}</td>
              <td>{row.business}</td>
              <td>{row.enterprise}</td>
            </tr>
          ))}
          <tr>
            <td>Preço</td>
            <td>R$ 199/mês</td>
            <td>R$ 899/mês</td>
            <td>Sob consulta</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
