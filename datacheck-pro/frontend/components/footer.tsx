import Link from "next/link";

const sections = [
  {
    title: "Produto",
    links: ["Planos e Preços", "Criar Conta", "API B2B", "Documentação"]
  },
  {
    title: "Planos",
    links: ["Ver Planos"]
  },
  {
    title: "Consultas",
    links: ["Consulta CPF", "Consulta CNPJ", "Consulta Veículos", "Fotos e Documentos"]
  },
  {
    title: "Suporte",
    links: ["Contato", "Comunidade"]
  },
  {
    title: "Legal",
    links: ["Termos de Uso", "Política de Privacidade", "LGPD", "Compliance"]
  }
];

export function Footer() {
  return (
    <footer>
      <div className="container section" style={{ paddingBottom: 30 }}>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
          {sections.map(section => (
            <div key={section.title}>
              <h4 style={{ marginTop: 0 }}>{section.title}</h4>
              <div className="grid" style={{ gap: 8 }}>
                {section.links.map(link => (
                  <Link key={link} href="#" className="muted">
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="muted" style={{ marginTop: 30 }}>
          © {new Date().getFullYear()} DataCheck Pro. Plataforma em conformidade com LGPD, Marco Civil da Internet,
          Lei do Cadastro Positivo e normas de Prevenção à Lavagem de Dinheiro.
        </p>
      </div>
    </footer>
  );
}
