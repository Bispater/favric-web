"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mini-demo replica of rinno/ticket/src/app/pages/rut-verification
// RUT validation logic extracted from the real Angular component

function formatRut(rut: string): string {
  const cleaned = rut.replace(/[^\dkK]/g, "");
  if (cleaned.length < 2) return cleaned;
  const body = cleaned.slice(0, -1);
  const dv = cleaned.slice(-1).toUpperCase();
  let formatted = "";
  let count = 0;
  for (let i = body.length - 1; i >= 0; i--) {
    formatted = body[i] + formatted;
    count++;
    if (count % 3 === 0 && i > 0) formatted = "." + formatted;
  }
  return `${formatted}-${dv}`;
}

function validateRutDV(rut: string): boolean {
  const cleaned = rut.replace(/[^\dkK]/g, "");
  if (cleaned.length < 8) return false;
  const body = cleaned.slice(0, -1);
  const dv = cleaned.slice(-1).toUpperCase();
  let sum = 0;
  let mul = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  const expected = 11 - (sum % 11);
  const dvExpected = expected === 11 ? "0" : expected === 10 ? "K" : `${expected}`;
  return dv === dvExpected;
}

// Hardcoded employees (from the real ticket system)
const mockDB: Record<string, { nombre: string; rut: string; evento: string; servicio: string }> = {
  "123456789": { nombre: "Juan Pérez García", rut: "12.345.678-9", evento: "Almuerzo Corporativo", servicio: "Almuerzo" },
  "987654321": { nombre: "María González López", rut: "98.765.432-1", evento: "Cena Aniversario", servicio: "Cena" },
  "111111111": { nombre: "Pedro Rodríguez", rut: "11.111.111-1", evento: "Colación Diaria", servicio: "Colación" },
};

type ViewState = "input" | "loading" | "success" | "error" | "ticket";

export default function RutVerificationDemo() {
  const [rut, setRut] = useState("");
  const [view, setView] = useState<ViewState>("input");
  const [error, setError] = useState("");
  const [employee, setEmployee] = useState<typeof mockDB[string] | null>(null);

  function addDigit(d: string) {
    if (rut.length >= 9) return;
    if (d === "K" && rut.includes("K")) return;
    setRut((prev) => prev + d);
    setError("");
  }

  function backspace() {
    setRut((prev) => prev.slice(0, -1));
    setError("");
  }

  function verify() {
    const cleaned = rut.replace(/[^\dkK]/g, "");
    if (cleaned.length < 8) {
      setError("RUT incompleto (mín. 8 dígitos)");
      return;
    }
    if (!validateRutDV(cleaned)) {
      setError("Dígito verificador inválido");
      return;
    }
    setView("loading");
    setTimeout(() => {
      const found = mockDB[cleaned];
      if (found) {
        setEmployee(found);
        setView("success");
        setTimeout(() => setView("ticket"), 1200);
      } else {
        setError("RUT no encontrado en el sistema");
        setView("error");
        setTimeout(() => setView("input"), 2000);
      }
    }, 800);
  }

  function reset() {
    setRut("");
    setView("input");
    setError("");
    setEmployee(null);
  }

  const numpad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "K", "0", "⌫"];

  return (
    <div className="flex flex-col items-center gap-3">
      <AnimatePresence mode="wait">
        {(view === "input" || view === "error") && (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex w-full flex-col items-center gap-3"
          >
            {/* RUT Display */}
            <div className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-center">
              <div className="text-[10px] uppercase tracking-wider text-zinc-500">
                Ingrese su RUT
              </div>
              <div className="mt-1 text-xl font-bold tracking-wider text-white">
                {rut.length > 0 ? formatRut(rut) : "_ _ . _ _ _ . _ _ _ - _"}
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-[11px] text-red-400"
                >
                  {error}
                </motion.div>
              )}
            </div>

            {/* Numpad */}
            <div className="grid w-full grid-cols-3 gap-1.5">
              {numpad.map((key) => (
                <motion.button
                  key={key}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => (key === "⌫" ? backspace() : addDigit(key))}
                  className={`rounded-lg py-2 text-sm font-semibold transition-colors ${
                    key === "⌫"
                      ? "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                      : key === "K"
                        ? "bg-amber-700/30 text-amber-400 hover:bg-amber-700/50"
                        : "bg-zinc-800 text-white hover:bg-zinc-700"
                  }`}
                >
                  {key}
                </motion.button>
              ))}
            </div>

            {/* Verify button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={verify}
              className="w-full rounded-lg bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] py-2.5 text-sm font-bold text-white"
            >
              Verificar RUT
            </motion.button>

            <div className="text-[9px] text-zinc-500">
              Prueba: 12345678-9 • 98765432-1 • 11111111-1
            </div>
          </motion.div>
        )}

        {view === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-48 w-full flex-col items-center justify-center gap-3"
          >
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-600 border-t-cyan-400" />
            <span className="text-xs text-zinc-400">Verificando RUT...</span>
          </motion.div>
        )}

        {(view === "success" || view === "ticket") && employee && (
          <motion.div
            key="ticket"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex w-full flex-col items-center gap-3"
          >
            {view === "success" && (
              <div className="flex h-32 w-full flex-col items-center justify-center rounded-lg bg-green-500/10">
                <div className="text-3xl">✅</div>
                <div className="mt-2 text-sm font-bold text-green-400">
                  RUT Verificado
                </div>
              </div>
            )}

            {view === "ticket" && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full rounded-lg border border-dashed border-zinc-600 bg-zinc-900 p-4"
              >
                <div className="text-center text-[10px] uppercase tracking-widest text-zinc-500">
                  ── TICKET DE CASINO ──
                </div>
                <div className="mt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Nombre:</span>
                    <span className="font-medium text-white">{employee.nombre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">RUT:</span>
                    <span className="font-mono text-white">{employee.rut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Evento:</span>
                    <span className="text-white">{employee.evento}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Servicio:</span>
                    <span className="font-bold text-cyan-400">{employee.servicio}</span>
                  </div>
                  <div className="border-t border-zinc-800 pt-1.5">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Fecha:</span>
                      <span className="text-white">{new Date().toLocaleDateString("es-CL")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Hora:</span>
                      <span className="text-white">{new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-center text-[10px] text-zinc-600">
                  N° CASINO-{Date.now().toString().slice(-6)}
                </div>
              </motion.div>
            )}

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={reset}
              className="w-full rounded-lg bg-zinc-800 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-700"
            >
              Nueva verificación
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
