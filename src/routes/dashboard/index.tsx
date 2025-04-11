// src/pages/Dashboard.tsx
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'

export const Dashboard = () => {
  const { session } = useAuth()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <div className="max-w-3xl mx-auto mt-20 space-y-6">
      <h1 className="text-2xl font-bold">Bienvenido al Dashboard 👋</h1>

      <div className="space-y-1">
        <p><strong>Correo:</strong> {session?.user.email}</p>
        <p><strong>ID:</strong> {session?.user.id}</p>
      </div>

      <Button variant="destructive" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </div>
  )
}
