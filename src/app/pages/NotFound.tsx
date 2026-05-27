import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c7f2a4] via-[#bae6fd] to-[#e9d5ff] flex items-center justify-center px-8">
      <div className="text-center">
        <div className="text-[8rem] mb-4">🦕</div>
        <h1 className="font-['Fredoka_One',cursive] text-[4rem] text-[#3B0764] mb-4">
          404
        </h1>
        <p className="text-[1.5rem] text-gray-700 font-bold mb-8">
          ¡Ups! Esta página se perdió en la prehistoria...
        </p>
        <Link
          to="/"
          className="inline-block bg-[#6B21A8] hover:bg-[#7C3AED] text-white font-['Fredoka_One',cursive] text-[1.2rem] px-8 py-4 rounded-[40px] shadow-[0_6px_20px_rgba(107,33,168,0.35)] transition-all no-underline"
        >
          🏠 Volver al inicio
        </Link>
      </div>
    </div>
  );
}
