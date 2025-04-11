// src/auth/UpdatePassword.tsx
import { useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const { updatePassword, loading, error } = useFormLogic();
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar el componente
    const checkAuth = async () => {
      const session = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleUpdatePassword = async () => {
    const success = await updatePassword(newPassword);
    if (success) {
      alert('Contraseña actualizada con éxito.');
      navigate('/login');
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Actualizar Contraseña</CardTitle>
            <CardDescription>
              Ingresa tu nueva contraseña a continuación.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="new-password">Nueva Contraseña</Label>
                  <Input
                    id="new-password"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleUpdatePassword}
                  disabled={loading || !newPassword}
                >
                  {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
                </Button>
                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
