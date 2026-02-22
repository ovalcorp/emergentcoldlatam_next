'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <section className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-10">
        
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
            Emergent Cold LATAM
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Plataforma Corporativa Interna
          </p>
        </header>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6" />

        {/* Message */}
        <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
          <p>
            Esta plataforma está destinada exclusivamente para el uso del
            <strong> personal autorizado de Emergent Cold LATAM</strong>,
          </p>

          <p>
            El acceso está restringido y monitoreado. Toda actividad realizada
            dentro del sistema queda registrada conforme a las políticas internas
            de seguridad de la información y cumplimiento corporativo.
          </p>
        </div>

        {/* Access */}
        <div className="mt-8 flex flex-col items-center">
          <Link
            href="/login"
            className="bg-blue-700 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-800 transition"
          >
            Acceso al sistema
          </Link>

          <p className="mt-4 text-xs text-gray-400 text-center">
            El uso no autorizado de este sistema está prohibido y puede estar
            sujeto a sanciones administrativas y legales.
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Emergent Cold LATAM · Uso interno exclusivo
        </footer>
      </section>
    </main>
  );
}
