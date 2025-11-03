'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface PageEditorProps {
  notebookId: string;
  pageId: string;
}

export default function PageEditor({ notebookId, pageId }: PageEditorProps) {
  const [content, setContent] = useState('');

  useEffect(() => {
    const loadPage = async () => {
      const ref = doc(db, 'notebooks', notebookId, 'pages', pageId);
      const snap = await getDoc(ref);
      if (snap.exists()) setContent(snap.data()?.content || '');
    };
    loadPage();
  }, [notebookId, pageId]);

  const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);

    const ref = doc(db, 'notebooks', notebookId, 'pages', pageId);
    await setDoc(ref, { content: newContent }, { merge: true });
  };

  return (
    <div className="p-4">
      <textarea
        value={content}
        onChange={handleChange}
        className="w-full h-[80vh] p-2 bg-gray-900 text-white border border-gray-700 rounded"
        placeholder="Escribe en esta hoja..."
      />
    </div>
  );
}
