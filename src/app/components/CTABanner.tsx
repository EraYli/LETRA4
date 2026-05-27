import { motion } from "motion/react";
import { Link } from "react-router";

export default function CTABanner() {
  return (
    <section className="bg-gradient-to-br from-[#6B21A8] to-[#3B0764] py-20 px-8 text-center text-white relative overflow-hidden">
      <div className="absolute text-[12rem] opacity-[0.06] bottom-[-2rem] left-[-2rem]">🦕</div>
      <div className="absolute text-[10rem] opacity-[0.06] top-[-1rem] right-8">🦖</div>

      <div className="relative z-10">
        <h2 className="font-['Fredoka_One',cursive] text-[2.4rem] mb-4">
          ¡La aventura de las letras te espera!
        </h2>
        <p className="text-[1.05rem] opacity-90 font-semibold mb-8">
          Únete a LETRASAURIO y haz que aprender a leer y escribir sea la actividad favorita de tu hijo.
        </p>
        <Link to="/registro">
          <motion.button
            className="inline-flex items-center gap-2 bg-[#FACC15] text-[#3B0764] font-['Fredoka_One',cursive] text-[1.15rem] px-9 py-3.5 rounded-[40px] shadow-[0_6px_20px_rgba(0,0,0,0.25)] border-none cursor-pointer"
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            🌟 Registrarse gratis
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
