export default function WhySection() {
  const cards = [
    {
      icon: "🎮",
      title: "Aprendizaje lúdico",
      description: "Juegos y actividades interactivas que hacen que aprender las letras sea divertido y emocionante."
    },
    {
      icon: "📊",
      title: "Seguimiento de progreso",
      description: "Monitorea el avance de cada niño con reportes visuales y logros que motivan a seguir aprendiendo."
    },
    {
      icon: "💻",
      title: "Acceso multiplataforma",
      description: "Disponible en web y app para que aprendas desde cualquier lugar y en cualquier momento."
    }
  ];

  return (
    <section className="bg-[#FAF7F0] py-20 px-8 relative">
      <h2 className="font-['Fredoka_One',cursive] text-[2rem] text-center text-[#3B0764] mb-12 flex items-center justify-center gap-2.5">
        <span className="text-[#16A34A]">🌿</span> ¿Por qué elegir LETRASAURIO? <span className="text-[#16A34A]">🌿</span>
      </h2>

      <div className="max-w-[1100px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-[24px] p-9 text-center shadow-[0_4px_20px_rgba(107,33,168,0.08)] transition-all duration-250 border-2 border-transparent hover:translate-y-[-8px] hover:shadow-[0_12px_32px_rgba(107,33,168,0.15)] hover:border-[#A855F7]"
          >
            <div className="text-[3.5rem] mb-4">{card.icon}</div>
            <h3 className="font-['Fredoka_One',cursive] text-[1.3rem] text-[#7C3AED] mb-2.5">
              {card.title}
            </h3>
            <p className="text-[0.95rem] text-gray-600 leading-relaxed font-semibold">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}