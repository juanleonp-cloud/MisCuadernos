'use client';

import { useState, useEffect } from 'react';


interface NotebookPageEditorProps {
  notebookId: string;
  pageId: string;
}

// Botón simple sin librerías externas
function Button({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition ${className}`}
    >
      {children}
    </button>
  );
}


export default function NotebookPageEditor({ notebookId, pageId }: NotebookPageEditorProps) {
  const [content, setContent] = useState('');
  const [pages, setPages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(pageId);

  // 🔹 Cargar páginas y contenido desde localStorage
  useEffect(() => {
    const savedPages = JSON.parse(localStorage.getItem(`notebook-${notebookId}-pages`) || '[]');
    setPages(savedPages.length ? savedPages : ['1']);
  }, [notebookId]);

  // 🔹 Cargar contenido de la página actual
  useEffect(() => {
    const savedContent = localStorage.getItem(`notebook-${notebookId}-page-${currentPage}`);
    setContent(savedContent || '');
  }, [notebookId, currentPage]);

  // 🔹 Guardar automáticamente el contenido mientras se escribe
  useEffect(() => {
    localStorage.setItem(`notebook-${notebookId}-page-${currentPage}`, content);
  }, [content, notebookId, currentPage]);

  // 🔹 Crear una nueva página
  const addPage = () => {
    const newPageId = `page-${Date.now()}`;
    const updatedPages = [...pages, newPageId];
    setPages(updatedPages);
    localStorage.setItem(`notebook-${notebookId}-pages`, JSON.stringify(updatedPages));
    setCurrentPage(newPageId);
    setContent('');
  };

  // 🔹 Eliminar una página
  const deletePage = (pageToDelete: string) => {
    const updatedPages = pages.filter(p => p !== pageToDelete);
    setPages(updatedPages);
    localStorage.setItem(`notebook-${notebookId}-pages`, JSON.stringify(updatedPages));

    // Borrar contenido de localStorage
    localStorage.removeItem(`notebook-${notebookId}-page-${pageToDelete}`);

    // Si borras la página actual, ir a otra
    if (pageToDelete === currentPage && updatedPages.length > 0) {
      setCurrentPage(updatedPages[0]);
    } else if (updatedPages.length === 0) {
      addPage();
    }
  };

  return (
    <div className="p-4 border rounded-md bg-neutral-900 text-white">
      <h2 className="text-xl font-semibold mb-4">Cuaderno: {notebookId}</h2>

      {/* 🔸 Lista de páginas */}
      <div className="flex flex-wrap gap-2 mb-4">
        {pages.map((page) => (
          <div
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-md cursor-pointer border ${
              page === currentPage ? 'bg-blue-600' : 'bg-neutral-800 hover:bg-neutral-700'
            }`}
          >
            {page}
            <button
              onClick={(e) => {
                e.stopPropagation();
                deletePage(page);
              }}
              className="ml-2 text-red-400 hover:text-red-500"
            >
              ✕
            </button>
          </div>
        ))}

        <Button onClick={addPage} className="bg-green-600 hover:bg-green-700">
          ➕ Nueva página
        </Button>
      </div>

      {/* 🔸 Editor de texto */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-[400px] bg-neutral-800 text-white p-2 rounded-md resize-none outline-none"
        placeholder="Escribe tus notas aquí..."
      />
    </div>
  );
}
