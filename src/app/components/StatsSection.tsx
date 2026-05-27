export default function StatsSection() {
  const stats = [
    { number: "27",   label: "Letras del alfabeto" },
    { number: "3",    label: "Roles de usuario" },
    { number: "3 Gratis +",   label: "Módulos premium próximamente" },
    { number: "4–8",  label: "Años de edad recomendada" },
  ];

  return (
    <section className="bg-[#3B0764] py-14 px-8 text-white">
      <div className="max-w-[1000px] mx-auto flex justify-around flex-wrap gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <span className="font-['Fredoka_One',cursive] text-[3rem] text-[#FACC15] block leading-none">
              {stat.number}
            </span>
            <span className="text-[0.9rem] font-bold opacity-85 mt-1 block">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}