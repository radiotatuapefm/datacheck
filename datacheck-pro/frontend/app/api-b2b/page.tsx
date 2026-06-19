import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API B2B | DataCheck Pro"
};

const snippets = {
  python: `import requests\n\nurl = "http://localhost:4000/api/v1/consultas/b2b/cpf"\nheaders = {"x-api-key": "dcp_xxx"}\npayload = {"cpf": "00000000000"}\nprint(requests.post(url, json=payload, headers=headers).json())`,
  php: `<?php\n$ch = curl_init("http://localhost:4000/api/v1/consultas/b2b/cpf");\ncurl_setopt($ch, CURLOPT_HTTPHEADER, ["x-api-key: dcp_xxx", "Content-Type: application/json"]);\ncurl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(["cpf" => "00000000000"]));\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\necho curl_exec($ch);`,
  js: `const res = await fetch("http://localhost:4000/api/v1/consultas/b2b/cpf", {\n  method: "POST",\n  headers: { "x-api-key": "dcp_xxx", "Content-Type": "application/json" },\n  body: JSON.stringify({ cpf: "00000000000" })\n});\nconsole.log(await res.json());`,
  csharp: `using var client = new HttpClient();\nclient.DefaultRequestHeaders.Add("x-api-key", "dcp_xxx");\nvar payload = new StringContent("{\\"cpf\\":\\"00000000000\\"}", Encoding.UTF8, "application/json");\nvar response = await client.PostAsync("http://localhost:4000/api/v1/consultas/b2b/cpf", payload);`,
  java: `HttpRequest request = HttpRequest.newBuilder()\n  .uri(URI.create("http://localhost:4000/api/v1/consultas/b2b/cpf"))\n  .header("x-api-key", "dcp_xxx")\n  .header("Content-Type", "application/json")\n  .POST(HttpRequest.BodyPublishers.ofString("{\\"cpf\\":\\"00000000000\\"}"))\n  .build();`
};

export default function ApiB2BPage() {
  return (
    <section className="section">
      <div className="container grid" style={{ gap: 20 }}>
        <div className="card">
          <h1>API B2B</h1>
          <p className="muted">
            Integração REST completa com autenticação por API Key, documentação Swagger e suporte a webhooks.
          </p>
          <p style={{ marginBottom: 4 }}>
            Endpoint principal: <code>POST /api/v1/consultas/b2b/cpf</code>
          </p>
          <pre className="card" style={{ marginTop: 8 }}>
            <code>{`{\n  "cpf": "00000000000"\n}`}</code>
          </pre>
        </div>
        {Object.entries(snippets).map(([lang, code]) => (
          <article className="card" key={lang}>
            <h3 style={{ textTransform: "uppercase", marginTop: 0 }}>{lang}</h3>
            <pre style={{ overflow: "auto", margin: 0 }}>
              <code>{code}</code>
            </pre>
          </article>
        ))}
      </div>
    </section>
  );
}
