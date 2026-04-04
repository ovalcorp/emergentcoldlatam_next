'use client'

import React, { useState, useEffect } from 'react'

// hooks
import { useUser, User } from '../../../hook/useUser'
import { useAuth } from '../../../hook/useAuth'
import { useModal } from '../../../hook/modal/useModal'
import { useRefresh } from '../../../hook/refresh/useRefresh'

// componentes comunes
import { HeaderPage } from '../../../component/headerPage'
import { SearchBar } from '../../../component/common/search/searchBar'
import { ModalBasic } from '../../../component/common/modalBasic'
import { DeleteConfirm } from '../../../component/common/deleteConfirm'
import { Pagination } from '../../../component/common/pagination/pagination'

// componentes users
import { TableUser } from '../../../component/administration/users/tableUser'
import { AddEditUserForm } from '../../../component/administration/users/addEditForm'

export default function UsersPage() {

  // 🔎 búsqueda + paginación
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // 🔄 modal + refresh (igual que Sites)
  const { showModal, titleModal, contentModal, openModal, closeModal } = useModal()
  const { refresh, onRefresh } = useRefresh()

  // 📦 data
  const { users, loading, error, pagination, getUsers, deleteUser } = useUser()
  const { user } = useAuth()

  const showNewButton = user?.is_superuser ?? false

  // 🔁 fetch
  useEffect(() => {
    getUsers(search, page, pageSize)
  }, [refresh, search, page, pageSize])

  // 🔎 búsqueda
  const handleSearch = (value: string) => {
    setPage(1)
    setSearch(value)
  }

  // 📄 page size
  const handlePageSizeChange = (size: number) => {
    setPage(1)
    setPageSize(size)
  }

  /* 🔹 CRUD */

  const addUser = () => {
    openModal(
      'Crear Usuario',
      <AddEditUserForm onClose={closeModal} onRefresh={onRefresh} />
    )
  }

  const updateUser = (user: User) => {
    openModal(
      'Actualizar Usuario',
      <AddEditUserForm onClose={closeModal} onRefresh={onRefresh} user={user} />
    )
  }

  const handleDelete = (user: User) => {
    openModal(
      'Eliminar Usuario',
      <DeleteConfirm
        onConfirm={async () => {
          await deleteUser(user.id)
          onRefresh()
          closeModal()
        }}
        onCancel={closeModal}
      />
    )
  }

  return (
    <div className="w-full space-y-4">

      {/* HEADER */}
      <HeaderPage
        title="Usuarios"
        onNew={addUser}
        onSync={onRefresh}
        showNewButton={showNewButton}
      />

      {/* SEARCH */}
      <SearchBar onSearch={handleSearch} />

      {/* TABLE */}
      <div className="w-full">
        <TableUser
          users={users}
          loading={loading}
          error={error}
          onUpdate={updateUser}
          onDelete={handleDelete}
          onRetry={onRefresh}
        />
      </div>

      {/* PAGINATION */}
      <Pagination
        count={pagination.count}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={handlePageSizeChange}
      />

      {/* MODAL */}
      <ModalBasic show={showModal} onClose={closeModal} title={titleModal}>
        {contentModal}
      </ModalBasic>

    </div>
  )
}