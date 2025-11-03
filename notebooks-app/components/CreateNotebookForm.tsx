"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function CreateNotebookForm() {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#4f46e5");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "notebooks"), {
        title,
        color,
        createdAt: Timestamp.now(),
      });
      setTitle("");
    } catch (error) {
      console.error("Error creando cuaderno:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleCreate} className="p-4 bg-gray-800 rounded-2xl flex flex-col gap-3">
      <h2 className="text-white text-lg font-semibold">Crear nuevo cuaderno</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nombre del cuaderno"
        className="p-2 rounded bg-gray-700 text-white outline-none"
      />
      <label className="text-gray-300 text-sm">Color del cuaderno:</label>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-16 h-8 border-none rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded p-2 transition"
      >
        {loading ? "Creando..." : "Crear cuaderno"}
      </button>
    </form>
  );
}
