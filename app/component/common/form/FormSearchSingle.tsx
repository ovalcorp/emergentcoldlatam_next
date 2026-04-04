'use client'

/**
 * FormSearchSingle
 * Campo de búsqueda con selección de UN SOLO item.
 * Ideal para listas grandes donde el usuario busca y selecciona uno.
 * Muestra el item seleccionado como pill con botón de limpiar.
 *
 * Uso:
 * <FormSearchSingle
 *   label="Site"
 *   name="site"
 *   formik={formik}
 *   onSearch={handleSiteSearch}
 *   options={sites.map(s => ({ value: s.id, label: s.name }))}
 * />
 */

'use client'

import { useState, useEffect } from 'react'
import { Field, Label, Description, Button } from '@headlessui/react'
import { FormikProps } from 'formik'
import { BRAND_COLOR } from '../../../globals'

type Option = {
  value: number
  label: string
}

interface FormSearchSingleProps {
  label: string
  name: string
  formik: FormikProps<any>
  options: Option[]
  initialLabel?: string
  onSearch?: (value: string) => void
  searching?: boolean
  description?: string
  disabled?: boolean
  required?: boolean
  placeholder?: string
}

export function FormSearchSingle({
  label,
  name,
  formik,
  options,
  initialLabel,
  onSearch,
  searching = false,
  description,
  disabled,
  required,
  placeholder = 'Buscar...',
}: FormSearchSingleProps) {

  const [search, setSearch] = useState('')
  const hasError = !!(formik.errors[name] && formik.touched[name])

  // ✅ Valor seleccionado
  const selected: number | null = formik.values[name] || null

  // ✅ Estado que guarda SIEMPRE el label correcto
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    selected && initialLabel
      ? { value: Number(selected), label: initialLabel }
      : null
  )

  // ✅ Sincroniza en modo edición (cuando viene de backend)
  useEffect(() => {
    if (selected && initialLabel && !selectedOption) {
      setSelectedOption({
        value: Number(selected),
        label: initialLabel,
      })
    }
  }, [selected, initialLabel])

  // 🔍 Buscar
  const handleSearch = () => {
    if (search.trim()) onSearch?.(search.trim())
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  // ✅ Seleccionar item
  const selectItem = (value: number, label: string) => {
    formik.setFieldValue(name, value)
    formik.setFieldTouched(name, true)

    setSelectedOption({ value, label }) // 🔥 clave

    setSearch('')
    //onSearch?.('')
  }

  // 🧹 Limpiar selección
  const clearItem = () => {
    formik.setFieldValue(name, null)
    setSelectedOption(null)

    setSearch('')
    onSearch?.('')
  }

  // ❌ Evitar mostrar el seleccionado en la lista
  const filtered = options.filter(opt => opt.value !== Number(selected))

  return (
    <Field disabled={disabled}>

      <Label className="block text-sm font-medium text-gray-700 mb-1 data-disabled:opacity-50">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      {description && (
        <Description className="text-xs text-gray-400 mb-2 data-disabled:opacity-50">
          {description}
        </Description>
      )}

      {/* ✅ Pill con label correcto SIEMPRE */}
      {selectedOption && (
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-black text-white">
            {selectedOption.label}
            <button
              type="button"
              onClick={clearItem}
              disabled={disabled}
              className="hover:opacity-70 transition-opacity disabled:cursor-not-allowed"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
          <span className="text-xs text-gray-400">Seleccionado</span>
        </div>
      )}

      {/* 🔎 Input + botón */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="
              w-full rounded-lg border px-3 py-2 text-sm text-gray-900
              shadow-sm transition-all duration-150 border-gray-300
              focus:outline-none focus:ring-2 focus:ring-offset-0
              disabled:bg-gray-50 disabled:cursor-not-allowed
            "
            style={{ ['--tw-ring-color' as string]: BRAND_COLOR }}
          />

          {search && (
            <button
              type="button"
              onClick={() => { setSearch(''); onSearch?.('') }}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {onSearch && (
          <button
            type="button"
            onClick={handleSearch}
            disabled={disabled || searching}
            className="px-3 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
          >
            {searching ? (
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
            Buscar
          </button>
        )}
      </div>

      {/* 📋 Resultados */}
      {filtered.length > 0 && (
        <div className="mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-sm max-h-48 overflow-y-auto">
          {filtered.map(opt => (
            <Button
              key={opt.value}
              type="button"
              onClick={() => selectItem(opt.value, opt.label)}
              disabled={disabled}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:cursor-not-allowed"
            >
              {opt.label}
            </Button>
          ))}
        </div>
      )}

      {/* ❌ Sin resultados */}
      {search && options.length === 0 && !searching && (
        <p className="text-xs text-gray-400 italic mt-1">
          No se encontraron resultados
        </p>
      )}

      {/* ⚠️ Error */}
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