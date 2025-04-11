// src/routes/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { ReactElement } from 'react'

interface Props {
  children: ReactElement
}

export const ProtectedRoute = ({ children }: Props) => {
  const { session, isLoading } = useAuth()
  if (isLoading) return <p>Cargando...</p>
  if (!session) return <Navigate to="/sign-in" />
  return children
}
