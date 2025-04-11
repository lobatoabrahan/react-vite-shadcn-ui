import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';  // Asegúrate de que la instancia de Supabase esté configurada correctamente

export const ConfirmEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const confirmEmail = async () => {
      const token = searchParams.get('token');
      const redirectTo = searchParams.get('redirect_to') || '/login'; // Redirige a '/login' por defecto

      if (token) {
        try {
          // Verifica el token de confirmación
          const { error } = await supabase.auth.verifyOtp({
            email: searchParams.get('email') || '',  // Asegúrate de pasar el correo correcto
            token,
            type: 'signup', // Tipo de verificación: 'signup' para confirmar el registro
          });

          if (error) {
            console.error('Error al verificar el token:', error.message);
            return;
          }

          // Si no hay errores, redirige al usuario a la URL proporcionada
          navigate(redirectTo);  // Redirige al usuario a la página especificada en el parámetro redirect_to
        } catch (error) {
          console.error('Error al verificar el token:', error);
        }
      }
    };

    confirmEmail();
  }, [searchParams, navigate]);

  return (
    <div className="w-full max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-xl font-bold">Verificando tu Correo...</h1>
      <p>Estamos procesando tu solicitud. Por favor, espera un momento.</p>
    </div>
  );
};
