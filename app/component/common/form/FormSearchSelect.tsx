'use client'

/**
 * FormSearchSelect
 * Campo de búsqueda con selección múltiple mediante pills.
 * Ideal para listas grandes donde el usuario necesita buscar antes de seleccionar.
 * Los items seleccionados se muestran como pills con botón de eliminar.
 *
 * Uso:
 * <FormSearchSelect
 *   label="Sites permitidos"
 *   name="permissions_sites"
 *   formik={formik}
 *   options={sites.map(s => ({ value: s.id, label: s.name }))}
 * />
 */
import { useState, useEffect } from 'react'
import { Field, Label, Description, Button } from '@headlessui/react'
import { FormikProps } from 'formik'

type Option = {
  value: number
  label: string
}

interface FormSearchSelectProps {
  label: string
  name: string
  formik: FormikProps<any>
  options: Option[]
  initialOptions?: Option[]
  description?: string
  disabled?: boolean
  required?: boolean
  placeholder?: string
  onSearch?: (value: string) => void  // ✅ nuevo — callback para buscar en el padre
  searching?: boolean                  // ✅ nuevo — loading mientras busca
}

export function FormSearchSelect({
  label,
  name,
  formik,
  options,
  description,
  disabled,
  required,
  placeholder = 'Buscar...',
  onSearch,
  searching = false,
  initialOptions = [],
}: FormSearchSelectProps) {
  const [search, setSearch] = useState('')
  const hasError = !!(formik.errors[name] && formik.touched[name])
  const selected: number[] = (formik.values[name] || []).map(Number) // ✅ fix bug

  const [labelMap, setLabelMap] = useState<Map<number, string>>(new Map())

  // Si hay onSearch, filtra solo los options que llegaron del padre
  // Si no hay onSearch, filtra localmente
  const filtered = options.filter(opt =>
    !selected.includes(opt.value)
  )

  const handleSearch = () => {
    if (search.trim()) onSearch?.(search.trim())
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  const addItem = (value: number) => {
    formik.setFieldValue(name, [...selected, value])
    formik.setFieldTouched(name, true)
    setSearch('')
    //onSearch?.('') // limpia resultados del padre
  }

  const removeItem = (value: number) => {
    formik.setFieldValue(name, selected.filter(v => v !== value))
  }

  //const getLabel = (value: number) =>
    //options.find(opt => opt.value === value)?.label ?? String(value)

  const getLabel = (value: number) =>
    labelMap.get(value) ?? String(value)

  useEffect(() => {
    setLabelMap(prev => {
      const newMap = new Map(prev)
  
      // ✅ opciones normales
      options.forEach(opt => {
        newMap.set(opt.value, opt.label)
      })
  
      // ✅ opciones iniciales (edit)
      initialOptions.forEach(opt => {
        newMap.set(opt.value, opt.label)
      })
  
      return newMap
    })
  }, [options, initialOptions])

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

      {/* Pills seleccionados */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {selected.map(value => (
            <span
              key={value}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-black text-white"
            >
              {getLabel(value)}
              <Button
                type="button"
                onClick={() => removeItem(value)}
                disabled={disabled}
                className="hover:opacity-70 transition-opacity disabled:cursor-not-allowed"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </span>
          ))}
          <Button
            type="button"
            onClick={() => formik.setFieldValue(name, [])}
            disabled={disabled}
            className="text-xs text-red-400 hover:text-red-600 transition-colors px-1 disabled:cursor-not-allowed"
          >
            Limpiar todo
          </Button>
        </div>
      )}

      {/* Input + botón buscar */}
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
              focus:outline-none focus:ring-2 focus:ring-black focus:border-black
              disabled:bg-gray-50 disabled:cursor-not-allowed
            "
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch('')
                onSearch?.('')
              }}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* ✅ Botón buscar — solo aparece si hay onSearch */}
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

      {/* Resultados */}
      {options.length > 0 && filtered.length > 0 && (
        <div className="mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-sm max-h-48 overflow-y-auto">
          {filtered.map(opt => (
            <Button
              key={opt.value}
              type="button"
              onClick={() => addItem(opt.value)}
              disabled={disabled}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors disabled:cursor-not-allowed"
            >
              {opt.label}
            </Button>
          ))}
        </div>
      )}

      {/* Sin resultados */}
      {search && options.length === 0 && !searching && (
        <p className="text-xs text-gray-400 italic mt-1">No se encontraron resultados</p>
      )}

      {/* Contador */}
      {selected.length > 0 && (
        <p className="text-xs text-gray-400 mt-1">
          {selected.length} site{selected.length > 1 ? 's' : ''} seleccionado{selected.length > 1 ? 's' : ''}
        </p>
      )}

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