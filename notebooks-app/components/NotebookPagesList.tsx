'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import Link from 'next/link';

interface NotebookPagesListProps {
  notebookId: string;
}

export default function NotebookPagesList({ notebookId }: NotebookPagesListProps) {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar las páginas de este cuaderno
  useEffect(() => {
    const loadPages = async () => {
      const pagesRef = collection(db, 'notebooks', notebookId, 'pages');
      const snapshot = await getDocs(pagesRef);
      const pagesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPages(pagesData);
      setLoading(false);
    };

    loadPages();
  }, [notebookId]);

  // Agregar nueva hoja
  const addPage = async () => {
    const title = prompt('Título de la nueva hoja:');
    if (!title) return;

    const pagesRef = collection(db, 'notebooks', notebookId, 'pages');
    const docRef = await addDoc(pagesRef, { title, content: '' });
    setPages((prev) => [...prev, { id: docRef.id, title, content: '' }]);
  };

  // Eliminar hoja
  const deletePage = async (id: string) => {
    if (!confirm('¿Deseas eliminar esta hoja?')) return;

    const pageRef = doc(db, 'notebooks', notebookId, 'pages', id);
    await deleteDoc(pageRef);
    setPages((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) return <p className="text-white">Cargando hojas...</p>;

  return (
    <div className="p-4">
      <button
        onClick={addPage}
        className="bg-indigo-600 text-white px-3 py-2 rounded mb-4 hover:bg-indigo-500"
      >
        + Nueva hoja
      </button>

      <ul className="space-y-2">
        {pages.map((page) => (
          <li
            key={page.id}
            className="flex justify-between items-center bg-gray-800 text-white p-3 rounded"
          >
            <Link href={`/notebooks/${notebookId}/pages/${page.id}`}>
              <span className="hover:underline">{page.title}</span>
            </Link>
            <button
              onClick={() => deletePage(page.id)}
              className="text-red-400 hover:text-red-600"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
