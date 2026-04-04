'use client'

import { useState } from 'react'
import { Fieldset, Legend } from '@headlessui/react'
import { useCountry } from '../../../hook/useCountry'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import { GlobalError } from '../../common/form/globalError'
import { FormField } from '../../common/form/FormField'
import { Footer } from '../../common/form/footer/footer'

export function AddEditCountryForm({ onClose, onRefresh, country }: any) {
  const { createCountry, updateCountry } = useCountry()
  const [globalError, setGlobalError] = useState('')
  const isEditing = !!country

  const formik = useFormik({
    initialValues: initialValues(country),
    validationSchema: isEditing ? updateValidationSchema() : newValidationSchema(),
    onSubmit: async (formValue) => {
      try {
        setGlobalError('')
        isEditing
          ? await updateCountry(country.id, formValue)
          : await createCountry(formValue)

        toast.success(isEditing ? 'País actualizado correctamente' : 'País creado correctamente')
        onRefresh()
        onClose()
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error al guardar país'
        setGlobalError(message)
        toast.error(message)
      }
    },
  })

  const isSubmitting = formik.isSubmitting

  return (
    <div className="w-full">

      {/* ERROR GLOBAL */}
      {globalError && <GlobalError globalError={globalError} />}

      {/* FORM */}
      <form onSubmit={formik.handleSubmit} noValidate>
        {/*
          Fieldset agrupa los campos y deshabilita todos al hacer submit.
          Legend es el título del grupo — accesible para lectores de pantalla.
        */}
        <Fieldset disabled={isSubmitting} className="space-y-6 data-disabled:opacity-60">
          <Legend className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Datos del país
          </Legend>

          {/*
            Field agrupa Label + Description + Input automáticamente.
            Los IDs y aria-* se generan solos — no necesitas manejarlos.
          */}
          <FormField
            label="Nombre del país"
            required={true}
            description="El nombre del país es requerido"
            name="name"
            type="text"
            formik={formik}
            placeholder="Ej: Argentina"
            disabled={isSubmitting}
          />

        </Fieldset>

        {/* FOOTER */}
        <Footer onClose={onClose} isSubmitting={isSubmitting} isEditing={isEditing} />
      </form>
    </div>
  )
}

function initialValues(data: any) {
  return {
    name: data?.name ?? '',
  }
}

function newValidationSchema() {
  return Yup.object().shape({
    name: Yup.string().required('El nombre del país es requerido').trim(),
  })
}

function updateValidationSchema() {
  return Yup.object().shape({
    name: Yup.string().required('El nombre del país es requerido').trim(),
  })
}