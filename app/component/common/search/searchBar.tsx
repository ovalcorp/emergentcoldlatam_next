'use client'

import { useState } from 'react'
import { Button } from '@headlessui/react'

import { SearchIcon } from '../icon/edit-icon'

interface SearchBarProps {
  onSearch: (value: string) => void
  placeholder?: string
}

export function SearchBar({ onSearch, placeholder = 'Buscar...' }: SearchBarProps) {
  // Estado local — no sube al padre hasta que el usuario confirma la búsqueda
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(value)
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full sm:w-64">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-sm text-black"
      />
      {/* Click en el ícono también dispara el submit del form */}
      <Button type="submit" className="absolute right-3 top-2.5">
        <SearchIcon className="h-5 w-5 text-gray-400" />
      </Button>
    </form>
  )
}