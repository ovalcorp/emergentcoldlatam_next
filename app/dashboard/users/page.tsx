'use client'

import { useState, useEffect } from 'react'
import { useUser } from '../../hook/useUser'
import { useAuth } from '../../hook/useAuth'
import { HeaderPage } from '../../component/headerPage'
import { ModalBasic } from '../../component/common/modalBasic'
import { AddEditUserForm } from '../../component/users/addEditForm'
import { ModalPrueba } from '../../component/common/modalPrueba'
import { Button }  from '@headlessui/react'
import React from 'react'

//compenentes users
import { TableUser } from '../../component/users/tableUser'

export default function UsersPage() {
    // estados para el modal
    const [titleModal, setTitleModal] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [contentModal, setContentModal] = useState<React.ReactNode>(null)
    const [refresh, setRefresh] = useState(false)
    let [isOpen, setIsOpen] = useState(false)

    //estados para el listado de usuarios
    const { users, loading, error, getUsers } = useUser()
    const { isAuthenticated, user } = useAuth()
    const showNewButton = user?.is_superuser || false

    useEffect(() => {
        getUsers()
    }, [])

    const openCloseModal = () => setShowModal(false)
    const onRefresh = () => setRefresh((prev) => !prev)

    const addUser = () => {
        setTitleModal('Crear Usuario')
        setContentModal(<AddEditUserForm onClose={openCloseModal} onRefresh={onRefresh}/>)
        setShowModal(true)
    }


    const updateUser = (user: any) => {
        setTitleModal('Actualizar Usuario')
        setContentModal(<AddEditUserForm onClose={openCloseModal} onRefresh={onRefresh} user={user}/>)
        setShowModal(true)
    }

    const onDeleteUser = (user: any) => {
        // TODO: implementar funcionalidad de eliminar
        console.log('Eliminar usuario:', user)
    }

  return (
    <div className="w-full space-y-4">
        <HeaderPage 
          title="Usuarios" 
          onSearch={() => {}} 
          onNew={addUser} 
          onSync={onRefresh}
          showNewButton={showNewButton}
        />
        <div className="w-full">
          <TableUser
            users={users}
            updateUser={updateUser}
            onDeleteUser={onDeleteUser}
          />
        </div>
        <ModalBasic 
          show={showModal}
          onClose={openCloseModal}
          title={titleModal}
        >
            {contentModal}
        </ModalBasic>
    </div>
  )
}