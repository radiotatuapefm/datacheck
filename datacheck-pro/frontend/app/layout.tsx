import type { Metadata } from "next";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { ThemeProvider } from "../components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "DataCheck Pro | Consultas Cadastrais, KYC e Compliance",
  description:
    "Plataforma completa para validação de identidade, análise de risco, due diligence e consultas cadastrais B2B/B2C."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
