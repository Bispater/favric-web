"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import portfolioData from "@/data/portfolio.json";
import type { Project } from "@/lib/types";

// 🔑 Analogía Angular:
// - Importar el JSON directo = como si tu servicio devolviera datos estáticos (sin HttpClient)
// - El cast "as Project[]" = lo mismo que harías con un pipe o mapping en un servicio Angular

const featuredIds = ["showroom-botonera", "totem-tickets-eventos", "hydroscan-waterflow"];
const projects = (portfolioData.portfolio as Project[]).filter((p) =>
  featuredIds.includes(p.id)
);

const categoryColors: Record<string, string> = {
  hardware: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  mobile: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  web: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function FeaturedProjects() {
  return (
    <section className="relative px-6 py-32">
      {/* Subtle bg gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
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
            Portfolio
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Proyectos <span className="gradient-text">destacados</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Un vistazo a algunas de las soluciones que hemos diseñado y construido.
          </p>
        </motion.div>

        {/* Project cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-2xl border border-card-border bg-card/50 transition-all hover:border-accent/30 hover:bg-card"
            >
              {/* Thumbnail placeholder */}
              <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-card to-background">
                <div className="absolute inset-0 flex items-center justify-center text-muted/30">
                  <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                </div>
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              <div className="p-6">
                {/* Category badge */}
                <span
                  className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryColors[project.category] ?? "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"}`}
                >
                  {project.category}
                </span>

                <h3 className="mt-3 text-lg font-semibold transition-colors group-hover:text-accent-light">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {project.shortDescription}
                </p>

                {/* Tech stack pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-background px-2 py-0.5 text-xs text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="rounded-md bg-background px-2 py-0.5 text-xs text-muted">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA to Showroom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/showroom"
            className="group inline-flex items-center gap-2 text-sm font-medium text-accent-light transition-colors hover:text-foreground"
          >
            Ver todo el Showroom
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
