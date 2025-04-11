// src/auth/ResetPassword.tsx
import { useState } from 'react';
import { useFormLogic } from '@/hooks/useFormLogic';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

export const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { resetPassword, loading, error } = useFormLogic();

  const handleReset = async () => {
    const success = await resetPassword(email);
    if (success) {
      setSubmitted(true);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Restablecer contraseña</CardTitle>
              <CardDescription>
                Ingresa tu correo electrónico para recibir un enlace de restablecimiento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@ejemplo.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <Button onClick={handleReset} disabled={loading || submitted}>
                    {loading
                      ? 'Enviando...'
                      : submitted
                      ? 'Enviado'
                      : 'Enviar enlace'}
                  </Button>

                  {submitted && (
                    <p className="text-sm text-green-600">
                      Revisa tu correo electrónico para continuar con el proceso.
                    </p>
                  )}

                  {error && (
                    <p className="text-sm text-red-600">
                      {error}
                    </p>
                  )}
                </div>

                <div className="mt-4 text-center text-sm">
                  ¿Ya tienes una cuenta?{' '}
                  <Link
                    to="/iniciar-sesion"
                    className="underline underline-offset-4"
                  >
                    Inicia sesión
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
