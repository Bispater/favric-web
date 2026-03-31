"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// 🔑 Analogía Angular:
// - motion.h1 = como usar [@fadeIn] en Angular animations, pero declarativo en el JSX
// - useEffect = ngOnInit / ngAfterViewInit
// - useRef = @ViewChild
// - useState = variable de clase con change detection

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulseSpeed: number;
  pulseOffset: number;
}

function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let nodes: Node[] = [];
    const CONNECTION_DIST = 180;
    const NODE_COUNT = 50;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = canvas!.offsetWidth * dpr;
      canvas!.height = canvas!.offsetHeight * dpr;
      ctx!.scale(dpr, dpr);
    }

    function initNodes() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.8,
        opacity: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulseOffset: Math.random() * Math.PI * 2,
      }));
    }

    function draw(time: number) {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      ctx!.clearRect(0, 0, w, h);

      // Update positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
            const pulse = Math.sin(time * 0.001 + i * 0.5) * 0.05 + 0.05;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.strokeStyle = `rgba(139, 92, 246, ${alpha + pulse})`;
            ctx!.lineWidth = 0.6;
            ctx!.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const pulse = Math.sin(time * node.pulseSpeed + node.pulseOffset);
        const r = node.radius + pulse * 0.5;
        const alpha = node.opacity + pulse * 0.15;

        // Glow
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, r * 3, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(139, 92, 246, ${alpha * 0.1})`;
        ctx!.fill();

        // Core
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(196, 181, 253, ${alpha})`;
        ctx!.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    initNodes();
    animationId = requestAnimationFrame(draw);

    const handleResize = () => {
      resize();
      initNodes();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const numericPart = parseInt(value);
  const suffix = value.replace(/\d+/, "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.round(v)}${suffix}`);
  const [displayValue, setDisplayValue] = useState(`0${suffix}`);

  useEffect(() => {
    const controls = animate(count, numericPart, {
      duration: 2,
      delay: 0.8,
      ease: "easeOut",
    });
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, numericPart, rounded]);

  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-foreground sm:text-3xl">
        {displayValue}
      </div>
      <div className="mt-1 text-xs text-muted sm:text-sm">{label}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute h-[500px] w-[500px] rounded-full bg-[var(--gradient-start)] opacity-20 blur-[128px]"
          animate={{
            x: ["-10%", "10%", "-10%"],
            y: ["-5%", "15%", "-5%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ left: "15%", top: "10%" }}
        />
        <motion.div
          className="absolute h-[400px] w-[400px] rounded-full bg-[var(--gradient-end)] opacity-15 blur-[128px]"
          animate={{
            x: ["10%", "-15%", "10%"],
            y: ["10%", "-10%", "10%"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ right: "10%", bottom: "15%" }}
        />
        <motion.div
          className="absolute h-[300px] w-[300px] rounded-full bg-purple-500 opacity-10 blur-[100px]"
          animate={{
            x: ["5%", "-10%", "5%"],
            y: ["-10%", "5%", "-10%"],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{ right: "30%", top: "20%" }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Radial spotlight from top */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(109,40,217,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Animated network constellation */}
      <NetworkCanvas />

      {/* Horizontal accent lines */}
      <motion.div
        className="pointer-events-none absolute left-0 top-1/3 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(109,40,217,0.15) 30%, rgba(6,182,212,0.15) 70%, transparent)",
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Hardware + Software + IoT
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-8 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl"
        >
          Soluciones que conectan{" "}
          <span className="gradient-text">el mundo físico</span> con el digital
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl"
        >
          Tótems de autoservicio, aplicaciones móviles, integraciones con
          hardware y sistemas conectados. Diseñamos e implementamos tecnología
          que transforma tu negocio.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/showroom"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-accent/25"
          >
            <span className="relative z-10 flex items-center gap-2">
              Ver Showroom
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--gradient-end)] to-[var(--gradient-start)] opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
          <a
            href="#contacto"
            className="group inline-flex items-center rounded-full border border-card-border px-8 py-3.5 text-sm font-medium text-muted transition-all hover:border-accent/40 hover:text-foreground hover:shadow-lg hover:shadow-accent/5"
          >
            Hablemos
          </a>
        </motion.div>

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-20 grid grid-cols-3 gap-8"
        >
          <AnimatedCounter value="6+" label="Proyectos entregados" />
          <AnimatedCounter value="4" label="Industrias" />
          <AnimatedCounter value="100%" label="Soluciones a medida" />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-[var(--background)] to-transparent" />
    </section>
  );
}
