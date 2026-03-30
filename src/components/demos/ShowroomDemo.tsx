"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mini-demo replica of fvx-showroom-web Angular app
// Real data extracted from: rinno/fvx-showroom-web/src/app/models/screen.model.ts

interface Screen {
  id: string;
  name: string;
  ip: string;
  isSelected: boolean;
  lastContent: string | null;
}

interface ContentButton {
  name: string;
  command: string;
  color: string;
  textColor: string;
}

const defaultScreens: Screen[] = [
  { id: "1", name: "Prueba Rinno", ip: "172.16.70.247", isSelected: false, lastContent: null },
  { id: "2", name: "VW2x1", ip: "172.16.70.161", isSelected: false, lastContent: null },
  { id: "3", name: "Pantalla PUA Vertical", ip: "172.16.70.159", isSelected: false, lastContent: null },
  { id: "4", name: "Pantalla Led", ip: "172.16.70.160", isSelected: false, lastContent: null },
];

const defaultButtons: ContentButton[] = [
  { name: "Rojo", command: "Rojo", color: "#f44336", textColor: "#ffffff" },
  { name: "Amarillo", command: "Amarillo", color: "#ffeb3b", textColor: "#000000" },
  { name: "Azul", command: "Azul", color: "#007ACC", textColor: "#ffffff" },
  { name: "Verde", command: "Verde", color: "#4caf50", textColor: "#ffffff" },
  { name: "Púrpura", command: "Purpura", color: "#9c27b0", textColor: "#ffffff" },
  { name: "Naranja", command: "Naranja", color: "#ff9800", textColor: "#000000" },
];

export default function ShowroomDemo() {
  const [screens, setScreens] = useState<Screen[]>(defaultScreens);
  const [statusMessage, setStatusMessage] = useState("Bienvenido al Showroom");

  const selectedCount = screens.filter((s) => s.isSelected).length;

  function toggleScreen(id: string) {
    setScreens((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isSelected: !s.isSelected } : s))
    );
  }

  function sendContent(button: ContentButton) {
    const selected = screens.filter((s) => s.isSelected);
    if (selected.length === 0) {
      setStatusMessage("⚠️ Selecciona al menos una pantalla");
      setTimeout(() => setStatusMessage("Bienvenido al Showroom"), 3000);
      return;
    }
    setScreens((prev) =>
      prev.map((s) =>
        s.isSelected ? { ...s, lastContent: button.command } : s
      )
    );
    const names =
      selected.length === 1 ? selected[0].name : `${selected.length} pantallas`;
    setStatusMessage(`✅ Enviado "${button.command}" a ${names}`);
    setTimeout(() => setStatusMessage("Bienvenido al Showroom"), 3000);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Status bar */}
      <div className="flex items-center justify-between rounded-lg bg-zinc-800/80 px-4 py-2">
        <span className="text-xs text-zinc-400">
          {selectedCount > 0
            ? `${selectedCount} pantalla${selectedCount > 1 ? "s" : ""} seleccionada${selectedCount > 1 ? "s" : ""}`
            : statusMessage}
        </span>
        <span className="rounded bg-zinc-700 px-2 py-0.5 text-[10px] text-zinc-400">
          UDP :5000
        </span>
      </div>

      {/* Screens grid */}
      <div className="grid grid-cols-2 gap-2">
        {screens.map((screen) => (
          <motion.button
            key={screen.id}
            onClick={() => toggleScreen(screen.id)}
            whileTap={{ scale: 0.97 }}
            className={`relative flex flex-col items-center gap-1 rounded-lg border p-3 text-left transition-all ${
              screen.isSelected
                ? "border-cyan-500/50 bg-cyan-500/10"
                : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
            }`}
          >
            {/* Screen mockup */}
            <div
              className="flex h-10 w-full items-center justify-center rounded border border-zinc-600 text-[10px]"
              style={{
                backgroundColor: screen.lastContent
                  ? defaultButtons.find((b) => b.command === screen.lastContent)?.color ?? "#27272a"
                  : "#27272a",
              }}
            >
              {screen.lastContent ? (
                <span className="font-medium text-white drop-shadow">
                  {screen.lastContent}
                </span>
              ) : (
                <span className="text-zinc-500">Sin señal</span>
              )}
            </div>
            <span className="text-[11px] font-medium text-zinc-300">
              {screen.name}
            </span>
            <span className="text-[9px] text-zinc-500">{screen.ip}</span>
            {screen.isSelected && (
              <motion.div
                layoutId="screen-check"
                className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-cyan-400"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Color buttons */}
      <div className="grid grid-cols-3 gap-2">
        {defaultButtons.map((btn) => (
          <motion.button
            key={btn.name}
            onClick={() => sendContent(btn)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg px-3 py-2 text-xs font-bold shadow-md transition-shadow hover:shadow-lg"
            style={{
              backgroundColor: btn.color,
              color: btn.textColor,
            }}
          >
            {btn.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
