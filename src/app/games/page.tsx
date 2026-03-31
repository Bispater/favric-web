"use client";

import { motion } from "framer-motion";

export default function GamesPage() {
  return (
    <main className="relative min-h-screen pt-20">
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

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-medium uppercase tracking-widest text-accent-light">
            Experiencia Interactiva
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
            Zona de <span className="gradient-text">Juegos</span>
          </h1>
          <p className="mt-4 max-w-2xl text-muted">
            Prueba nuestra plataforma de entretenimiento interactivo, diseñada
            para kioscos y eventos. Juega directamente desde tu navegador.
          </p>
        </motion.div>
      </div>

      {/* Iframe embed */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative mx-auto w-full max-w-5xl px-6 pb-20"
      >
        <div className="overflow-hidden rounded-2xl border border-card-border bg-card/50 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-card-border bg-card/80 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-500/60" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <span className="h-3 w-3 rounded-full bg-green-500/60" />
            <span className="ml-3 text-xs text-muted">games-kiosk</span>
          </div>
          <iframe
            src="/games-kiosk/index.html"
            className="h-[80vh] w-full border-0"
            title="Games Kiosk"
            allow="autoplay"
          />
        </div>
      </motion.div>
    </main>
  );
}
