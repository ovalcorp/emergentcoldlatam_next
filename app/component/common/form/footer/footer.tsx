import { borderColor } from '../../../../globals'
import { Cancelar } from './cancelar'
import { Submit } from './submit'

export function Footer({ onClose, isSubmitting, isEditing }: { onClose: () => void, isSubmitting: boolean, isEditing: boolean }) {
  return (
    <div
        className="flex justify-end gap-3 pt-6 mt-6 border-t"
        style={{ borderColor }}
      >
        {/* Button de Headless UI maneja accesibilidad y estados de hover/focus automáticamente. */}
        <Cancelar onClose={onClose} isSubmitting={isSubmitting} />
        <Submit isSubmitting={isSubmitting} isEditing={isEditing} />
    </div>
  )
}