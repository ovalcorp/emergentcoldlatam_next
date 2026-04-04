import { Button } from '@headlessui/react'
import { BRAND_COLOR } from '../../../../globals'

export function Submit({ isSubmitting, isEditing }: { isSubmitting: boolean, isEditing: boolean }) {
  return (
    <Button
        type="submit"
        disabled={isSubmitting}
        className="
          px-6 py-2.5 rounded-lg text-sm font-medium text-white
          shadow-sm transition-all duration-150
          hover:opacity-90 active:scale-95
          data-disabled:opacity-50 data-disabled:cursor-not-allowed
          flex items-center gap-2
        "
        style={{ background: BRAND_COLOR }}
      >
        {/* Spinner durante el submit */}
        {isSubmitting && (
            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          )}
          {isSubmitting ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
    </Button>
  )
}