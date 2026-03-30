"use client";

import { motion } from "framer-motion";

// 🔑 Analogía Angular:
// - Cada "step" se renderiza con .map() = *ngFor
// - whileInView = como combinar IntersectionObserver + Angular Animations

const steps = [
  {
    number: "01",
    title: "Descubrimiento",
    description:
      "Entendemos tu problema, mapeamos los requerimientos técnicos y definimos el alcance del proyecto.",
  },
  {
    number: "02",
    title: "Diseño & Prototipo",
    description:
      "Creamos wireframes, definimos la arquitectura del sistema y validamos con prototipos funcionales.",
  },
  {
    number: "03",
    title: "Desarrollo",
    description:
      "Construimos iterativamente con entregas parciales, integrando hardware y software en paralelo.",
  },
  {
    number: "04",
    title: "Entrega & Soporte",
    description:
      "Desplegamos en producción, capacitamos a tu equipo y te acompañamos con soporte técnico continuo.",
  },
];

export default function Process() {
  return (
    <section className="relative px-6 py-32">
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
            Proceso
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Cómo <span className="gradient-text">trabajamos</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent md:left-1/2 md:block" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`relative flex flex-col gap-6 md:flex-row md:items-center ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="rounded-2xl border border-card-border bg-card/50 p-6">
                    <span className="text-sm font-bold text-accent-light">
                      {step.number}
                    </span>
                    <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden h-4 w-4 flex-shrink-0 rounded-full border-2 border-accent bg-background md:block" />

                {/* Spacer for the other side */}
                <div className="hidden flex-1 md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
