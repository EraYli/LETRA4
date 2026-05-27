export default function DinoLettersBg() {
  const items = [
    // Dinosaurios y elementos
    { content: "🦕", size: 52, opacity: 0.18, top: 8,  left: 5  },
    { content: "🦖", size: 44, opacity: 0.15, top: 15, left: 18 },
    { content: "🦴", size: 34, opacity: 0.20, top: 5,  left: 30 },
    { content: "🥚", size: 28, opacity: 0.18, top: 20, left: 45 },
    { content: "🦷", size: 26, opacity: 0.15, top: 10, left: 60 },
    { content: "🦕", size: 38, opacity: 0.13, top: 5,  left: 75 },
    { content: "🦖", size: 56, opacity: 0.12, top: 18, left: 88 },
    { content: "🦴", size: 40, opacity: 0.16, top: 50, left: 8  },
    { content: "🥚", size: 32, opacity: 0.14, top: 38, left: 22 },
    { content: "🦕", size: 60, opacity: 0.10, top: 55, left: 50 },
    { content: "🦷", size: 30, opacity: 0.14, top: 42, left: 65 },
    { content: "🦖", size: 36, opacity: 0.14, top: 58, left: 80 },
    { content: "🦕", size: 48, opacity: 0.13, top: 45, left: 92 },
    { content: "🦴", size: 36, opacity: 0.16, top: 78, left: 15 },
    { content: "🥚", size: 30, opacity: 0.14, top: 65, left: 35 },
    { content: "🦖", size: 50, opacity: 0.11, top: 85, left: 55 },
    { content: "🦕", size: 42, opacity: 0.13, top: 72, left: 78 },
    { content: "🦷", size: 28, opacity: 0.15, top: 90, left: 92 },
    // Letras del alfabeto
    { content: "A", size: 48, opacity: 0.12, top: 12, left: 12, letter: true },
    { content: "B", size: 40, opacity: 0.10, top: 8,  left: 38, letter: true },
    { content: "C", size: 44, opacity: 0.12, top: 22, left: 70, letter: true },
    { content: "D", size: 36, opacity: 0.10, top: 35, left: 3,  letter: true },
    { content: "E", size: 50, opacity: 0.11, top: 28, left: 55, letter: true },
    { content: "F", size: 38, opacity: 0.10, top: 48, left: 35, letter: true },
    { content: "G", size: 42, opacity: 0.12, top: 62, left: 10, letter: true },
    { content: "H", size: 46, opacity: 0.10, top: 32, left: 82, letter: true },
    { content: "I", size: 44, opacity: 0.12, top: 68, left: 45, letter: true },
    { content: "L", size: 40, opacity: 0.11, top: 55, left: 25, letter: true },
    { content: "M", size: 52, opacity: 0.11, top: 75, left: 65, letter: true },
    { content: "O", size: 46, opacity: 0.10, top: 88, left: 30, letter: true },
    { content: "R", size: 40, opacity: 0.12, top: 15, left: 52, letter: true },
    { content: "S", size: 48, opacity: 0.10, top: 80, left: 85, letter: true },
    { content: "T", size: 42, opacity: 0.11, top: 42, left: 15, letter: true },
    { content: "Z", size: 44, opacity: 0.10, top: 95, left: 50, letter: true },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((item, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: `${item.top}%`,
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
            opacity: item.opacity,
            transform: `rotate(${(i * 37 % 60) - 30}deg)`,
            userSelect: "none",
            lineHeight: 1,
            ...(item.letter
              ? {
                  fontFamily: "'Fredoka One', cursive",
                  fontWeight: 900,
                  color: i % 3 === 0 ? "#6B21A8" : i % 3 === 1 ? "#16A34A" : "#F97316",
                }
              : {}),
          }}
        >
          {item.content}
        </span>
      ))}
    </div>
  );
}