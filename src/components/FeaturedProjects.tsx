"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "@/data/portfolio.json";
import type { Project } from "@/lib/types";
import ShowroomDemo from "@/components/demos/ShowroomDemo";
import RutVerificationDemo from "@/components/demos/RutVerificationDemo";
import ChickenMenuDemo from "@/components/demos/ChickenMenuDemo";
import HydroScanDemo from "@/components/demos/HydroScanDemo";
import NpsSurveyDemo from "@/components/demos/NpsSurveyDemo";
import DashboardDemo from "@/components/demos/DashboardDemo";

// 🔑 Analogía Angular:
// - Importar el JSON directo = como si tu servicio devolviera datos estáticos (sin HttpClient)
// - El cast "as Project[]" = lo mismo que harías con un pipe o mapping en un servicio Angular

const featuredIds = [
  "showroom-botonera",
  "totem-tickets-eventos",
  "chicken-love-you-menu",
  "hydroscan-waterflow",
  "nps-survey",
  "catalogo-admin-dashboard",
];
const projects = (portfolioData.portfolio as Project[]).filter((p) =>
  featuredIds.includes(p.id)
);

const demosMap: Record<string, React.ComponentType> = {
  "showroom-botonera": ShowroomDemo,
  "totem-tickets-eventos": RutVerificationDemo,
  "chicken-love-you-menu": ChickenMenuDemo,
  "hydroscan-waterflow": HydroScanDemo,
  "nps-survey": NpsSurveyDemo,
  "catalogo-admin-dashboard": DashboardDemo,
};

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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const DemoComponent = selectedProject
    ? demosMap[selectedProject.id] ?? null
    : null;

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
            Haz click en cualquier tarjeta para probar una demo interactiva.
          </p>
        </motion.div>

        {/* Project cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => {
            const hasDemo = !!demosMap[project.id];
            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                onClick={() => setSelectedProject(project)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-card-border bg-card/50 p-5 transition-all hover:border-accent/30 hover:bg-card"
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${categoryColors[project.category] ?? "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"}`}
                  >
                    {project.category}
                  </span>
                  {hasDemo && (
                    <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-400">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                      </span>
                      Demo
                    </span>
                  )}
                </div>

                <h3 className="mt-3 text-base font-semibold transition-colors group-hover:text-accent-light">
                  {project.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  {project.shortDescription}
                </p>

                {/* Tech stack pills */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-background/80 px-2 py-0.5 text-[10px] text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
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

      {/* Demo Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-x-4 top-[5vh] z-50 mx-auto max-h-[90vh] max-w-3xl overflow-y-auto rounded-2xl border border-card-border bg-[var(--background)] shadow-2xl sm:inset-x-8"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-card-border bg-[var(--background)]/95 px-6 py-4 backdrop-blur">
                <div>
                  <span
                    className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${categoryColors[selectedProject.category] ?? "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"}`}
                  >
                    {selectedProject.category}
                  </span>
                  <h2 className="mt-1 text-lg font-bold">{selectedProject.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <p className="text-sm leading-relaxed text-muted">
                  {selectedProject.fullDescription}
                </p>
                {DemoComponent && (
                  <div className="mt-6">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="h-px flex-1 bg-card-border" />
                      <span className="text-[10px] font-medium uppercase tracking-widest text-accent-light">
                        Demo interactiva
                      </span>
                      <div className="h-px flex-1 bg-card-border" />
                    </div>
                    <div className="rounded-xl border border-card-border bg-zinc-900/50 p-4">
                      <DemoComponent />
                    </div>
                  </div>
                )}
                {!DemoComponent && (
                  <div className="mt-6 flex h-40 flex-col items-center justify-center rounded-xl border border-dashed border-card-border bg-zinc-900/30">
                    <svg className="h-10 w-10 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                    </svg>
                    <span className="mt-2 text-xs text-zinc-500">Demo en desarrollo</span>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
