'use client'

import React, { useState, useEffect } from 'react'

//hooks
import { useAuth } from '../../../hook/useAuth'
import { useSite, Site } from '../../../hook/useSite'
import { useModal } from '../../../hook/modal/useModal'
import { useRefresh } from '../../../hook/refresh/useRefresh'

//componentes
import { HeaderPage } from '../../../component/headerPage'
import { SearchBar } from '../../../component/common/search/searchBar'
import { TableSite } from '../../../component/administration/sites/tableSite'
import { AddEditSiteForm } from '../../../component/administration/sites/addEditForm'
import { ModalBasic } from '../../../component/common/modalBasic'
import { DeleteConfirm } from '../../../component/common/deleteConfirm'
import { Pagination } from '../../../component/common/pagination/pagination'

export default function SitesPage() {
  // Estado de búsqueda — se actualiza al confirmar en SearchBar (Enter o click)
  const [search, setSearch] = useState('')
  // Estado de paginación — se actualiza al cambiar la página o el tamaño de página
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Estado del modal
  const { showModal, titleModal, contentModal, openModal, closeModal } = useModal()
  const { refresh, onRefresh } = useRefresh()

  const { sites, loading, error, pagination, getSites, deleteSite } = useSite()
  const { user } = useAuth()

  // Solo superusuarios pueden crear países
  const showNewButton = user?.is_superuser ?? false

  // Se ejecuta cada vez que cambia el search — refresca la tabla
  useEffect(() => {
    //console.log('🔄 disparando getSites', { search, page, pageSize, refresh })
    getSites(search, page, pageSize)
  }, [refresh, search, page, pageSize])

  // ✅ Al buscar resetea a página 1
  const handleSearch = (value: string) => {
    setPage(1)
    setSearch(value)
  }

  // ✅ Al cambiar tamaño resetea a página 1
  const handlePageSizeChange = (size: number) => {
    setPage(1)
    setPageSize(size)
  }

  /* 🔹 ACCIONES CRUD */
  const addSite = () => {
    openModal('Crear Site',
      <AddEditSiteForm onClose={closeModal} onRefresh={onRefresh} />
    )
  }

  const updateSite = (site: Site) => {
    openModal('Actualizar Site',
      <AddEditSiteForm onClose={closeModal} onRefresh={onRefresh} site={site} />
    )
  }

  const handleDelete = (site: Site) => {
    openModal('Eliminar Site',
      <DeleteConfirm onConfirm={async () => {
        await deleteSite(site.id)
        onRefresh()
        closeModal()
      }} onCancel={closeModal} />
    )
  }

  return (
    <div className="w-full space-y-4">
      {/* Título + Sincronizar + Nuevo */}
      <HeaderPage
        title="Sitios"
        onNew={addSite}
        onSync={onRefresh}
        showNewButton={showNewButton}
      />

      {/* Buscador — separado del header para poder crecer con filtros de fecha, país, etc. */}
      <SearchBar onSearch={handleSearch} />

      {/* Tabla — recibe datos como props, sin lógica interna */}
      <div className="w-full">
        <TableSite
          sites={sites}
          loading={loading}
          error={error}
          onUpdate={updateSite}
          onDelete={handleDelete}
          onRetry={onRefresh}
        />
      </div>

      <Pagination
        count={pagination.count}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={handlePageSizeChange}
      />

      {/* Modal dinámico — reutilizado para crear, editar y eliminar */}
      <ModalBasic show={showModal} onClose={closeModal} title={titleModal}>
        {contentModal}
      </ModalBasic>
    </div>
  )
}