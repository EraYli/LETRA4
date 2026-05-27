import { motion } from "motion/react";

function DinoFootprint({ style, delay, size = 28 }: { style: React.CSSProperties; delay: number; size?: number }) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 40 40" fill="none"
      className="absolute pointer-events-none select-none"
      style={style}
      animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.9, 1.1, 0.9] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <ellipse cx="20" cy="28" rx="9" ry="11" fill="#16A34A" />
      <ellipse cx="10" cy="14" rx="5" ry="7" fill="#16A34A" />
      <ellipse cx="20" cy="10" rx="5" ry="7" fill="#16A34A" />
      <ellipse cx="30" cy="14" rx="5" ry="7" fill="#16A34A" />
    </motion.svg>
  );
}

function DinoEgg({ style, delay, color = "#A855F7" }: { style: React.CSSProperties; delay: number; color?: string }) {
  return (
    <motion.svg
      width="38" height="46" viewBox="0 0 38 46" fill="none"
      className="absolute pointer-events-none select-none"
      style={style}
      animate={{ y: [0, -6, 0], rotate: [-5, 5, -5] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <ellipse cx="19" cy="26" rx="17" ry="20" fill={color} opacity="0.85" />
      <ellipse cx="19" cy="26" rx="11" ry="13" fill="white" opacity="0.18" />
      <ellipse cx="13" cy="20" rx="4" ry="5" fill="white" opacity="0.22" transform="rotate(-20 13 20)" />
      <circle cx="14" cy="28" r="2.5" fill="white" opacity="0.3" />
      <circle cx="23" cy="24" r="2" fill="white" opacity="0.25" />
      <circle cx="19" cy="34" r="2" fill="white" opacity="0.2" />
    </motion.svg>
  );
}

function Fern({ style, delay, flip = false }: { style: React.CSSProperties; delay: number; flip?: boolean }) {
  return (
    <motion.svg
      width="90" height="100" viewBox="0 0 90 100" fill="none"
      className="absolute pointer-events-none select-none"
      style={{ ...style, transform: flip ? "scaleX(-1)" : undefined }}
      animate={{ rotate: flip ? [2, -2, 2] : [-2, 2, -2] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <path d="M45 95 Q40 70 20 55 Q35 58 45 75 Q42 50 15 35 Q32 42 45 60 Q44 35 22 18 Q38 28 45 48 Q46 25 30 8 Q44 20 46 45 Q50 20 68 8 Q52 22 46 48 Q53 28 70 18 Q54 35 47 60 Q58 42 75 35 Q50 50 47 75 Q57 58 72 55 Q52 70 47 95 Z" fill="#16A34A" opacity="0.7" />
    </motion.svg>
  );
}

function Volcano({ style, delay }: { style: React.CSSProperties; delay: number }) {
  return (
    <motion.svg
      width="70" height="75" viewBox="0 0 70 75" fill="none"
      className="absolute pointer-events-none select-none"
      style={style}
      animate={{ opacity: [0.5, 0.75, 0.5] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <polygon points="35,5 65,70 5,70" fill="#9CA3AF" opacity="0.5" />
      <polygon points="35,5 50,35 20,35" fill="#6B7280" opacity="0.4" />
      <motion.ellipse cx="35" cy="12" rx="6" ry="4" fill="#F97316" opacity="0.7"
        animate={{ opacity: [0.4, 0.9, 0.4], scaleY: [1, 1.4, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay }}
      />
      <motion.ellipse cx="35" cy="8" rx="4" ry="3" fill="#FCD34D" opacity="0.8"
        animate={{ opacity: [0.5, 1, 0.5], y: [0, -3, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: delay + 0.3 }}
      />
    </motion.svg>
  );
}

function Rock({ style, delay }: { style: React.CSSProperties; delay: number }) {
  return (
    <motion.svg
      width="50" height="35" viewBox="0 0 50 35" fill="none"
      className="absolute pointer-events-none select-none"
      style={style}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <ellipse cx="25" cy="22" rx="23" ry="14" fill="#9CA3AF" opacity="0.45" />
      <ellipse cx="18" cy="17" rx="12" ry="8" fill="#D1D5DB" opacity="0.35" />
      <ellipse cx="32" cy="19" rx="8" ry="6" fill="#6B7280" opacity="0.3" />
    </motion.svg>
  );
}

function Bubble({ style, delay, color }: { style: React.CSSProperties; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none select-none"
      style={{ width: 14, height: 14, background: color, opacity: 0.45, ...style }}
      animate={{ y: [0, -18, 0], opacity: [0.3, 0.65, 0.3], scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

export default function HeroBg() {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="80%" cy="110%" rx="55%" ry="45%" fill="#6B21A8" />
        </svg>
      </div>

      <DinoFootprint style={{ bottom: 40, left: "8%"  }} delay={0}   size={32} />
      <DinoFootprint style={{ bottom: 70, left: "14%" }} delay={0.6} size={24} />
      <DinoFootprint style={{ bottom: 30, left: "20%" }} delay={1.2} size={20} />
      <DinoFootprint style={{ bottom: 55, left: "55%" }} delay={0.4} size={28} />
      <DinoFootprint style={{ bottom: 25, left: "62%" }} delay={1.0} size={22} />

      <Fern style={{ bottom: 0, left: -10 }} delay={0} />
      <Fern style={{ bottom: 0, left: 55, opacity: 0.7 }} delay={1.2} />
      <Fern style={{ bottom: 0, right: -10 }} delay={0.5} flip />
      <Fern style={{ bottom: 0, right: 55, opacity: 0.6 }} delay={1.8} flip />

      <Volcano style={{ bottom: 0, left: "30%",  opacity: 0.6 }} delay={0} />
      <Volcano style={{ bottom: 0, right: "28%", opacity: 0.5 }} delay={1.5} />

      <Rock style={{ bottom: 8, left: "22%"  }} delay={0.3} />
      <Rock style={{ bottom: 5, right: "20%" }} delay={1.1} />
      <Rock style={{ bottom: 4, left: "45%"  }} delay={0.7} />

      <DinoEgg style={{ bottom: 50, left: "3%"   }} delay={0}   color="#A855F7" />
      <DinoEgg style={{ bottom: 45, left: "26%"  }} delay={0.9} color="#F97316" />
      <DinoEgg style={{ top: 40,   left: "38%"   }} delay={1.6} color="#10B981" />
      <DinoEgg style={{ top: 50,   right: "42%"  }} delay={0.5} color="#EF4444" />

      <Bubble style={{ top: 80,  left: "10%"  }} delay={0}   color="#A855F7" />
      <Bubble style={{ top: 120, left: "25%"  }} delay={0.7} color="#F97316" />
      <Bubble style={{ top: 50,  left: "42%"  }} delay={1.3} color="#10B981" />
      <Bubble style={{ top: 90,  right: "35%" }} delay={0.4} color="#3B82F6" />
      <Bubble style={{ top: 160, right: "44%" }} delay={1.1} color="#EF4444" />
      <Bubble style={{ top: 30,  right: "48%" }} delay={0.9} color="#F43F5E" />

      <motion.div className="absolute top-7 left-5 w-24 h-14 rounded-full bg-white/20 pointer-events-none"
        animate={{ x: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute top-14 right-6 w-16 h-10 rounded-full bg-white/15 pointer-events-none"
        animate={{ x: [0, -8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }} />
      <motion.div className="absolute top-5 left-[38%] w-20 h-11 rounded-full bg-white/10 pointer-events-none"
        animate={{ x: [0, 7, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} />
    </>
  );
}