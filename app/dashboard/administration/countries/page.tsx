'use client'

import React, { useState, useEffect } from 'react'

//hooks
import { useAuth } from '../../../hook/useAuth'
import { useCountry, Country } from '../../../hook/useCountry'
import { useModal } from '../../../hook/modal/useModal'
import { useRefresh } from '../../../hook/refresh/useRefresh'

//componentes
import { HeaderPage } from '../../../component/headerPage'
import { SearchBar } from '../../../component/common/search/searchBar'
import { TableCountry } from '../../../component/administration/countries/tableCountry'
import { AddEditCountryForm } from '../../../component/administration/countries/addEditForm'
import { ModalBasic } from '../../../component/common/modalBasic'
import { DeleteConfirm } from '../../../component/common/deleteConfirm'

export default function CountriesPage() {
  // Estado de búsqueda — se actualiza al confirmar en SearchBar (Enter o click)
  const [search, setSearch] = useState('')

  // Estado del modal
  const { showModal, titleModal, contentModal, openModal, closeModal } = useModal()
  const { refresh, onRefresh } = useRefresh()

  const { countries, loading, error, getCountries, deleteCountry } = useCountry()
  const { user } = useAuth()

  // Solo superusuarios pueden crear países
  const showNewButton = user?.is_superuser ?? false

  // Se ejecuta cada vez que cambia el search — refresca la tabla
  useEffect(() => {
    getCountries(search)
  }, [refresh, search])


  /* 🔹 ACCIONES CRUD */
  const addCountry = () => {
    openModal('Crear País',
      <AddEditCountryForm onClose={closeModal} onRefresh={onRefresh} />
    )
  }

  const updateCountry = (country: Country) => {
    openModal('Actualizar País',
      <AddEditCountryForm onClose={closeModal} onRefresh={onRefresh} country={country} />
    )
  }

  const handleDelete = (country: Country) => {
    openModal('Eliminar País',
      <DeleteConfirm onConfirm={async () => {
        await deleteCountry(country.id)
        onRefresh()
        closeModal()
      }} onCancel={closeModal} />
    )
  }

  return (
    <div className="w-full space-y-4">
      {/* Título + Sincronizar + Nuevo */}
      <HeaderPage
        title="Países"
        onNew={addCountry}
        onSync={onRefresh}
        showNewButton={showNewButton}
      />

      {/* Buscador — separado del header para poder crecer con filtros de fecha, país, etc. */}
      <SearchBar onSearch={setSearch} />

      {/* Tabla — recibe datos como props, sin lógica interna */}
      <div className="w-full">
        <TableCountry
          countries={countries}
          loading={loading}
          error={error}
          onUpdate={updateCountry}
          onDelete={handleDelete}
          onRetry={onRefresh}
        />
      </div>

      {/* Modal dinámico — reutilizado para crear, editar y eliminar */}
      <ModalBasic show={showModal} onClose={closeModal} title={titleModal}>
        {contentModal}
      </ModalBasic>
    </div>
  )
}