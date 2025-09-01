"use client";
import { useRouter } from 'next/navigation';
export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className='inline-flex items-center rounded-xl px-4 py-2 font-medium bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors'
    >
      ← Vissza
    </button>
  );
}
