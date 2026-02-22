'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useUser } from '../../hook/useUser';

//importaciones de formularios
import { useFormik } from 'formik';
import { MyCheckbox } from '../common/myCheckbox';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

export function AddEditUserForm(props: any) {
    const { onClose, onRefresh, user } = props;
    const { createUser, updateUser } = useUser();

    const [error, setError] = useState('');

    const formik = useFormik({
        initialValues: initialValues(user),
        validationSchema: user ? updateValidationSchema() : newValidationSchema(),
        onSubmit: async (formValue) => {
            try {
                if(user) {
                    await updateUser(user.id, formValue)
                }else {
                    await createUser(formValue)
                }
                toast.success(user ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente');
                onRefresh();
                onClose();
            }catch (error) {
                console.error('Error al crear usuario:', error);
                setError(error instanceof Error ? error.message : 'Error al crear usuario');
                toast.error(error instanceof Error ? error.message : 'Error al crear usuario');
            }
        }
    })
    return (
        <div className="bg-white shadow rounded-lg max-w-4xl w-full mx-auto p-6">
            <div className="px-4 py-5 sm:p-6">

                {/* 🔹 HEADER */}
                <div className="flex items-center space-x-4 mb-6">
                <div className="h-12 w-12 bg-[#1c2543] rounded-full flex items-center justify-center text-white text-xl font-semibold">
                    {user ? 'E' : 'A'}
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                    {user ? 'Editar Usuario' : 'Agregar Usuario'}
                    </h2>
                    <p className="text-sm text-gray-500">
                    {user
                        ? 'Actualiza la información del usuario'
                        : 'Ingresa la información del nuevo usuario'}
                    </p>
                </div>
                </div>

                {/* 🔹 ERROR */}
                {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
                )}

                {/* 🔹 FORM */}
                <form onSubmit={formik.handleSubmit} className="space-y-6">

                {/* Username */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Usuario</label>
                    <input
                    name="username"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1c2543] focus:ring-[#1c2543] sm:text-sm text-gray-900"
                    placeholder="Nombre de usuario"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    />
                    {formik.errors.username && (
                    <p className="mt-1 text-sm text-red-600">{String(formik.errors.username)}</p>
                    )}
                </div>

                {/* Password (solo crear) */}
                {!user && (
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input
                        name="password"
                        type="password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1c2543] focus:ring-[#1c2543] sm:text-sm text-gray-900"
                        placeholder="Contraseña"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password && (
                        <p className="mt-1 text-sm text-red-600">{String(formik.errors.password)}</p>
                    )}
                    </div>
                )}

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Correo</label>
                    <input
                    name="email"
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1c2543] focus:ring-[#1c2543] sm:text-sm text-gray-900"
                    placeholder="correo@empresa.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    />
                    {formik.errors.email && (
                    <p className="mt-1 text-sm text-red-600">{String(formik.errors.email)}</p>
                    )}
                </div>

                {/* Nombre y Apellido */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        name="first_name"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1c2543] focus:ring-[#1c2543] sm:text-sm text-gray-900"
                        placeholder="Nombre"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700">Apellido</label>
                    <input
                        name="last_name"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1c2543] focus:ring-[#1c2543] sm:text-sm text-gray-900"
                        placeholder="Apellido"
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                    />
                    </div>
                </div>

                {/* DNI */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">DNI</label>
                    <input
                    name="identification_number"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1c2543] focus:ring-[#1c2543] sm:text-sm text-gray-900"
                    placeholder="Número de documento"
                    value={formik.values.identification_number}
                    onChange={formik.handleChange}
                    />
                </div>

                {/* Cargo */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Cargo</label>
                    <input
                    name="position"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1c2543] focus:ring-[#1c2543] sm:text-sm text-gray-900"
                    placeholder="Cargo"
                    value={formik.values.position}
                    onChange={formik.handleChange}
                    />
                </div>

                {/* Departamento y Área */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Departamento</label>
                    <input
                        name="department"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1c2543] focus:ring-[#1c2543] sm:text-sm text-gray-900"
                        placeholder="Departamento"
                        value={formik.values.department}
                        onChange={formik.handleChange}
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700">Área</label>
                    <input
                        name="area"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1c2543] focus:ring-[#1c2543] sm:text-sm text-gray-900"
                        placeholder="Área"
                        value={formik.values.area}
                        onChange={formik.handleChange}
                    />
                    </div>
                </div>

                {/* País y Site */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700">País</label>
                    <input
                        name="country"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1c2543] focus:ring-[#1c2543] sm:text-sm text-gray-900"
                        placeholder="País"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700">Site</label>
                    <input
                        name="site"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1c2543] focus:ring-[#1c2543] sm:text-sm text-gray-900"
                        placeholder="Sede"
                        value={formik.values.site}
                        onChange={formik.handleChange}
                    />
                    </div>
                </div>

                {/* Activo */}
                <div className="flex items-center gap-3">
                    <MyCheckbox
                    value={formik.values.is_active}
                    onChange={(checked) => formik.setFieldValue('is_active', checked)}
                    />
                    <span className="text-sm text-gray-700">Usuario activo</span>
                </div>

                {/* BOTÓN */}
                <div className="flex justify-end pt-4">
                    <button
                    type="submit"
                    className="inline-flex items-center px-6 py-2.5 rounded-md text-sm font-medium text-white bg-[#1c2543] hover:bg-[#0f172a] transition shadow-sm"
                    >
                    {user ? 'Actualizar usuario' : 'Crear usuario'}
                    </button>
                </div>
                </form>
            </div>
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