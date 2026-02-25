'use client'

import React, { useState } from 'react'
import { useOperation } from '../../hook/useOperation'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import {
  BRAND_COLOR,
  borderColor,
  errorColor,
} from '../../globals'

export function AddEditOperationForm({ onClose, onRefresh, operation }: any) {
  const { createOperation, updateOperation } = useOperation()
  const [error, setError] = useState('')

  const formik = useFormik({
    initialValues: initialValues(operation),
    validationSchema: operation ? updateValidationSchema() : newValidationSchema(),
    onSubmit: async (formValue) => {
      try {
        const payload = emptyStringToNull(formValue, [
          'pre_chamber_entry_time',
          'pre_chamber_exit_time',
          'yard_exit_time',
          'set_temperature',
        ])
        operation
          ? await updateOperation(operation.id, payload)
          : await createOperation(payload)

        toast.success(operation ? 'Operación actualizada correctamente' : 'Operación creada correctamente')
        onRefresh()
        onClose()
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error al guardar operación'
        setError(message)
        toast.error(message)
      }
    },
  })

  const inputStyle =
    'w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2'

  const errorInput = 'border-red-300 focus:ring-red-400'
  const normalInput = 'border-gray-300 focus:ring-[#1c2543]'

  type FieldName = keyof ReturnType<typeof initialValues>

  const getInputClass = (name: FieldName) =>
    `${inputStyle} ${
      formik.errors[name] && formik.touched[name] ? errorInput : normalInput
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
            color: errorColor,
          }}
        >
          {error}
        </div>
      )}

      {/* FORM */}
      <form onSubmit={formik.handleSubmit} className="px-8 py-8 space-y-10">
        {/* DATOS GENERALES */}
        <div className="space-y-5">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Datos generales
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
              <input
                name="client"
                value={formik.values.client}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={getInputClass('client')}
                placeholder="Cliente"
              />
              {formik.errors.client && formik.touched.client && (
                <p className="text-xs text-red-600 mt-1">{String(formik.errors.client)}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de carga</label>
              <input
                name="cargo_type"
                value={formik.values.cargo_type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={getInputClass('cargo_type')}
                placeholder="Tipo de carga"
              />
              {formik.errors.cargo_type && formik.touched.cargo_type && (
                <p className="text-xs text-red-600 mt-1">{String(formik.errors.cargo_type)}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de movimiento</label>
              <input
                name="movement_type"
                value={formik.values.movement_type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={getInputClass('movement_type')}
                placeholder="Tipo de movimiento"
              />
              {formik.errors.movement_type && formik.touched.movement_type && (
                <p className="text-xs text-red-600 mt-1">{String(formik.errors.movement_type)}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Guía de transporte</label>
              <input
                name="transport_guide"
                value={formik.values.transport_guide}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={getInputClass('transport_guide')}
                placeholder="Guía de transporte"
              />
              {formik.errors.transport_guide && formik.touched.transport_guide && (
                <p className="text-xs text-red-600 mt-1">{String(formik.errors.transport_guide)}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Orden WMS</label>
              <input
                name="wms_order"
                value={formik.values.wms_order}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={getInputClass('wms_order')}
                placeholder="Orden WMS"
              />
              {formik.errors.wms_order && formik.touched.wms_order && (
                <p className="text-xs text-red-600 mt-1">{String(formik.errors.wms_order)}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Placa del vehículo</label>
              <input
                name="vehicle_plate"
                value={formik.values.vehicle_plate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={getInputClass('vehicle_plate')}
                placeholder="Placa del vehículo"
              />
              {formik.errors.vehicle_plate && formik.touched.vehicle_plate && (
                <p className="text-xs text-red-600 mt-1">{String(formik.errors.vehicle_plate)}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Temperatura consigna (°C)</label>
              <input
                name="set_temperature"
                type="number"
                value={formik.values.set_temperature === '' ? '' : formik.values.set_temperature}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={getInputClass('set_temperature')}
                placeholder="Temperatura"
              />
              {formik.errors.set_temperature && formik.touched.set_temperature && (
                <p className="text-xs text-red-600 mt-1">{String(formik.errors.set_temperature)}</p>
              )}
            </div>
          </div>
        </div>

        {/* FECHAS Y HORARIOS */}
        <div className="space-y-5">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Fechas y horarios
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de operación</label>
              <input
                name="operation_date"
                type="date"
                value={formik.values.operation_date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={getInputClass('operation_date')}
              />
              {formik.errors.operation_date && formik.touched.operation_date && (
                <p className="text-xs text-red-600 mt-1">{String(formik.errors.operation_date)}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Entrada patio</label>
              <input
                name="yard_entry_time"
                type="time"
                value={formik.values.yard_entry_time || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={getInputClass('yard_entry_time')}
              />
              {formik.errors.yard_entry_time && formik.touched.yard_entry_time && (
                <p className="text-xs text-red-600 mt-1">{String(formik.errors.yard_entry_time)}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Entrada precámara</label>
              <input
                name="pre_chamber_entry_time"
                type="time"
                value={formik.values.pre_chamber_entry_time || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={getInputClass('pre_chamber_entry_time')}
              />
              {formik.errors.pre_chamber_entry_time && formik.touched.pre_chamber_entry_time && (
                <p className="text-xs text-red-600 mt-1">{String(formik.errors.pre_chamber_entry_time)}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salida precámara</label>
              <input
                name="pre_chamber_exit_time"
                type="time"
                value={formik.values.pre_chamber_exit_time || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={getInputClass('pre_chamber_exit_time')}
              />
              {formik.errors.pre_chamber_exit_time && formik.touched.pre_chamber_exit_time && (
                <p className="text-xs text-red-600 mt-1">{String(formik.errors.pre_chamber_exit_time)}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salida patio</label>
              <input
                name="yard_exit_time"
                type="time"
                value={formik.values.yard_exit_time || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={getInputClass('yard_exit_time')}
              />
              {formik.errors.yard_exit_time && formik.touched.yard_exit_time && (
                <p className="text-xs text-red-600 mt-1">{String(formik.errors.yard_exit_time)}</p>
              )}
            </div>
          </div>
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
            {operation ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  )
}

/** Convierte "" en null para los campos indicados (el backend espera null, no string vacío) */
function emptyStringToNull<T extends Record<string, unknown>>(
  payload: T,
  keys: (keyof T)[]
): T {
  const out: Record<string, unknown> = { ...payload }
  for (const key of keys) {
    if (out[key as string] === '') out[key as string] = null
  }
  return out as T
}

function initialValues(data: any) {
  return {
    client: data?.client ?? '',
    cargo_type: data?.cargo_type ?? '',
    movement_type: data?.movement_type ?? '',
    transport_guide: data?.transport_guide ?? '',
    wms_order: data?.wms_order ?? '',
    vehicle_plate: data?.vehicle_plate ?? '',
    set_temperature: data?.set_temperature ?? '',
    yard_entry_time: data?.yard_entry_time ?? '',
    pre_chamber_entry_time: data?.pre_chamber_entry_time ?? '',
    pre_chamber_exit_time: data?.pre_chamber_exit_time ?? '',
    yard_exit_time: data?.yard_exit_time ?? '',
    operation_date: data?.operation_date ?? '',
  }
}

function newValidationSchema() {
  return Yup.object().shape({
    client: Yup.string().required('El cliente es requerido'),
    cargo_type: Yup.string().required('El tipo de carga es requerido'),
    movement_type: Yup.string().required('El tipo de movimiento es requerido'),
    transport_guide: Yup.string().required('La guía de transporte es requerida'),
    wms_order: Yup.string().required('La orden WMS es requerida'),
    vehicle_plate: Yup.string().required('La placa del vehículo es requerida'),
    set_temperature: Yup.number().nullable().transform((v, o) => (o === '' ? undefined : v)),
    yard_entry_time: Yup.string(),
    pre_chamber_entry_time: Yup.string(),
    pre_chamber_exit_time: Yup.string(),
    yard_exit_time: Yup.string(),
    operation_date: Yup.string().required('La fecha de operación es requerida'),
  })
}

function updateValidationSchema() {
  return Yup.object().shape({
    client: Yup.string().required('El cliente es requerido'),
    cargo_type: Yup.string().required('El tipo de carga es requerido'),
    movement_type: Yup.string().required('El tipo de movimiento es requerido'),
    transport_guide: Yup.string().required('La guía de transporte es requerida'),
    wms_order: Yup.string().required('La orden WMS es requerida'),
    vehicle_plate: Yup.string().required('La placa del vehículo es requerida'),
    set_temperature: Yup.number().nullable().transform((v, o) => (o === '' ? undefined : v)),
    yard_entry_time: Yup.string(),
    pre_chamber_entry_time: Yup.string(),
    pre_chamber_exit_time: Yup.string(),
    yard_exit_time: Yup.string(),
    operation_date: Yup.string().required('La fecha de operación es requerida'),
  })
}
