"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import CreateNotebookForm from "@/components/CreateNotebookForm";
import NotebookCard from "@/components/NotebookCard";

interface Notebook {
  id: string;
  title: string;
  color: string;
}

export default function Home() {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);

  useEffect(() => {
    const q = query(collection(db, "notebooks"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotebooks(snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Notebook, "id">),
      })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">📚 Mis Cuadernos Digitales</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {notebooks.map((notebook) => (
          <NotebookCard key={notebook.id} {...notebook} />
        ))}
      </div>

      <div className="mt-10">
        <CreateNotebookForm />
      </div>
    </main>
  );
}
