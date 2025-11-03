import Link from "next/link";

interface NotebookCardProps {
  id: string;
  title: string;
  color: string;
}

export default function NotebookCard({ id, title, color }: NotebookCardProps) {
  return (
    <Link
      href={`/notebooks/${id}`}
      className="p-4 rounded-2xl text-white font-semibold hover:scale-105 transition"
      style={{ backgroundColor: color }}
    >
      {title}
    </Link>
  );
}
