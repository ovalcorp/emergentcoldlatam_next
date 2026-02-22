'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-9xl font-extrabold text-black mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Página no encontrada</h2>
        <p className="text-gray-600 mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Volver atrás
          </button>
          
          <Link
            href="/"
            className="px-6 py-3 border border-black text-black rounded-md hover:bg-gray-100 transition-colors"
          >
            Ir al inicio
          </Link>
        </div>

        {/* Ilustración o imagen opcional */}
        <div className="mt-12">
          <div className="w-64 h-64 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-400">404</span>
          </div>
        </div>
      </div>
    </div>
  );
}