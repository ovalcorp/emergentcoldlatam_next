'use client';

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';

interface ModalBasicProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function ModalBasic({
  show,
  onClose,
  title,
  children,
}: ModalBasicProps) {
  return (
    <Dialog
      open={show}
      onClose={onClose}
      className="relative z-50"
    >
      {/* Backdrop */}
      <DialogBackdrop
        transition
        className="
          fixed inset-0 bg-black/40
          duration-300 ease-out
          data-closed:opacity-0
        "
      />

      {/* Contenedor centrado scrollable */}
      <div className="fixed inset-0 w-screen overflow-y-auto p-4">
        <div className="flex min-h-full items-center justify-center">
          
          {/* Panel */}
          <DialogPanel
            transition
            className="
              relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl
              duration-300 ease-out
              data-closed:scale-95
              data-closed:opacity-0
            "
          >
            {/* Botón X arriba a la derecha */}
            <button
              type="button"
              onClick={onClose}
              className="
                absolute right-3 top-3
                text-gray-400 hover:text-gray-600
                focus:outline-none
              "
            >
              ✕
            </button>

            <DialogTitle className="text-lg font-semibold text-gray-900">
              {title}
            </DialogTitle>

            <div className="mt-4 text-gray-600">
              {children}
            </div>
          </DialogPanel>

        </div>
      </div>
    </Dialog>
  );
}

