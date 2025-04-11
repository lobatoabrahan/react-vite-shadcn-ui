// src/auth/SignUp.tsx
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

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);
  const { signUp, loading, error } = useFormLogic();

  const handleSignUp = async () => {
    const success = await signUp(email, password);
    if (success) {
      setRegistered(true);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          {/* Formulario de registro */}
          {!registered && (
            <Card className="fadeIn">
              <CardHeader>
                <CardTitle className="text-2xl">Crear cuenta</CardTitle>
                <CardDescription>
                  Ingresa tu correo electrónico para crear una cuenta
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
                    <div className="grid gap-2">
                      <Label htmlFor="password">Contraseña</Label>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={handleSignUp}
                      disabled={loading}
                    >
                      {loading ? 'Cargando...' : 'Regístrate'}
                    </Button>
                  </div>
                  <div className="mt-4 text-center text-sm">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login" className="underline underline-offset-4">
                      Inicia sesión
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Mensaje de confirmación */}
          {registered && (
            <Card className="fadeIn">
              <CardHeader>
                <CardTitle className="text-2xl ">
                  ¡Revisa tu correo!
                </CardTitle>
                <CardDescription>
                  Te hemos enviado un enlace de confirmación a{' '}
                  <strong>{email.toLowerCase()}</strong>. Por favor, sigue las instrucciones
                  para completar el registro.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Si no ves el correo, revisa tu carpeta de spam.
                </p>
                
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
