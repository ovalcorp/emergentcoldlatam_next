'use client'

import { useState, useEffect } from 'react'
import { Fieldset, Legend } from '@headlessui/react'
import { useSite } from '../../../hook/useSite'
import { useCountry } from '../../../hook/useCountry'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import { GlobalError } from '../../common/form/globalError'
import { FormField } from '../../common/form/FormField'
import { FormSelect } from '../../common/form/FormSelect'
import { Footer } from '../../common/form/footer/footer'

export function AddEditSiteForm({ onClose, onRefresh, site }: any) {
  const { createSite, updateSite } = useSite()
  const { countries, getCountries } = useCountry() // 👈 carga los países
  const [globalError, setGlobalError] = useState('')
  const isEditing = !!site

  // ✅ Carga los países al montar el formulario
  useEffect(() => {
    getCountries()
  }, [])

  const formik = useFormik({
    initialValues: initialValues(site),
    validationSchema: isEditing ? updateValidationSchema() : newValidationSchema(),
    onSubmit: async (formValue) => {
      try {
        setGlobalError('')
        const payload = {
            ...formValue,
            ip_principal: formValue.ip_principal || null,   // "" → null
            ip_secondary: formValue.ip_secondary || null,   // "" → null
            tax: formValue.tax || null,                     // "" → null
            legal_name: formValue.legal_name || null,       // "" → null
          }
        isEditing
          ? await updateSite(site.id, payload)
          : await createSite(payload)

        toast.success(isEditing ? 'Sitio actualizado correctamente' : 'Sitio creado correctamente')
        onRefresh()
        onClose()
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error al guardar sitio'
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
            Datos del sitio
          </Legend>

          {/*
            Field agrupa Label + Description + Input automáticamente.
            Los IDs y aria-* se generan solos — no necesitas manejarlos.
          */}
          <FormField
            label="Nombre del sitio"
            required={true}
            description="El nombre del sitio es requerido"
            name="name"
            type="text"
            formik={formik}
            placeholder="Ej: Callao 1"
            disabled={isSubmitting}
          />
          <FormSelect
            label="País"
            name="country"
            required
            formik={formik}
            placeholder="Selecciona un país"
            options={countries.map(c => ({ value: c.id, label: c.name }))}
          />
          <FormField
            label="IP principal"
            required={false}
            //description="La IP principal es requerida"
            name="ip_principal"
            type="text"
            formik={formik}
            placeholder="Ej: 192.168.0.1"
            disabled={isSubmitting}
          />
          <FormField
            label="IP secundaria"
            required={false}
            //description="La IP secundaria es requerida"
            name="ip_secondary"
            type="text"
            formik={formik}
            placeholder="Ej: 192.168.0.1"
            disabled={isSubmitting}
          />
          <FormField
            label="Tax de la empresa"
            required={false}
            //description="El impuesto es requerido"
            name="tax"
            type="text"
            formik={formik}
            placeholder="Ej: 2060685512"
            disabled={isSubmitting}
          />
          <FormField
            label="Nombre legal"
            required={false}
            //description="El nombre legal es requerido"
            name="legal_name"
            type="text"
            formik={formik}
            placeholder="Ej: Emergent Cold Latam"
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
    country: data?.country?.id ?? data?.country ?? '',
    ip_principal: data?.ip_principal ?? '',
    ip_secondary: data?.ip_secondary ?? '',
    tax: data?.tax ?? '',
    legal_name: data?.legal_name ?? '',
  }
}

function newValidationSchema() {
  return Yup.object().shape({
    name: Yup.string().required('El nombre del sitio es requerido').trim(),
    country: Yup.string().required('El país es requerido').trim(),
    ip_principal: Yup.string().matches(
        /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/,
        'Debe ser una IP válida (ej: 192.168.0.1)'
      ).trim(),
    ip_secondary: Yup.string().matches(
        /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/,
        'Debe ser una IP válida (ej: 192.168.0.1)'
      ).trim(),
    tax: Yup.string().trim(),
    legal_name: Yup.string().trim(),
  })
}

function updateValidationSchema() {
  return Yup.object().shape({
    name: Yup.string().required('El nombre del sitio es requerido').trim(),
    country: Yup.string().required('El país es requerido').trim(),
    ip_principal: Yup.string().matches(
        /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/,
        'Debe ser una IP válida (ej: 192.168.0.1)'
      ).trim(),
    ip_secondary: Yup.string().matches(
        /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/,
        'Debe ser una IP válida (ej: 192.168.0.1)'
      ).trim(),
    tax: Yup.string().trim(),
    legal_name: Yup.string().trim(),
  })
}