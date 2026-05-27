export default function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Crea tu cuenta",
      description: "Regístrate como niño, tutor o docente. El sistema asigna tu rol automáticamente y personaliza tu experiencia."
    },
    {
      number: "2",
      title: "Elige tu actividad",
      description: "Accede al Juego de Letras o a los Desafíos de Ortografía y comienza a aprender a tu propio ritmo."
    },
    {
      number: "3",
      title: "Gana medallas y logros",
      description: "Cada letra dominada y ejercicio completado suma puntos, medallas y avanza tu nivel de desempeño."
    },
    {
      number: "4",
      title: "Consulta tu progreso",
      description: "Padres y tutores pueden revisar el avance detallado desde el Panel de Progreso en cualquier momento."
    }
  ];

  return (
    <section className="py-20 px-8 bg-[#FAF7F0]">
      <h2 className="font-['Fredoka_One',cursive] text-[2rem] text-center text-[#3B0764] mb-12">
        🦕 ¿Cómo funciona? 🦕
      </h2>

      <div className="max-w-[900px] mx-auto mt-12 flex flex-col gap-8 relative before:content-[''] before:absolute before:left-10 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-[#6B21A8] before:to-[#16A34A] before:rounded max-md:before:left-7">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-start gap-6 bg-white rounded-[20px] p-6 shadow-[0_2px_12px_rgba(107,33,168,0.07)] relative z-10"
          >
            <div className="flex-shrink-0 w-14 h-14 bg-[#6B21A8] text-white rounded-full font-['Fredoka_One',cursive] text-[1.6rem] flex items-center justify-center shadow-[0_4px_12px_rgba(107,33,168,0.3)]">
              {step.number}
            </div>
            <div>
              <h3 className="font-['Fredoka_One',cursive] text-[1.15rem] text-[#3B0764] mb-1">
                {step.title}
              </h3>
              <p className="text-[0.93rem] text-gray-600 font-semibold leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}