"use client";

import { motion } from "framer-motion";

// 🔑 Analogía Angular:
// - Este componente es puro presentacional, como un "dumb component" en Angular
// - Cuando tengas testimonios reales, podrías pasarlos como props (= @Input())

const testimonials = [
  {
    quote:
      "El sistema de tótem con impresión térmica y verificación de RUT funciona 24/7 sin intervención. Automatizó completamente nuestro proceso de tickets para eventos.",
    author: "Cliente Eventos Corporativos",
    role: "Gerente de Operaciones",
  },
  {
    quote:
      "La app para lectura de medidores nos eliminó el ingreso manual. Ahora nuestros operadores escanean el QR y capturan la lectura en segundos desde su celular.",
    author: "Cliente Utilities",
    role: "Jefe de Proyecto",
  },
  {
    quote:
      "El showroom interactivo con detección de presencia y control de pantallas LED le dio otra vida a nuestro espacio comercial. Los clientes quedan impresionados.",
    author: "Cliente Retail & Showroom",
    role: "Director Comercial",
  },
];

export default function Testimonials() {
  return (
    <section className="relative px-6 py-32">
      {/* Top separator line */}
      <div className="pointer-events-none absolute inset-x-0 top-0">
        <div className="mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-accent-light">
            Testimonios
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Lo que dicen nuestros <span className="gradient-text">clientes</span>
          </h2>
        </motion.div>

        {/* Testimonial cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-card-border bg-card/50 p-6"
            >
              {/* Quote mark */}
              <svg
                className="h-8 w-8 text-accent/30"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>

              <p className="mt-4 text-sm leading-relaxed text-muted">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-6 border-t border-card-border pt-4">
                <p className="text-sm font-semibold">{t.author}</p>
                <p className="text-xs text-muted">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
