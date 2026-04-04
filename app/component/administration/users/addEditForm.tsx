'use client'

import { useState, useEffect } from 'react'
import { Fieldset, Legend } from '@headlessui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import { useUser } from '../../../hook/useUser'
import { useCountry } from '../../../hook/useCountry'
import { useSite } from '../../../hook/useSite'
import { useDepartment } from '../../../hook/useDepartment'
import { useArea } from '../../../hook/useArea'
import { useMetadata } from '../../../hook/useMetadata'

import { GlobalError } from '../../common/form/globalError'
import { FormField } from '../../common/form/FormField'
import { FormSelect } from '../../common/form/FormSelect'
import { FormCheckbox } from '../../common/form/FormCheckbox'
import { FormMultiSelect } from '../../common/form/FormMultiSelect'
import { FormSearchSelect } from '../../common/form/FormSearchSelect'
import { FormSearchSingle } from '../../common/form/FormSearchSingle'
import { Footer } from '../../common/form/footer/footer'

export function AddEditUserForm({ onClose, onRefresh, user }: any) {
  const { createUser, updateUser } = useUser()

  const { countries, getCountries } = useCountry()
  //const { sites, getSites, loading: sitesLoading } = useSite()
  // ✅ Así debe estar — instancias independientes
  const { sites: sitesForSite, loading: loadingSite, getSites: searchSite } = useSite()
  const { sites: sitesForPermissions, loading: loadingPermissions, getSites: searchPermissions } = useSite()
  const { departments, getDepartments } = useDepartment()
  const { areas, getAreas } = useArea()
  const { metadataList, getMetadata } = useMetadata()

  const [globalError, setGlobalError] = useState('')
  const isEditing = !!user

  // ─────────────────────────────────────────
  // Carga inicial
  // ─────────────────────────────────────────
  useEffect(() => {
    getCountries()
    //getSites()
    getDepartments()
    //getAreas()
    getMetadata()
    // Al editar carga las áreas del department actual
    if (user?.department) {
      getAreas(undefined, user.department?.id ?? user.department)
    }
  }, [])

  // ✅ Búsqueda bajo demanda
  const handleSiteSearch = (value: string) => {
    const search = value.trim();
  
    if (search) {
      searchSite(search, 1, 20);
    }
    else {
      searchSite(undefined, 1, 0);//resetear la lista
    }
  };

  const handleSitesSearch = (value: string) => {
    const search = value.trim();
  
    if (search) {
      searchPermissions(search, 1, 20);
    }
    else {
      searchPermissions(undefined, 1, 0);//resetear la lista
    }
  };

  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: isEditing ? updateValidationSchema() : newValidationSchema(),
    onSubmit: async (formValue) => {
      try {
        setGlobalError('')

        const payload = {
          ...formValue,
          password: formValue.password || undefined, // 👈 importante en update
        }

        isEditing
          ? await updateUser(user.id, payload)
          : await createUser(payload)

        toast.success(isEditing ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente')
        onRefresh()
        onClose()
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Error al guardar usuario'
        setGlobalError(message)
        toast.error(message)
      }
    },
  })

  // ─────────────────────────────────────────
  // Filtros dependientes
  // ─────────────────────────────────────────
  const selectedDepartment = formik.values.department

  // ✅ Cuando cambia department — recarga áreas y resetea area
  useEffect(() => {
    if (!selectedDepartment) return
    getAreas(undefined, Number(selectedDepartment))
    if (formik.dirty) formik.setFieldValue('area', '')
  }, [selectedDepartment])

  const isSubmitting = formik.isSubmitting

  return (
    <div className="w-full">

      {globalError && <GlobalError globalError={globalError} />}

      <form onSubmit={formik.handleSubmit} noValidate>
        <Fieldset disabled={isSubmitting} className="space-y-6 data-disabled:opacity-60">
          
          <Legend className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Datos del usuario
          </Legend>

          {/* BASICOS */}
          <FormField label="Username" name="username" formik={formik} required />
          <FormField label="Email" name="email" type="email" formik={formik} required />
          {!isEditing && (
            <FormField label="Password" name="password" type="password" formik={formik} required />
          )}

          <FormField label="Nombres" name="first_name" formik={formik} />
          <FormField label="Apellidos" name="last_name" formik={formik} />

          <FormField label="DNI / Identificación" name="identification_number" formik={formik} />
          <FormField label="Cargo" name="position" formik={formik} />

          {/* RELACIONES */}
          <FormSelect
            label="Departamento"
            name="department"
            formik={formik}
            options={departments.map(d => ({ value: d.id, label: d.name }))}
          />

          <FormSelect
            label="Área"
            name="area"
            formik={formik}
            options={areas.map(a => ({ value: a.id, label: a.name }))}
          />

          <FormSelect
            label="País"
            name="country"
            formik={formik}
            options={countries.map(c => ({ value: c.id, label: c.name }))}
          />

          <FormSearchSingle
            label="Sitio principal"
            name="site"
            formik={formik}
            options={sitesForSite.map(s => ({ value: s.id, label: s.name }))}
            initialLabel={user?.site_name}  // ✅ nombre al editar
            onSearch={handleSiteSearch}
            searching={loadingSite}
            placeholder="Buscar sitio..."
          />

          {/* FLAGS */}
          <FormCheckbox label="Activo" name="is_active" formik={formik} />
          <FormCheckbox label="Es staff" name="is_staff" formik={formik} />

          {/* ✅ Metadata — pills seleccionables */}
          <FormMultiSelect
            label="Metadata"
            name="metadata"
            formik={formik}
            options={metadataList.map(m => ({ value: m.id, label: m.name }))}
            description="Selecciona los tipos de metadata asignados al usuario"
          />

          {/* ✅ Sites permitidos — pills seleccionables */}
          <FormSearchSelect
            label="Sites permitidos"
            name="permissions_sites"
            formik={formik}
            options={sitesForPermissions.map(s => ({ value: s.id, label: s.name }))}
            initialOptions={user?.permissions_sites_names?.map((s: any) => ({ value: s.id, label: s.name })) ?? []}
            description="Busca y selecciona los sites permitidos"
            placeholder="Buscar site..."
            onSearch={handleSitesSearch}    // ✅ busca en Django
            searching={loadingPermissions}       // ✅ muestra spinner
          />

        </Fieldset>

        <Footer onClose={onClose} isSubmitting={isSubmitting} isEditing={isEditing} />
      </form>
    </div>
  )
}

