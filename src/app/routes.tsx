import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

// Dashboards por rol
import NinoDashboard from "./pages/dashboards/NinoDashboard";
import TutorDashboard from "./pages/dashboards/TutorDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";

// Módulos educativos
import JuegoLetras from "./pages/modules/JuegoLetras";
import DesafiosOrtografia from "./pages/modules/DesafiosOrtografia";
import PanelProgreso from "./pages/modules/PanelProgreso";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "quienes-somos", Component: About },
      { path: "productos", Component: Products },
      { path: "contacto", Component: Contact },
      { path: "faq", Component: FAQ },
      { path: "login", Component: Login },
      { path: "registro", Component: Register },

      // Rutas protegidas - Niño
      {
        path: "dashboard/nino",
        element: (
          <ProtectedRoute allowedRoles={["niño"]}>
            <NinoDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "juego-letras",
        element: (
          <ProtectedRoute allowedRoles={["niño"]}>
            <JuegoLetras />
          </ProtectedRoute>
        ),
      },
      {
        path: "desafios-ortografia",
        element: (
          <ProtectedRoute allowedRoles={["niño"]}>
            <DesafiosOrtografia />
          </ProtectedRoute>
        ),
      },
      {
        path: "mi-progreso",
        element: (
          <ProtectedRoute allowedRoles={["niño"]}>
            <PanelProgreso />
          </ProtectedRoute>
        ),
      },

      // Rutas protegidas - Tutor
      {
        path: "dashboard/tutor",
        element: (
          <ProtectedRoute allowedRoles={["tutor"]}>
            <TutorDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "progreso-alumno/:studentId",
        element: (
          <ProtectedRoute allowedRoles={["tutor", "admin"]}>
            <PanelProgreso />
          </ProtectedRoute>
        ),
      },

      // Rutas protegidas - Admin
      {
        path: "dashboard/admin",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },

      { path: "*", Component: NotFound },
    ],
  },
]);