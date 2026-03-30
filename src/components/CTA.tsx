"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-card-border bg-card/50 p-12 text-center md:p-16"
        >
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-10 blur-[80px]" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Conversemos sobre cómo la tecnología puede resolver tu problema.
              Sin compromiso, sin letra chica.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:contacto@favric.cl"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-accent/25"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Escríbenos
              </a>
              <a
                href="https://wa.me/56912345678"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-card-border px-8 py-3.5 text-sm font-medium text-muted transition-colors hover:border-foreground/20 hover:text-foreground"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
