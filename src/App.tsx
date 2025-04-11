// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { AuthProvider } from './hooks/AuthProvider'
import { SignIn } from './routes/auth/SingIn'
import { Dashboard } from './routes/dashboard'
import { SignUp } from './routes/auth/SingUp'
import { ResetPassword } from './routes/auth/ResetPassword'
import { UpdatePassword } from './routes/auth/UpdatePassword'

export const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/registrarse" element={<SignUp />} />
        <Route path="/olvidocontraseña" element={<ResetPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </AuthProvider>
)
