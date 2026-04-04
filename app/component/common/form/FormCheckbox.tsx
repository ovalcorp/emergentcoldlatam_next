'use client'

import { Field, Input, Label, Description } from '@headlessui/react'
import { FormikProps } from 'formik'
import { BRAND_COLOR } from '../../../globals'

interface FormCheckboxProps {
  label: string
  name: string
  formik: FormikProps<any>
  description?: string
  disabled?: boolean
}

export function FormCheckbox({
  label,
  name,
  formik,
  description,
  disabled
}: FormCheckboxProps) {

  const hasError = !!(formik.errors[name] && formik.touched[name])
  const checked = !!formik.values[name]

  return (
    <Field disabled={disabled} className="flex items-start gap-3">
      
      {/* Checkbox usando Input de Headless UI */}
      <div className="pt-1">
        <Input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            formik.setFieldValue(name, e.target.checked)
          }
          onBlur={formik.handleBlur}
          invalid={hasError}
          className="
            h-4 w-4 rounded border
            border-gray-300
            data-hover:border-gray-400
            data-focus:outline-none data-focus:ring-2 data-focus:ring-offset-0
            data-invalid:border-red-400
            data-disabled:bg-gray-50 data-disabled:cursor-not-allowed
          "
          style={{
            accentColor: BRAND_COLOR,
            ['--tw-ring-color' as string]: BRAND_COLOR,
          }}
        />
      </div>

      {/* Label + Description */}
      <div className="flex flex-col">
        <Label className="text-sm font-medium text-gray-700 data-disabled:opacity-50">
          {label}
        </Label>

        {description && (
          <Description className="text-xs text-gray-400 data-disabled:opacity-50">
            {description}
          </Description>
        )}

        {/* Error */}
        {hasError && (
          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {String(formik.errors[name])}
          </p>
        )}
      </div>

    </Field>
  )
}