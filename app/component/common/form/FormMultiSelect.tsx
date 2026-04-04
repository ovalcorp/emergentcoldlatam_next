'use client'

/**
 * FormMultiSelect
 * Multiselect con pills/tags seleccionables.
 * El usuario ve todos los items disponibles como pills y hace click para seleccionar/deseleccionar.
 * Los seleccionados se muestran con fondo negro, los no seleccionados en gris.
 *
 * Uso:
 * <FormMultiSelect
 *   label="Metadata"
 *   name="metadata"
 *   formik={formik}
 *   options={metadata.map(m => ({ value: m.id, label: m.name }))}
 * />
 */

import { Field, Label, Description, Button } from '@headlessui/react'
import { FormikProps } from 'formik'

type Option = {
  value: number
  label: string
}

interface FormMultiSelectProps {
  label: string
  name: string
  formik: FormikProps<any>
  options: Option[]
  description?: string
  disabled?: boolean
  required?: boolean
}

export function FormMultiSelect({
  label,
  name,
  formik,
  options,
  description,
  disabled,
  required,
}: FormMultiSelectProps) {
  const hasError = !!(formik.errors[name] && formik.touched[name])
  const selected: number[] = formik.values[name] || []

  const toggle = (value: number) => {
    if (disabled) return
    const isSelected = selected.includes(value)
    const next = isSelected
      ? selected.filter(v => v !== value)  // deselecciona
      : [...selected, value]               // selecciona
    formik.setFieldValue(name, next)
    formik.setFieldTouched(name, true)
  }

  return (
    <Field disabled={disabled}>

      {/* Label */}
      <Label className="block text-sm font-medium text-gray-700 mb-1 data-disabled:opacity-50">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      {/* Description */}
      {description && (
        <Description className="text-xs text-gray-400 mb-2 data-disabled:opacity-50">
          {description}
        </Description>
      )}

      {/* Pills */}
      {options.length === 0 ? (
        <p className="text-xs text-gray-400 italic">No hay opciones disponibles</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {options.map(opt => {
            const isSelected = selected.includes(opt.value)
            return (
              <Button
                key={opt.value}
                type="button"
                onClick={() => toggle(opt.value)}
                disabled={disabled}
                className={`
                  px-3 py-1.5 rounded-full text-xs font-medium
                  transition-all duration-150 border
                  disabled:cursor-not-allowed disabled:opacity-50
                  ${isSelected
                    ? 'bg-black text-white border-black hover:bg-gray-800'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400 hover:text-gray-800'
                  }
                `}
              >
                {isSelected && (
                  <span className="mr-1">✓</span>
                )}
                {opt.label}
              </Button>
            )
          })}
        </div>
      )}

      {/* Contador de seleccionados */}
      {selected.length > 0 && (
        <p className="text-xs text-gray-400 mt-2">
          {selected.length} seleccionado{selected.length > 1 ? 's' : ''}
          {' '}—{' '}
          <Button
            type="button"
            onClick={() => formik.setFieldValue(name, [])}
            className="text-red-400 hover:text-red-600 transition-colors"
          >
            Limpiar
          </Button>
        </p>
      )}

      {/* Error */}
      {hasError && (
        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {String(formik.errors[name])}
        </p>
      )}

    </Field>
  )
}