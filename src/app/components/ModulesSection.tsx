export default function ModulesSection() {
  const modules = [
    {
      icon: "🔤",
      title: "Juego de Letras",
      description: "Actividades interactivas que asocian grafías con sonidos e imágenes para facilitar el aprendizaje fonético y visual.",
      buttonText: "¡Jugar ahora!",
      gradientClass: "bg-gradient-to-br from-[#7C3AED] to-[#A855F7]",
      textColorClass: "text-white",
      premium: false,
    },
    {
      icon: "✍️",
      title: "Desafíos de Ortografía",
      description: "Ejercicios progresivos de completar palabras, selección de grafías correctas y dictados con retroalimentación inmediata.",
      buttonText: "¡Aceptar desafío!",
      gradientClass: "bg-gradient-to-br from-[#16A34A] to-[#4ADE80]",
      textColorClass: "text-white",
      premium: false,
    },
    {
      icon: "🏆",
      title: "Panel de Progreso",
      description: "Tablero personalizado con letras dominadas, logros obtenidos, medallas y nivel actual de desempeño del niño.",
      buttonText: "Ver mi progreso",
      gradientClass: "bg-gradient-to-br from-[#F97316] to-[#FDE68A]",
      textColorClass: "text-gray-800",
      premium: false,
    },
  ];

  const premiumModule = {
    icon: "🎵",
    title: "Canciones del Alfabeto",
    description: "Aprende cada letra con canciones y ritmos divertidos. Refuerza la memoria fonética de forma musical y entretenida.",
    buttonText: "Suscribirme",
    gradientClass: "bg-gradient-to-br from-[#B45309] to-[#FCD34D]",
    textColorClass: "text-gray-800",
  };

  return (
    <section className="py-20 px-8 bg-white relative overflow-hidden" id="modulos">

      {/* Decoración fondo */}
      {/* Decoración fondo */}
      {/* Decoración fondo */}
      {/* Decoración fondo */}
      <span className="absolute top-4 left-4 text-[7rem] opacity-25 rotate-[-15deg] select-none pointer-events-none">🦕</span>
      <span className="absolute top-4 right-4 text-[7rem] opacity-25 rotate-[15deg] select-none pointer-events-none">🦖</span>
      <span className="absolute bottom-4 left-8 text-[6rem] opacity-20 rotate-[10deg] select-none pointer-events-none">🐾</span>
      <span className="absolute bottom-4 right-8 text-[6rem] opacity-20 rotate-[-10deg] select-none pointer-events-none">🦕</span>
      <span className="absolute top-[40%] left-2 text-[5rem] opacity-20 select-none pointer-events-none">🌿</span>
      <span className="absolute top-[40%] right-2 text-[5rem] opacity-20 select-none pointer-events-none">🌿</span>
      <span className="absolute top-[15%] left-[10%] text-[4rem] opacity-20 rotate-[8deg] select-none pointer-events-none">🥚</span>
      <span className="absolute bottom-[15%] right-[10%] text-[4rem] opacity-20 rotate-[-8deg] select-none pointer-events-none">🥚</span>
      <span className="absolute top-[25%] right-[8%] text-[5rem] opacity-20 rotate-[12deg] select-none pointer-events-none">🦖</span>
      <span className="absolute bottom-[30%] left-[6%] text-[5rem] opacity-20 rotate-[-12deg] select-none pointer-events-none">🦕</span>
      <span className="absolute top-[60%] left-[15%] text-[4rem] opacity-20 select-none pointer-events-none">🌴</span>
      <span className="absolute top-[55%] right-[14%] text-[4rem] opacity-20 select-none pointer-events-none">🌴</span>
      <span className="absolute bottom-[10%] left-[30%] text-[3.5rem] opacity-20 rotate-[5deg] select-none pointer-events-none">🐾</span>
      <span className="absolute top-[10%] right-[30%] text-[3.5rem] opacity-20 rotate-[-5deg] select-none pointer-events-none">🥚</span>

      {/* Centro */}
      <span className="absolute top-[20%] left-[35%] text-[3rem] opacity-15 rotate-[-8deg] select-none pointer-events-none">🦕</span>
      <span className="absolute top-[20%] right-[35%] text-[3rem] opacity-15 rotate-[8deg] select-none pointer-events-none">🥚</span>
      <span className="absolute top-[45%] left-[40%] text-[3rem] opacity-15 rotate-[10deg] select-none pointer-events-none">🦖</span>
      <span className="absolute top-[45%] right-[40%] text-[3rem] opacity-15 rotate-[-10deg] select-none pointer-events-none">🌿</span>
      <span className="absolute top-[65%] left-[38%] text-[3rem] opacity-15 rotate-[-5deg] select-none pointer-events-none">🐾</span>
      <span className="absolute top-[65%] right-[38%] text-[3rem] opacity-15 rotate-[5deg] select-none pointer-events-none">🌴</span>
      <span className="absolute top-[35%] left-[45%] text-[2.5rem] opacity-15 rotate-[12deg] select-none pointer-events-none">🥚</span>
      <span className="absolute bottom-[25%] right-[42%] text-[2.5rem] opacity-15 rotate-[-12deg] select-none pointer-events-none">🦕</span>

      <div className="max-w-[1100px] mx-auto relative z-10">
        <h2 className="font-['Fredoka_One',cursive] text-[2rem] text-center text-[#3B0764] mb-12">
          ✨ Nuestros módulos educativos ✨
        </h2>

        {/* 3 tarjetas gratis */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 mt-12">
          {modules.map((module, index) => (
            <div
              key={index}
              className={`${module.gradientClass} ${module.textColorClass} rounded-[28px] p-10 relative overflow-hidden transition-transform duration-250 hover:scale-105 before:content-[''] before:absolute before:top-[-40px] before:right-[-40px] before:w-[140px] before:h-[140px] before:rounded-full before:bg-white/10`}
            >
              <span className="absolute top-4 right-4 bg-white text-gray-800 font-bold text-[0.7rem] px-3 py-1 rounded-full shadow-sm tracking-wide">
                ✅ Gratis
              </span>

              <div className="text-[3rem] mb-4">{module.icon}</div>
              <h3 className="font-['Fredoka_One',cursive] text-[1.5rem] mb-2">
                {module.title}
              </h3>
              <p className="text-[0.95rem] font-semibold opacity-90 leading-snug mb-6">
                {module.description}
              </p>

              <a
                href="#"
                className={[
                  "inline-block mt-6 font-['Fredoka_One',cursive] text-[0.95rem] px-5 py-2 rounded-[30px] no-underline border-2 transition-colors",
                  module.textColorClass === "text-gray-800"
                    ? "bg-black/10 text-gray-800 border-black/20 hover:bg-black/20"
                    : "bg-white/25 text-white border-white/50 hover:bg-white/45",
                ].join(" ")}
              >
                {module.buttonText}
              </a>
            </div>
          ))}
        </div>

        {/* Tarjeta premium centrada */}
        <div className="flex justify-center mt-8">
          <div className={`${premiumModule.gradientClass} ${premiumModule.textColorClass} rounded-[28px] p-10 relative overflow-hidden transition-transform duration-250 hover:scale-105 before:content-[''] before:absolute before:top-[-40px] before:right-[-40px] before:w-[140px] before:h-[140px] before:rounded-full before:bg-white/10 w-full max-w-[360px]`}>
            <span className="absolute top-4 right-4 bg-yellow-400 text-gray-900 font-bold text-[0.7rem] px-3 py-1 rounded-full shadow-sm tracking-wide">
              👑 Premium
            </span>

            <div className="text-[3rem] mb-4">{premiumModule.icon}</div>
            <h3 className="font-['Fredoka_One',cursive] text-[1.5rem] mb-2">
              {premiumModule.title}
            </h3>
            <p className="text-[0.95rem] font-semibold opacity-90 leading-snug mb-6">
              {premiumModule.description}
            </p>

            <a
              href="#"
              className="inline-block mt-6 font-['Fredoka_One',cursive] text-[0.95rem] px-5 py-2 rounded-[30px] no-underline border-2 transition-colors bg-black/10 text-gray-800 border-black/20 hover:bg-black/20"
            >
              {premiumModule.buttonText}
            </a>
          </div>
        </div>

        {/* Franja próximamente premium */}
        <div className="mt-10 flex items-center justify-center gap-4 bg-yellow-50 border border-yellow-200 rounded-2xl py-5 px-8">
          <span className="text-2xl">👑</span>
          <div>
            <p className="font-['Fredoka_One',cursive] text-yellow-700 text-[1.1rem] leading-tight">
              Más módulos premium en camino
            </p>
            <p className="text-gray-500 text-[0.82rem] mt-0.5">
              Contenido exclusivo disponible con suscripción mensual.
            </p>
          </div>
          <span className="ml-auto bg-yellow-400 text-gray-900 font-['Fredoka_One',cursive] text-[0.75rem] px-4 py-1.5 rounded-full whitespace-nowrap">
            🚀 Próximamente
          </span>
        </div>
      </div>
    </section>
  );
}