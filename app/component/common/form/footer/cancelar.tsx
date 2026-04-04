import { Button } from '@headlessui/react'
import { borderColor } from '../../../../globals'

export function Cancelar({ onClose, isSubmitting }: { onClose: () => void, isSubmitting: boolean }) {   
  return (
    <Button
      type="button"
      onClick={onClose}
      disabled={isSubmitting}
      className="
        px-5 py-2.5 rounded-lg border text-sm font-medium text-gray-700 
        transition-colors duration-150 
        hover:bg-gray-50 
        data-disabled:opacity-50 data-disabled:cursor-not-allowed"
      style={{ borderColor }}
    >
      Cancelar
    </Button>
  )
}