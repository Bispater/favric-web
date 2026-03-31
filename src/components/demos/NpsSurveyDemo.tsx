"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Step = "welcome" | "rating" | "comment" | "thanks";
type Category = "detractor" | "passive" | "promoter";

const faces = ["😡", "😠", "😤", "😟", "😕", "😐", "🙂", "😊", "😄", "😍", "🤩"];

function getCategory(score: number): Category {
  if (score <= 6) return "detractor";
  if (score <= 8) return "passive";
  return "promoter";
}

const categoryColors: Record<Category, string> = {
  detractor: "text-red-400 bg-red-500/10 border-red-500/20",
  passive: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  promoter: "text-green-400 bg-green-500/10 border-green-500/20",
};

const categoryLabels: Record<Category, string> = {
  detractor: "Detractor",
  passive: "Pasivo",
  promoter: "Promotor",
};

const followUpQuestions: Record<Category, string> = {
  detractor: "¿Qué podríamos mejorar?",
  passive: "¿Qué nos faltó para ser excelentes?",
  promoter: "¿Qué fue lo que más te gustó?",
};

const thanksMessages: Record<Category, { title: string; message: string; emoji: string }> = {
  detractor: {
    title: "¡Gracias por tu honestidad!",
    message: "Tomaremos en cuenta tus comentarios para mejorar.",
    emoji: "💙",
  },
  passive: {
    title: "¡Gracias por tu opinión!",
    message: "Trabajaremos para que tu próxima experiencia sea aún mejor.",
    emoji: "🙏",
  },
  promoter: {
    title: "¡Muchas gracias!",
    message: "¡Nos alegra saber que tuviste una excelente experiencia!",
    emoji: "🎉",
  },
};

export default function NpsSurveyDemo() {
  const [step, setStep] = useState<Step>("welcome");
  const [score, setScore] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  const category = score !== null ? getCategory(score) : null;

  function reset() {
    setStep("welcome");
    setScore(null);
    setComment("");
  }

  return (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="wait">
        {/* WELCOME */}
        {step === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex w-full flex-col items-center gap-3 text-center"
          >
            <div className="text-4xl">📊</div>
            <h3 className="text-sm font-bold text-white">
              ¡Tu opinión es importante!
            </h3>
            <p className="text-[11px] leading-relaxed text-zinc-400">
              Queremos conocer tu experiencia. Solo te tomará 30 segundos.
            </p>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setStep("rating")}
              className="mt-1 w-full rounded-lg bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] py-2.5 text-sm font-bold text-white"
            >
              Comenzar Encuesta
            </motion.button>
            <p className="text-[9px] text-zinc-600">🔒 Tus respuestas son confidenciales</p>
          </motion.div>
        )}

        {/* RATING */}
        {step === "rating" && (
          <motion.div
            key="rating"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex w-full flex-col items-center gap-3"
          >
            {/* Progress */}
            <div className="w-full">
              <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]" />
              </div>
              <p className="mt-1 text-[9px] text-zinc-500">Paso 1 de 3</p>
            </div>

            <h3 className="text-xs font-bold text-white">
              ¿Qué tan probable es que nos recomiendes?
            </h3>
            <p className="text-[10px] text-zinc-500">
              0 = Nada probable · 10 = Muy probable
            </p>

            {/* Score buttons */}
            <div className="grid w-full grid-cols-6 gap-1">
              {faces.map((face, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setScore(i)}
                  className={`flex flex-col items-center rounded-lg border py-1.5 transition-all ${
                    score === i
                      ? `${categoryColors[getCategory(i)]} scale-105 shadow-md`
                      : "border-zinc-800 bg-zinc-800/50 hover:border-zinc-600"
                  } ${i === 10 ? "col-start-3" : ""}`}
                >
                  <span className="text-base leading-none">{face}</span>
                  <span className="mt-0.5 text-[9px] font-bold text-zinc-400">{i}</span>
                </motion.button>
              ))}
            </div>

            {/* Feedback */}
            {score !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`w-full rounded-lg border p-2 text-center text-[11px] font-medium ${categoryColors[getCategory(score)]}`}
              >
                Seleccionaste: <span className="font-bold">{score}</span> {faces[score]}
              </motion.div>
            )}

            <div className="flex w-full gap-2">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={reset}
                className="flex-1 rounded-lg border border-zinc-700 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800"
              >
                Volver
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => score !== null && setStep("comment")}
                disabled={score === null}
                className="flex-1 rounded-lg bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] py-2 text-xs font-bold text-white disabled:opacity-40"
              >
                Siguiente
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* COMMENT */}
        {step === "comment" && category && (
          <motion.div
            key="comment"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex w-full flex-col items-center gap-3"
          >
            {/* Progress */}
            <div className="w-full">
              <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]" />
              </div>
              <p className="mt-1 text-[9px] text-zinc-500">Paso 2 de 3</p>
            </div>

            <div className={`inline-flex items-baseline gap-1 rounded-full border px-3 py-1 ${categoryColors[category]}`}>
              <span className="text-lg font-black">{score}</span>
              <span className="text-[10px] font-semibold opacity-70">/ 10</span>
            </div>

            <h3 className="text-xs font-bold text-white">
              {followUpQuestions[category]}
            </h3>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Escribe tu comentario aquí... (opcional)"
              maxLength={500}
              rows={3}
              className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-accent/50 focus:outline-none"
            />
            <p className="self-end text-[9px] text-zinc-600">{comment.length} / 500</p>

            <div className="flex w-full gap-2">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setStep("rating")}
                className="flex-1 rounded-lg border border-zinc-700 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800"
              >
                Volver
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setStep("thanks")}
                className="flex-1 rounded-lg bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] py-2 text-xs font-bold text-white"
              >
                {comment.length > 0 ? "Enviar" : "Omitir y Enviar"}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* THANKS */}
        {step === "thanks" && category && (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex w-full flex-col items-center gap-3 text-center"
          >
            {/* Progress */}
            <div className="w-full">
              <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-full rounded-full bg-green-500" />
              </div>
              <p className="mt-1 text-[9px] font-semibold text-green-400">Completado</p>
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="text-4xl"
            >
              {thanksMessages[category].emoji}
            </motion.div>

            <h3 className="text-sm font-bold text-white">
              {thanksMessages[category].title}
            </h3>
            <p className="text-[11px] text-zinc-400">
              {thanksMessages[category].message}
            </p>

            {/* Summary */}
            <div className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 p-3 text-left">
              <p className="mb-2 text-center text-[9px] uppercase tracking-widest text-zinc-500">
                Resumen
              </p>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Puntuación:</span>
                  <span className={`font-bold ${categoryColors[category].split(" ")[0]}`}>
                    {score} / 10
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Categoría:</span>
                  <span className="font-medium text-white">{categoryLabels[category]}</span>
                </div>
                {comment.length > 0 && (
                  <div className="border-t border-zinc-700 pt-1.5">
                    <span className="text-zinc-500">Comentario:</span>
                    <p className="mt-0.5 italic text-zinc-300">&ldquo;{comment}&rdquo;</p>
                  </div>
                )}
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={reset}
              className="w-full rounded-lg bg-zinc-800 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-700"
            >
              Realizar otra encuesta
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
