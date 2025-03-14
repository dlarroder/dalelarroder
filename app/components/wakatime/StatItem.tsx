import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export default function StatItem({ title, children }: Props) {
  return (
    <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-800 rounded-md">
      <p className="font-bold">{title}</p>
      <span className="text-gray-500 dark:text-gray-400">{children}</span>
    </div>
  );
}
