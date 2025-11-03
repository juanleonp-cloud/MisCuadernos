'use client';

import NotebookPageEditor from '@/components/NotebookPageEditor';

interface PageProps {
  params: { id: string; pageId: string };
}

export default function Page({ params }: PageProps) {
  const { id, pageId } = params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Página del cuaderno</h1>
      <NotebookPageEditor notebookId={id} pageId={pageId} />
    </div>
  );
}
