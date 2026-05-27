import { Link, useLocation } from "react-router";

export default function Header() {
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Inicio" },
    { to: "/productos", label: "Productos" },
    { to: "/quienes-somos", label: "Quiénes Somos" },
    { to: "/faq", label: "FAQ" },
    { to: "/contacto", label: "Contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_12px_rgba(107,33,168,0.10)] px-8">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[70px]">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <span className="text-[2rem] inline-block animate-[wiggle_2.5s_infinite]">🦕</span>
          <span className="font-['Fredoka_One',cursive] text-[1.7rem] text-[#6B21A8] tracking-wide">
            LETRA<span className="text-[#16A34A]">SAURIO</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 max-md:hidden">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={[
                  "font-bold text-[0.93rem] no-underline px-3 py-1.5 rounded-[20px] transition-all",
                  isActive
                    ? "bg-[#6B21A8] text-white"
                    : "text-gray-800 hover:bg-[#6B21A8] hover:text-white",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link to="/login" className="flex items-center gap-1.5 bg-white border-2 border-[#6B21A8] text-[#6B21A8] font-extrabold text-[0.9rem] px-[18px] py-2 rounded-[30px] transition-all no-underline hover:bg-[#6B21A8] hover:text-white">
          👤 Iniciar sesión
        </Link>
      </div>

      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
      `}</style>
    </header>
  );
}