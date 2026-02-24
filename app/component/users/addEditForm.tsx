'use client'

import React, { useState } from 'react'
import { useUser } from '../../hook/useUser'

//importaciones de formularios
import { useFormik } from 'formik'
import { MyCheckbox } from '../common/myCheckbox'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import {
  BRAND_COLOR,
  borderColor,
  errorColor,
} from '../../globals' // ajusta ruta si es necesario

export function AddEditUserForm({ onClose, onRefresh, user }: any) {

  const { createUser, updateUser } = useUser()
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: user ? updateValidationSchema() : newValidationSchema(),
    onSubmit: async (formValue) => {
      try {
        user
          ? await updateUser(user.id, formValue)
          : await createUser(formValue)

        toast.success(user ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente')
        onRefresh()
        onClose()

      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error al guardar usuario'
        setError(message)
        toast.error(message)
      }
    }
  })

  const inputStyle =
    "w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2"

  const errorInput =
    "border-red-300 focus:ring-red-400"

  const normalInput =
    "border-gray-300 focus:ring-[#1c2543]"

    type FieldName = keyof ReturnType<typeof initialValues>

    const getInputClass = (name: FieldName) =>
    `${inputStyle} ${
        formik.errors[name] && formik.touched[name]
        ? errorInput
        : normalInput
    }`

  return (
    <div
      className="w-full max-w-5xl mx-auto rounded-xl shadow-lg border bg-white"
      style={{ borderColor }}
    >
      {/* ERROR GLOBAL */}
      {error && (
        <div
          className="mx-8 mt-6 p-3 rounded-md border text-sm"
          style={{
            background: '#FEF2F2',
            borderColor: errorColor,
            color: errorColor
          }}
        >
          {error}
        </div>
      )}

      {/* FORM */}
      <form onSubmit={formik.handleSubmit} className="px-8 py-8 space-y-10">

        {/* DATOS DE ACCESO */}
        <div className="space-y-5">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Datos de acceso
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
              <input
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={getInputClass('username')}
              />
              {formik.errors.username && formik.touched.username && (
                <p className="text-xs text-red-600 mt-1">{String(formik.errors.username)}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
              <input
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={getInputClass('email')}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-xs text-red-600 mt-1">{String(formik.errors.email)}</p>
              )}
            </div>
          </div>

          {!user && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={getInputClass('password') + ' pr-10'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {formik.errors.password && formik.touched.password && (
                <p className="text-xs text-red-600 mt-1">{String(formik.errors.password)}</p>
              )}
            </div>
          )}
        </div>

        {/* INFORMACIÓN PERSONAL */}
        <div className="space-y-5">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Información personal
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input name="first_name" placeholder="Nombre" value={formik.values.first_name} onChange={formik.handleChange} className={getInputClass('first_name')} />
            <input name="last_name" placeholder="Apellido" value={formik.values.last_name} onChange={formik.handleChange} className={getInputClass('last_name')} />
          </div>

          <input name="identification_number" placeholder="DNI" value={formik.values.identification_number} onChange={formik.handleChange} className={getInputClass('identification_number')} />
        </div>

        {/* INFORMACIÓN LABORAL */}
        <div className="space-y-5">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Información laboral
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <input name="position" placeholder="Cargo" value={formik.values.position} onChange={formik.handleChange} className={getInputClass('position')} />
            <input name="department" placeholder="Departamento" value={formik.values.department} onChange={formik.handleChange} className={getInputClass('department')} />
            <input name="area" placeholder="Área" value={formik.values.area} onChange={formik.handleChange} className={getInputClass('area')} />
          </div>
        </div>

        {/* UBICACIÓN */}
        <div className="space-y-5">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Ubicación
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input name="country" placeholder="País" value={formik.values.country} onChange={formik.handleChange} className={getInputClass('country')} />
            <input name="site" placeholder="Site" value={formik.values.site} onChange={formik.handleChange} className={getInputClass('site')} />
          </div>
        </div>

        {/* ESTADO */}
        <div className="flex items-center gap-3">
          <MyCheckbox
            value={formik.values.is_active}
            onChange={(v: boolean) => formik.setFieldValue('is_active', v)}
          />
          <span className="text-sm text-gray-700">Usuario activo</span>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 pt-6 border-t" style={{ borderColor }}>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-md border text-sm font-medium text-gray-700 hover:bg-gray-50"
            style={{ borderColor }}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-md text-sm font-medium text-white shadow-sm"
            style={{ background: BRAND_COLOR }}
          >
            {user ? 'Actualizar' : 'Crear'}
          </button>
        </div>

      </form>
    </div>
  )
}



function initialValues(data: any) {
    return {
        username: data?.username || '',
        email: data?.email || '',
        password: data?.password || '',
        first_name: data?.first_name || '',
        last_name: data?.last_name ||   '',
        identification_number: data?.identification_number || '',
        position: data?.position || '',
        department: data?.department || '',
        area: data?.area || '',
        country: data?.country || '',
        site: data?.site || '',
        is_active: data?.is_active || false,
    }
}

function newValidationSchema() {
    return Yup.object().shape({
        username: Yup.string().required('El nombre de usuario es requerido'),
        email: Yup.string().email('El email no es válido').required('El email es requerido'),
        password: Yup.string().required('La contraseña es requerida').min(6, 'La contraseña debe tener al menos 6 caracteres'),
        first_name: Yup.string().required('El nombre es requerido'),
        last_name: Yup.string().required('El apellido es requerido'),
        identification_number: Yup.string().required('El número de identificación es requerido').max(10, 'El número de identificación debe tener máximo 10 caracteres'),
        position: Yup.string().required('La posición es requerida'),
        department: Yup.string().required('El departamento es requerido'),
        area: Yup.string().required('El área es requerida'),
        country: Yup.string().required('El país es requerido'),
        site: Yup.string().required('El sitio es requerido'),
        is_active: Yup.boolean().required('El estado es requerido'),
    })
}

function updateValidationSchema() {
    return Yup.object().shape({
        username: Yup.string().required('El nombre de usuario es requerido'),
        email: Yup.string().email('El email no es válido').required('El email es requerido'),
        first_name: Yup.string().required('El nombre es requerido'),
        last_name: Yup.string().required('El apellido es requerido'),
        identification_number: Yup.string().required('El número de identificación es requerido').max(10, 'El número de identificación debe tener máximo 10 caracteres'),
        position: Yup.string().required('La posición es requerida'),
        department: Yup.string().required('El departamento es requerido'),
        area: Yup.string().required('El área es requerida'),
        country: Yup.string().required('El país es requerido'),
        site: Yup.string().required('El sitio es requerido'),
        is_active: Yup.boolean().required('El estado es requerido'),
    })
}