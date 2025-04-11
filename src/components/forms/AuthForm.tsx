import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type AuthFormProps = {
  type: 'login' | 'register' | 'forgot'
  onSubmit: (email: string, password?: string) => void
}

export const AuthForm = ({ type, onSubmit }: AuthFormProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    if (type === 'forgot') onSubmit(email)
    else onSubmit(email, password)
  }

  return (
    <div className="grid gap-4">
      <Input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      {type !== 'forgot' && (
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      )}
      <Button onClick={handleSubmit}>
        {type === 'login'
          ? 'Iniciar sesión'
          : type === 'register'
          ? 'Registrarse'
          : 'Recuperar contraseña'}
      </Button>
    </div>
  )
}
