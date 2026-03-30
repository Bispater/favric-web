"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mini-demo replica of rinno/chicken-menu Angular app
// Real menu data from: chicken-menu/src/app/services/menu.service.ts

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  emoji?: string;
  category: string;
}

const menuData: Record<string, MenuItem[]> = {
  "Hamburguesas": [
    { id: "1", name: "PA 'TI MAKI", description: "Pan grillado + salsa BBQ + bacon + cebolla caramelizada + mayo japonesa", price: 8900, emoji: "🍔", category: "burgers" },
    { id: "2", name: "¿QUÉ FUE PRIMERO?", description: "Cebollitas crocante + paprikitas dulces + mayo japonesa", price: 9400, emoji: "✨", category: "burgers" },
    { id: "3", name: "TODO CALZA POLLO", description: "Bacon + pepinitos + salsa cebolla caramelizada + mayo japonesa + lechuga", price: 9600, emoji: "🐔", category: "burgers" },
    { id: "4", name: "GALLO CLAUDIO", description: "Salsa mostaza con miel + palta + bacon ahumado + cebolla + tomate", price: 9400, emoji: "🐓", category: "burgers" },
  ],
  "Para Polluelos": [
    { id: "20", name: "LOS POLLITOS DICEN", description: "Cheddar + ketchup + lechuga", price: 8900, category: "kids" },
    { id: "21", name: "CHICKEN LITTLE", description: "Pollo frito + papas fritas", price: 7400, category: "kids" },
  ],
  "Acompañamientos": [
    { id: "30", name: "WAFFLE FRIES", price: 3800, category: "sides" },
    { id: "31", name: "PAPAS FRITAS", price: 3500, category: "sides" },
    { id: "32", name: "ONION RINGS", price: 3900, category: "sides" },
    { id: "33", name: "HUEVOS DE ORO", description: "Bañados en salsa negra + un huevo", price: 3900, category: "sides" },
  ],
};

const categoryColors: Record<string, string> = {
  "Hamburguesas": "#f44336",
  "Para Polluelos": "#ff6b9d",
  "Acompañamientos": "#9ccc65",
};

function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-CL")}`;
}

export default function ChickenMenuDemo() {
  const [activeCategory, setActiveCategory] = useState("Hamburguesas");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cart, setCart] = useState<{ item: MenuItem; qty: number }[]>([]);

  const categories = Object.keys(menuData);
  const items = menuData[activeCategory] || [];

  function addToCart(item: MenuItem) {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [...prev, { item, qty: 1 }];
    });
    setSelectedItem(item);
    setTimeout(() => setSelectedItem(null), 600);
  }

  const total = cart.reduce((sum, c) => sum + c.item.price * c.qty, 0);

  return (
    <div className="flex flex-col gap-3">
      {/* Category tabs */}
      <div className="flex gap-1 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
              activeCategory === cat
                ? "text-white shadow-md"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
            style={
              activeCategory === cat
                ? { backgroundColor: categoryColors[cat] }
                : {}
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu items */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-1.5"
        >
          {items.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => addToCart(item)}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-3 rounded-lg border p-2.5 text-left transition-all ${
                selectedItem?.id === item.id
                  ? "border-green-500/50 bg-green-500/10"
                  : "border-zinc-800 bg-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-800"
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  {item.emoji && <span className="text-sm">{item.emoji}</span>}
                  <span className="text-xs font-bold text-white">
                    {item.name}
                  </span>
                </div>
                {item.description && (
                  <p className="mt-0.5 text-[10px] leading-tight text-zinc-500">
                    {item.description}
                  </p>
                )}
              </div>
              <span
                className="whitespace-nowrap text-sm font-black"
                style={{ color: categoryColors[activeCategory] }}
              >
                {formatPrice(item.price)}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Cart summary */}
      {cart.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-zinc-700 bg-zinc-800/80 p-3"
        >
          <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
            Pedido
          </div>
          <div className="mt-1.5 space-y-1">
            {cart.map((c) => (
              <div key={c.item.id} className="flex justify-between text-[11px]">
                <span className="text-zinc-300">
                  {c.qty}x {c.item.name}
                </span>
                <span className="text-zinc-400">
                  {formatPrice(c.item.price * c.qty)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-zinc-700 pt-2">
            <span className="text-xs font-bold text-white">Total</span>
            <span className="text-sm font-black text-green-400">
              {formatPrice(total)}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
