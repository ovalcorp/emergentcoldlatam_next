'use client'

import { Field, Input, Label, Description } from '@headlessui/react'
import { FormikProps } from 'formik'
import { BRAND_COLOR } from '../../../globals'

interface FormFieldProps {
    label: string
    required?: boolean
    description?: string
    name: string
    type?: string
    formik: FormikProps<any>
    placeholder?: string
    disabled?: boolean
}

export function FormField({ label, required, description, name, type, formik, placeholder, disabled }: FormFieldProps) {
    const hasError = !!(formik.errors[name] && formik.touched[name])
  return (
    <Field disabled={disabled}>
      <Label className="block text-sm font-medium text-gray-700 mb-1 data-disabled:opacity-50">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      {/* Descripción opcional */}
      {description && (
        <Description className="text-xs text-gray-400 mb-2 data-disabled:opacity-50">
          {description}
        </Description>
      )}

      {/* Input */}
      <Input
        name={name}
        type={type}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        invalid={hasError}
        placeholder={placeholder}
        className="
          w-full rounded-lg border px-3 py-2 text-sm text-gray-900
          shadow-sm transition-all duration-150
          border-gray-300
          data-hover:border-gray-400
          data-focus:outline-none data-focus:ring-2 data-focus:ring-offset-0
          data-invalid:border-red-400 data-invalid:ring-red-100
          data-disabled:bg-gray-50 data-disabled:cursor-not-allowed
        "
        style={{
          ['--tw-ring-color' as string]: BRAND_COLOR,
        }}
      />

      {/* Error de validación del campo */}
      {
        hasError && (
          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {String(formik.errors[name])}
          </p>
        )
      }
    </Field>
  )
}