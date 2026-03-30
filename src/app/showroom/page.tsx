"use client";

import { useState } from "react";
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
// - useState = variables de clase con ngModel / change detection
// - AnimatePresence = @if con animaciones de transición
// - layoutId de Framer Motion = no tiene equivalente directo en Angular, es magia pura

const projects = portfolioData.portfolio as Project[];

const categories = [
  { id: "all", label: "Todos" },
  { id: "hardware", label: "Hardware" },
  { id: "mobile", label: "Mobile" },
  { id: "web", label: "Web" },
];

const categoryColors: Record<string, string> = {
  hardware: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  mobile: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  web: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

const demosMap: Record<string, React.ComponentType> = {
  "showroom-botonera": ShowroomDemo,
  "totem-tickets-eventos": RutVerificationDemo,
  "chicken-love-you-menu": ChickenMenuDemo,
  "hydroscan-waterflow": HydroScanDemo,
  "nps-survey": NpsSurveyDemo,
  "catalogo-admin-dashboard": DashboardDemo,
};

export default function ShowroomPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const DemoComponent = selectedProject
    ? demosMap[selectedProject.id] ?? null
    : null;

  return (
    <main className="relative min-h-screen px-6 pb-20 pt-28">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 30% at 50% 0%, rgba(109,40,217,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-medium uppercase tracking-widest text-accent-light">
            Showroom
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
            Nuestros <span className="gradient-text">proyectos</span>
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            Explora demos interactivas de proyectos reales. Cada tarjeta incluye
            una réplica funcional del sistema original.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeFilter === cat.id
                  ? "text-white"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {activeFilter === cat.id && (
                <motion.div
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          layout
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const hasDemo = !!demosMap[project.id];
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  onClick={() => setSelectedProject(project)}
                  className={`group cursor-pointer overflow-hidden rounded-2xl border border-card-border bg-card/50 transition-all hover:border-accent/30 hover:bg-card ${
                    i === 0 ? "sm:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  {/* Header area */}
                  <div className="relative bg-gradient-to-br from-card to-background p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <span
                          className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${
                            categoryColors[project.category] ??
                            "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                          }`}
                        >
                          {project.category}
                        </span>
                        <h3 className="mt-3 text-lg font-bold transition-colors group-hover:text-accent-light">
                          {project.title}
                        </h3>
                      </div>
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
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {project.shortDescription}
                    </p>

                    {/* Tech stack */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-background/80 px-2 py-0.5 text-[10px] text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-x-4 top-[5vh] z-50 mx-auto max-h-[90vh] max-w-3xl overflow-y-auto rounded-2xl border border-card-border bg-[var(--background)] shadow-2xl sm:inset-x-8"
            >
              {/* Modal header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-card-border bg-[var(--background)]/95 px-6 py-4 backdrop-blur">
                <div>
                  <span
                    className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${
                      categoryColors[selectedProject.category] ??
                      "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                    }`}
                  >
                    {selectedProject.category}
                  </span>
                  <h2 className="mt-1 text-lg font-bold">
                    {selectedProject.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                {/* Description */}
                <p className="text-sm leading-relaxed text-muted">
                  {selectedProject.fullDescription}
                </p>

                {/* Tech stack */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-card-border bg-card px-2.5 py-1 text-xs text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Interactive Demo */}
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

                {/* No demo fallback */}
                {!DemoComponent && (
                  <div className="mt-6 flex h-40 flex-col items-center justify-center rounded-xl border border-dashed border-card-border bg-zinc-900/30">
                    <svg
                      className="h-10 w-10 text-zinc-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                      />
                    </svg>
                    <span className="mt-2 text-xs text-zinc-500">
                      Demo en desarrollo
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
