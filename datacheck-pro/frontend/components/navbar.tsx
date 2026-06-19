import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { menuLinks } from "./site-data";

export function Navbar() {
  return (
    <header style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 74, gap: 12 }}
      >
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontWeight: 700 }}>
          <ShieldCheck color="var(--accent)" />
          DataCheck Pro
        </Link>
        <nav style={{ display: "flex", flexWrap: "wrap", gap: 14, fontSize: 14 }}>
          {menuLinks.map(link => (
            <Link key={link.href} href={link.href} className="muted">
              {link.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
