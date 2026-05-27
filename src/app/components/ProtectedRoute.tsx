import { Navigate } from "react-router";
import { useAuth, UserRole } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, loading } = useAuth();

  // FIX: esperar a que Supabase restaure la sesión antes de decidir
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F0]">
        <div className="text-center">
          <div className="text-[4rem] animate-bounce">🦕</div>
          <p className="font-['Fredoka_One',cursive] text-[1.2rem] text-[#6B21A8] mt-2">
            Cargando...
          </p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si el rol no está permitido, redirigir a su propio dashboard
  if (!allowedRoles.includes(user?.role ?? null)) {
    switch (user?.role) {
      case "niño":
        return <Navigate to="/dashboard/nino" replace />;
      case "tutor":
        return <Navigate to="/dashboard/tutor" replace />;
      case "admin":
        return <Navigate to="/dashboard/admin" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}