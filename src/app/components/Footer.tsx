import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-[#3B0764] text-white py-14 px-8">
      <div className="max-w-[1100px] mx-auto grid grid-cols-[2fr_1fr_1fr_1fr] gap-10 pb-10 border-b border-white/15 max-md:grid-cols-[1fr_1fr] max-[480px]:grid-cols-1">
        <div>
          <Link to="/" className="flex items-center gap-2 no-underline mb-3">
            <span className="text-[1.4rem]">🦕</span>
            <span className="font-['Fredoka_One',cursive] text-[1.3rem] text-[#6B21A8]">
              LETRA<span className="text-[#16A34A]">SAURIO</span>
            </span>
          </Link>
          <p className="text-[0.88rem] opacity-75 mt-3 leading-relaxed max-w-[240px] font-semibold">
            Aprender es una aventura que dura toda la vida.
          </p>
        </div>

        <div>
          <h4 className="font-['Fredoka_One',cursive] text-[1rem] text-[#FACC15] mb-4">
            Enlaces rápidos
          </h4>
          <Link to="/" className="block text-[0.88rem] text-white/75 no-underline mb-1.5 font-semibold transition-colors hover:text-[#FACC15]">
            Inicio
          </Link>
          <Link to="/productos" className="block text-[0.88rem] text-white/75 no-underline mb-1.5 font-semibold transition-colors hover:text-[#FACC15]">
            Productos
          </Link>
          <Link to="/quienes-somos" className="block text-[0.88rem] text-white/75 no-underline mb-1.5 font-semibold transition-colors hover:text-[#FACC15]">
            Quiénes Somos
          </Link>
          <Link to="/faq" className="block text-[0.88rem] text-white/75 no-underline mb-1.5 font-semibold transition-colors hover:text-[#FACC15]">
            FAQ
          </Link>
        </div>

        <div>
          <h4 className="font-['Fredoka_One',cursive] text-[1rem] text-[#FACC15] mb-4">
            Comunidad
          </h4>
          <Link to="/quienes-somos" className="block text-[0.88rem] text-white/75 no-underline mb-1.5 font-semibold transition-colors hover:text-[#FACC15]">
            Quiénes Somos
          </Link>
          <Link to="/contacto" className="block text-[0.88rem] text-white/75 no-underline mb-1.5 font-semibold transition-colors hover:text-[#FACC15]">
            Contacto
          </Link>
          <Link to="/faq" className="block text-[0.88rem] text-white/75 no-underline mb-1.5 font-semibold transition-colors hover:text-[#FACC15]">
            Preguntas frecuentes
          </Link>
          <Link to="/login" className="block text-[0.88rem] text-white/75 no-underline mb-1.5 font-semibold transition-colors hover:text-[#FACC15]">
            Acceso
          </Link>
        </div>

        <div>
          <h4 className="font-['Fredoka_One',cursive] text-[1rem] text-[#FACC15] mb-4">
            Contáctanos
          </h4>
          <div className="flex items-center gap-2 mb-2 text-[0.88rem] opacity-80 font-semibold">
            ✉️ letrasaurio@ujat.mx
          </div>
          <div className="flex items-center gap-2 mb-2 text-[0.88rem] opacity-80 font-semibold">
            📍 Cunduacán, Tabasco
          </div>
          <div className="flex gap-2.5 mt-2">
            <a
              href="#"
              className="w-9 h-9 bg-[#1877F2] rounded-full flex items-center justify-center text-[1rem] no-underline transition-transform hover:scale-110"
            >
              f
            </a>
            <a
              href="#"
              className="w-9 h-9 bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-full flex items-center justify-center text-[1rem] no-underline transition-transform hover:scale-110"
            >
              📷
            </a>
            <a
              href="#"
              className="w-9 h-9 bg-[#FF0000] rounded-full flex items-center justify-center text-[1rem] no-underline transition-transform hover:scale-110"
            >
              ▶
            </a>
          </div>
        </div>
      </div>

      <div className="pt-6 text-center text-[0.82rem] opacity-60 font-semibold">
        © 2026 LETRASAURIO – UJAT División Académica de Ciencias y Tecnologías de la Información. Todos los derechos reservados.
      </div>
    </footer>
  );
}
