"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mini-demo replica of waterflow-scanner Flutter app
// Flow: QR Scan → Prepare → Camera Capture → OCR Result → Confirm

interface Measurement {
  meterId: string;
  apartment: string;
  reading: string;
  date: string;
  time: string;
}

const mockMeasurements: Measurement[] = [
  { meterId: "MED-001", apartment: "4B - Piso 2", reading: "1247.3", date: "30/03/2026", time: "09:15" },
  { meterId: "MED-002", apartment: "7A - Piso 4", reading: "892.1", date: "30/03/2026", time: "09:22" },
  { meterId: "MED-003", apartment: "2C - Piso 1", reading: "2103.7", date: "30/03/2026", time: "09:35" },
];

type Step = "scan" | "scanning" | "prepare" | "capture" | "ocr" | "confirmed" | "history";

export default function HydroScanDemo() {
  const [step, setStep] = useState<Step>("scan");
  const [currentMeter, setCurrentMeter] = useState({ id: "", apartment: "" });
  const [ocrValue, setOcrValue] = useState("");
  const [measurements, setMeasurements] = useState<Measurement[]>(mockMeasurements);

  function simulateScan() {
    setStep("scanning");
    setTimeout(() => {
      setCurrentMeter({ id: `MED-${String(measurements.length + 1).padStart(3, "0")}`, apartment: "5D - Piso 3" });
      setStep("prepare");
    }, 1200);
  }

  function simulateCapture() {
    setStep("capture");
    setTimeout(() => {
      const reading = (Math.random() * 3000 + 500).toFixed(1);
      setOcrValue(reading);
      setStep("ocr");
    }, 1500);
  }

  function confirmReading() {
    const newM: Measurement = {
      meterId: currentMeter.id,
      apartment: currentMeter.apartment,
      reading: ocrValue,
      date: new Date().toLocaleDateString("es-CL"),
      time: new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" }),
    };
    setMeasurements((prev) => [newM, ...prev]);
    setStep("confirmed");
    setTimeout(() => setStep("scan"), 2000);
  }

  function reset() {
    setStep("scan");
    setCurrentMeter({ id: "", apartment: "" });
    setOcrValue("");
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Step indicator */}
      <div className="flex items-center gap-1">
        {["QR", "Prep", "Cam", "OCR", "✓"].map((s, i) => {
          const stepIndex = ["scan", "prepare", "capture", "ocr", "confirmed"].indexOf(
            step === "scanning" ? "scan" : step === "history" ? "confirmed" : step
          );
          return (
            <div key={s} className="flex items-center">
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-bold ${
                  i <= stepIndex
                    ? "bg-cyan-500 text-white"
                    : "bg-zinc-800 text-zinc-500"
                }`}
              >
                {s}
              </div>
              {i < 4 && (
                <div
                  className={`h-px w-4 ${i < stepIndex ? "bg-cyan-500" : "bg-zinc-700"}`}
                />
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* Step: Scan QR */}
        {step === "scan" && (
          <motion.div
            key="scan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex h-32 w-full flex-col items-center justify-center rounded-lg border border-dashed border-zinc-600 bg-zinc-900">
              <svg className="h-10 w-10 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75H16.5v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75H16.5v-.75z" />
              </svg>
              <span className="mt-2 text-[11px] text-zinc-500">
                Apunte al código QR del medidor
              </span>
            </div>
            <div className="flex w-full gap-2">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={simulateScan}
                className="flex-1 rounded-lg bg-cyan-600 py-2.5 text-xs font-bold text-white hover:bg-cyan-500"
              >
                📱 Escanear QR
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setStep("history")}
                className="rounded-lg bg-zinc-800 px-3 py-2.5 text-xs text-zinc-400 hover:bg-zinc-700"
              >
                📋
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step: Scanning animation */}
        {step === "scanning" && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-40 w-full flex-col items-center justify-center rounded-lg bg-zinc-900"
          >
            <motion.div
              className="h-16 w-16 rounded-lg border-2 border-cyan-400"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="mt-3 text-xs text-cyan-400">Escaneando...</span>
          </motion.div>
        )}

        {/* Step: Prepare measurement */}
        {step === "prepare" && (
          <motion.div
            key="prepare"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-3"
          >
            <div className="rounded-lg border border-zinc-700 bg-zinc-800/80 p-3">
              <div className="text-[10px] uppercase tracking-wider text-zinc-500">
                Datos del medidor
              </div>
              <div className="mt-2 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">ID Medidor:</span>
                  <span className="font-mono font-bold text-cyan-400">{currentMeter.id}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500">Departamento:</span>
                  <span className="text-white">{currentMeter.apartment}</span>
                </div>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={simulateCapture}
              className="w-full rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 py-2.5 text-xs font-bold text-white"
            >
              📷 Capturar Medidor
            </motion.button>
            <button onClick={reset} className="text-[10px] text-zinc-500 hover:text-zinc-400">
              ← Volver
            </button>
          </motion.div>
        )}

        {/* Step: Camera capture simulation */}
        {step === "capture" && (
          <motion.div
            key="capture"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-40 w-full flex-col items-center justify-center rounded-lg bg-zinc-900"
          >
            {/* Circular overlay guide (from meter_overlay_painter.dart) */}
            <div className="relative h-20 w-20">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-2 rounded-full border border-cyan-400/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg">💧</span>
              </div>
            </div>
            <span className="mt-2 text-[10px] text-cyan-400">
              Procesando OCR con ML Kit...
            </span>
          </motion.div>
        )}

        {/* Step: OCR Result */}
        {step === "ocr" && (
          <motion.div
            key="ocr"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-3"
          >
            <div className="rounded-lg border border-zinc-700 bg-zinc-800/80 p-3 text-center">
              <div className="text-[10px] uppercase tracking-wider text-zinc-500">
                Lectura detectada (OCR)
              </div>
              <input
                type="text"
                value={ocrValue}
                onChange={(e) => setOcrValue(e.target.value)}
                className="mt-2 w-full rounded bg-zinc-900 px-3 py-2 text-center text-xl font-bold text-white outline-none ring-1 ring-zinc-700 focus:ring-cyan-500"
              />
              <div className="mt-1 text-[9px] text-zinc-500">
                m³ • Editable si el OCR no es preciso
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStep("capture")}
                className="flex-1 rounded-lg bg-zinc-800 py-2 text-xs text-zinc-400 hover:bg-zinc-700"
              >
                Recapturar
              </button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={confirmReading}
                className="flex-1 rounded-lg bg-green-600 py-2 text-xs font-bold text-white hover:bg-green-500"
              >
                ✓ Enviar Medición
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step: Confirmed */}
        {step === "confirmed" && (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-32 w-full flex-col items-center justify-center rounded-lg bg-green-500/10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-3xl"
            >
              ✅
            </motion.div>
            <div className="mt-2 text-sm font-bold text-green-400">
              Medición enviada
            </div>
            <div className="text-[10px] text-zinc-500">
              {currentMeter.id} → {ocrValue} m³
            </div>
          </motion.div>
        )}

        {/* History view */}
        {step === "history" && (
          <motion.div
            key="history"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-2"
          >
            <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
              Historial de mediciones
            </div>
            <div className="overflow-hidden rounded-lg border border-zinc-700">
              <table className="w-full text-[10px]">
                <thead>
                  <tr className="border-b border-zinc-700 bg-zinc-800">
                    <th className="px-2 py-1.5 text-left font-medium text-zinc-400">Medidor</th>
                    <th className="px-2 py-1.5 text-left font-medium text-zinc-400">Depto</th>
                    <th className="px-2 py-1.5 text-right font-medium text-zinc-400">m³</th>
                    <th className="px-2 py-1.5 text-right font-medium text-zinc-400">Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {measurements.map((m, i) => (
                    <tr key={i} className="border-b border-zinc-800 last:border-0">
                      <td className="px-2 py-1.5 font-mono text-cyan-400">{m.meterId}</td>
                      <td className="px-2 py-1.5 text-zinc-300">{m.apartment}</td>
                      <td className="px-2 py-1.5 text-right font-bold text-white">{m.reading}</td>
                      <td className="px-2 py-1.5 text-right text-zinc-500">{m.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={reset}
              className="text-[10px] text-zinc-500 hover:text-zinc-400"
            >
              ← Volver a escanear
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
