'use client';

import { useParams } from 'next/navigation';
import NotebookPagesList from '@/components/NotebookPagesList';

export default function NotebookPage() {
  const { id } = useParams();

  if (!id) return <p>Cargando cuaderno...</p>;

  return <NotebookPagesList notebookId={id as string} />;
}