function initialValues(data: any) {
  return {
    username: data?.username ?? '',
    email: data?.email ?? '',
    password: data?.password ?? '',
    first_name: data?.first_name ?? '',
    last_name: data?.last_name ?? '',
    identification_number: data?.identification_number ?? '',
    position: data?.position ?? '',
    department: data?.department?.id ?? data?.department ?? '',
    area: data?.area?.id ?? data?.area ?? '',
    country: data?.country?.id ?? data?.country ?? '',
    site: data?.site?.id ?? data?.site ?? '',
    is_active: data?.is_active ?? true,
    is_staff: data?.is_staff ?? false,
    permissions_sites: data?.permissions_sites ?? [],
    metadata: data?.metadata ?? [],
  }
}

function newValidationSchema() {
  return Yup.object().shape({
    username: Yup.string().required('Username requerido'),
    email: Yup.string().email().required('Email requerido'),
    password: Yup.string().required('Password requerido'),
    first_name: Yup.string().trim(),
    last_name: Yup.string().trim(),
    identification_number: Yup.string().trim(),
    position: Yup.string().trim(),
    department: Yup.string().trim(),
    area: Yup.string().trim(),
    country: Yup.string().trim(),
    site: Yup.string().trim(),
    is_active: Yup.boolean(),
    is_staff: Yup.boolean(),
    permissions_sites: Yup.array().of(Yup.number()),
    metadata: Yup.array().of(Yup.number()),
  })
}

function updateValidationSchema() {
  return Yup.object().shape({
    username: Yup.string().required('Username requerido'),
    email: Yup.string().email().required('Email requerido'),
    first_name: Yup.string().trim(),
    last_name: Yup.string().trim(),
    identification_number: Yup.string().trim(),
    position: Yup.string().trim(),
    department: Yup.string().trim(),
    area: Yup.string().trim(),
    country: Yup.string().trim(),
    site: Yup.string().trim(),
    is_active: Yup.boolean(),
    is_staff: Yup.boolean(),
    permissions_sites: Yup.array().of(Yup.number()),
    metadata: Yup.array().of(Yup.number()),
  })  
}