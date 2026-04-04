import { useState } from 'react'

interface UseRefreshReturn {
  refresh: boolean
  onRefresh: () => void
}

export function useRefresh(): UseRefreshReturn {
  const [refresh, setRefresh] = useState(false)
  const onRefresh = () => setRefresh(prev => !prev)
  return { refresh, onRefresh }
}