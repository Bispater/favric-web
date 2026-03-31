"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const stats = [
  { label: "Productos", value: 248, icon: "📦", color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Categorías", value: 12, icon: "🏷️", color: "text-purple-400", bg: "bg-purple-500/10" },
  { label: "Marcas", value: 8, icon: "⭐", color: "text-amber-400", bg: "bg-amber-500/10" },
  { label: "Catálogos", value: 3, icon: "📋", color: "text-green-400", bg: "bg-green-500/10" },
];

const products = [
  { id: 1, name: "Samsung Galaxy S24", sku: "SAM-S24-128", price: 799990, stock: 45, category: "Smartphones", status: "active" },
  { id: 2, name: "MacBook Air M3", sku: "APL-MBA-M3", price: 1299990, stock: 12, category: "Laptops", status: "active" },
  { id: 3, name: "Sony WH-1000XM5", sku: "SNY-WH5-BK", price: 349990, stock: 0, category: "Audio", status: "out_of_stock" },
  { id: 4, name: "iPad Pro 12.9\"", sku: "APL-IPP-129", price: 999990, stock: 8, category: "Tablets", status: "active" },
  { id: 5, name: "Logitech MX Master 3S", sku: "LOG-MX3S-GR", price: 89990, stock: 67, category: "Periféricos", status: "active" },
  { id: 6, name: "Dell U2723QE", sku: "DEL-U27-4K", price: 549990, stock: 3, category: "Monitores", status: "low_stock" },
];

type Tab = "overview" | "products" | "form";

function formatCLP(n: number) {
  return `$${n.toLocaleString("es-CL")}`;
}

const statusBadge: Record<string, string> = {
  active: "bg-green-500/10 text-green-400",
  out_of_stock: "bg-red-500/10 text-red-400",
  low_stock: "bg-yellow-500/10 text-yellow-400",
};

const statusLabel: Record<string, string> = {
  active: "Activo",
  out_of_stock: "Sin stock",
  low_stock: "Stock bajo",
};

// Mini bar chart
function MiniChart() {
  const data = [35, 52, 41, 68, 55, 73, 49, 80, 62, 71, 58, 90];
  const months = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  const max = Math.max(...data);

  return (
    <div className="flex items-end gap-1">
      {data.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(v / max) * 60}px` }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className="w-full rounded-t bg-gradient-to-t from-[var(--gradient-start)] to-[var(--gradient-end)] opacity-80"
          />
          <span className="text-[7px] text-zinc-500">{months[i]}</span>
        </div>
      ))}
    </div>
  );
}

export default function DashboardDemo() {
  const [tab, setTab] = useState<Tab>("overview");
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({ name: "", sku: "", price: "", category: "Smartphones", stock: "" });
  const [formSaved, setFormSaved] = useState(false);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  function handleSave() {
    setFormSaved(true);
    setTimeout(() => setFormSaved(false), 2000);
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Dashboard" },
    { id: "products", label: "Productos" },
    { id: "form", label: "Nuevo" },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-zinc-800/50 p-0.5">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`relative flex-1 rounded-md px-2 py-1.5 text-[10px] font-semibold transition-all ${
              tab === t.id ? "text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {tab === t.id && (
              <motion.div
                layoutId="dashboard-tab"
                className="absolute inset-0 rounded-md bg-zinc-700"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{t.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* OVERVIEW */}
        {tab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-col gap-3"
          >
            {/* Stats */}
            <div className="grid grid-cols-2 gap-2">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-800/30 p-2.5"
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${s.bg} text-base`}>
                    {s.icon}
                  </div>
                  <div>
                    <div className={`text-lg font-black leading-none ${s.color}`}>{s.value}</div>
                    <div className="text-[9px] text-zinc-500">{s.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chart */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-800/30 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-zinc-400">Ventas Mensuales</span>
                <span className="text-[9px] text-zinc-600">2025</span>
              </div>
              <MiniChart />
            </div>

            {/* Recent products */}
            <div className="rounded-lg border border-zinc-800 bg-zinc-800/30 p-3">
              <span className="text-[10px] font-semibold text-zinc-400">
                Últimos productos
              </span>
              <div className="mt-2 space-y-1.5">
                {products.slice(0, 3).map((p) => (
                  <div key={p.id} className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-medium text-white">{p.name}</span>
                      <span className="ml-1.5 text-[9px] text-zinc-500">{p.category}</span>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-300">{formatCLP(p.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* PRODUCTS TABLE */}
        {tab === "products" && (
          <motion.div
            key="products"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-col gap-2"
          >
            {/* Search */}
            <div className="relative">
              <svg className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por nombre o SKU..."
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-8 pr-3 text-[11px] text-white placeholder-zinc-500 focus:border-accent/50 focus:outline-none"
              />
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-lg border border-zinc-800">
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 bg-zinc-800/80 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-zinc-500">
                <span>Producto</span>
                <span>Precio</span>
                <span>Estado</span>
              </div>
              <div className="divide-y divide-zinc-800/60">
                {filteredProducts.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="grid grid-cols-[1fr_auto_auto] items-center gap-x-3 px-3 py-2 transition-colors hover:bg-zinc-800/40"
                  >
                    <div>
                      <span className="block text-[11px] font-medium text-white">{p.name}</span>
                      <span className="text-[9px] text-zinc-500">{p.sku} · Stock: {p.stock}</span>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-300">{formatCLP(p.price)}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[8px] font-semibold ${statusBadge[p.status]}`}>
                      {statusLabel[p.status]}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="text-center text-[9px] text-zinc-600">
              {filteredProducts.length} de {products.length} productos
            </div>
          </motion.div>
        )}

        {/* FORM */}
        {tab === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-col gap-2.5"
          >
            <p className="text-[10px] font-semibold text-zinc-400">Nuevo Producto</p>

            <div>
              <label className="mb-0.5 block text-[9px] font-medium text-zinc-500">Nombre</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Samsung Galaxy S24"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-[11px] text-white placeholder-zinc-500 focus:border-accent/50 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-0.5 block text-[9px] font-medium text-zinc-500">SKU</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="SAM-S24-128"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-[11px] text-white placeholder-zinc-500 focus:border-accent/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-0.5 block text-[9px] font-medium text-zinc-500">Precio</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="$799.990"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-[11px] text-white placeholder-zinc-500 focus:border-accent/50 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-0.5 block text-[9px] font-medium text-zinc-500">Categoría</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-[11px] text-white focus:border-accent/50 focus:outline-none"
                >
                  <option>Smartphones</option>
                  <option>Laptops</option>
                  <option>Audio</option>
                  <option>Tablets</option>
                  <option>Periféricos</option>
                  <option>Monitores</option>
                </select>
              </div>
              <div>
                <label className="mb-0.5 block text-[9px] font-medium text-zinc-500">Stock</label>
                <input
                  type="text"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="0"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-[11px] text-white placeholder-zinc-500 focus:border-accent/50 focus:outline-none"
                />
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSave}
              className="mt-1 w-full rounded-lg bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] py-2.5 text-xs font-bold text-white"
            >
              {formSaved ? "✓ Guardado" : "Guardar Producto"}
            </motion.button>

            {formSaved && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-[10px] text-green-400"
              >
                Producto guardado exitosamente
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
