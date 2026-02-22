'use client';

import { useState } from 'react';
import { BRAND_COLOR } from '../globals';
import { useAuth } from '../hook/useAuth';

//importaciones de formularios
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';


export default function LoginForm() {
    const { login } = useAuth();
    const [error, setError] = useState('');

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formValue) => {
            try {
                await login(formValue.email, formValue.password);
                toast.success('Inicio de sesión exitoso');

            } catch (error) {
                console.error('Error al iniciar sesión:', error);
                setError(error instanceof Error ? error.message : 'Error al conectar con el servidor');
                toast.error(error instanceof Error ? error.message : 'Error al iniciar sesión');
            }
        }
    });
    return (
        <div className="w-full" style={{ ['--color-brand']: BRAND_COLOR } as React.CSSProperties}>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-sm">
                        {error}
                    </div>
                )}
                <form 
                    className="space-y-4" 
                    onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit(e);
                    }}
                >
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email:
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand)] focus:border-[color:var(--color-brand)] text-sm text-black"
                            placeholder="Ingresa tu Correo"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-500 text-xs mt-1">
                                {formik.errors.email}
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password:
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[color:var(--color-brand)] focus:border-[color:var(--color-brand)] text-sm text-black"
                            placeholder="Ingresa tu Contraseña"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500 text-xs mt-1">
                                {formik.errors.password}
                            </div>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                formik.isSubmitting ? 'bg-gray-500' : 'hover:opacity-90'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--color-brand)]`}
                            style={formik.isSubmitting ? undefined : { backgroundColor: BRAND_COLOR }}
                            >
                            {formik.isSubmitting ? 'Cargando...' : 'Iniciar Sesión'}
                        </button>
                    </div>
                </form>
        </div>
    )
}

function initialValues() {
    return {
        email: '',
        password: '',
    }
}

function validationSchema() {
    return {
        email: Yup.string().email('Correo inválido').required('Correo es requerido'),
        password: Yup.string().required('Contraseña es requerida'),
    }
}