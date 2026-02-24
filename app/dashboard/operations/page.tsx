'use client'

import { useState, useEffect } from 'react'
import { useOperation } from '../../hook/useOperation'
import { useAuth } from '../../hook/useAuth'
import { HeaderPage } from '../../component/headerPage'
import { ModalBasic } from '../../component/common/modalBasic'
import React from 'react'
import { TableOperation } from '../../component/operations/tableOperation'
import { AddEditOperationForm } from '../../component/operations/addEditForm'

export default function OperationsPage() {
    // estados para el modal
    const [titleModal, setTitleModal] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [contentModal, setContentModal] = useState<React.ReactNode>(null)
    const [refresh, setRefresh] = useState(false)

    //estados para el listado de usuarios
    const { operations, loading, error, getOperations, deleteOperation } = useOperation()
    const { isAuthenticated, user } = useAuth()
    const showNewButton = user?.is_staff || false

    useEffect(() => {
        getOperations()
    }, [refresh])

    const openCloseModal = () => setShowModal(false)
    const onRefresh = () => setRefresh((prev) => !prev)

    const addOperation = () => {
        setTitleModal('Crear Operación')
        setContentModal(<AddEditOperationForm onClose={openCloseModal} onRefresh={onRefresh}/>)
        setShowModal(true)
    }


    const updateOperation = (operation: any) => {
        setTitleModal('Actualizar Operación')
        setContentModal(<AddEditOperationForm onClose={openCloseModal} onRefresh={onRefresh} operation={operation}/>)
        setShowModal(true)
    }

    const handleDeleteOperation = async (id: number) => {
      try {
        await deleteOperation(id)
        onRefresh()
      } catch (error) {
        console.error('Error al eliminar operación:', error)
      }
    }

    const onDeleteOperation = (operation: any) => {
        setTitleModal('Eliminar Operación')
        setContentModal(
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Esta acción no se puede deshacer.</p>
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded-md" 
              onClick={() => {
                handleDeleteOperation(operation.id)
                openCloseModal()
              }}
            >
              Eliminar
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={openCloseModal}>Cancelar</button>
          </div>
        )
        setShowModal(true)
    }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        <span className="ml-4 text-lg text-gray-900">Cargando datos...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex justify-center items-center h-screen text-red-500"></div>
        <span>Error al cargar los datos: {error}</span>
      </div>
    )
  }

  return (
    <div className="w-full space-y-4">
        <HeaderPage 
          title="Operaciones" 
          onSearch={() => {}} 
          onNew={addOperation} 
          onSync={onRefresh}
          showNewButton={showNewButton}
        />
        <div className="w-full">
          <TableOperation
            operations={operations}
            updateOperation={updateOperation}
            onDeleteOperation={onDeleteOperation}
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