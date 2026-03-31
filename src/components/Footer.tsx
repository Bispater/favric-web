import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contacto" className="border-t border-card-border bg-card/50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight">
              <span className="gradient-text">favric</span>
              <span className="text-muted">.cl</span>
            </Link>
            <p className="mt-3 text-sm text-muted">
              Soluciones tecnológicas que conectan hardware y software.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
              Navegación
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors">Inicio</Link>
              <Link href="/showroom" className="text-sm text-muted hover:text-foreground transition-colors">Showroom</Link>
              <Link href="/games" className="text-sm text-muted hover:text-foreground transition-colors">Games</Link>
              <Link href="#servicios" className="text-sm text-muted hover:text-foreground transition-colors">Servicios</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
              Contacto
            </h4>
            <div className="flex flex-col gap-2 text-sm text-muted">
              <a href="mailto:hola@favric.cl" className="hover:text-foreground transition-colors">
                hola@favric.cl
              </a>
              <p>Santiago, Chile</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-card-border pt-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} favric.cl — Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
