import React from 'react';

export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <main className="flex min-h-svh w-full max-w-5xl flex-col gap-4 border-gray-200 dark:border-gray-300/20 p-8 pt-16 md:p-18 border-x">
        {children}
      </main>
    </div>
  );
}
