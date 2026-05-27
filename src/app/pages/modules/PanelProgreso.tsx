import { Link, useParams } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import DinoLettersBg from "../../components/DinoLettersBg";

interface Progreso {
  letras_dominadas: string[];
  nivel_actual: number;
  puntuacion_total: number;
  ultima_conexion: string;
  racha_dias: number;
  actividad_semanal: { day: string; completed: number }[];
  progreso_desafios?: number;
  nivel_actual_desafios?: number;
}

interface Logro {
  id: string;
  nombre_logro: string;
  icono: string;
  fecha_ganado: string;
}

interface Perfil {
  nombre_completo: string;
}

export default function PanelProgreso() {
  const { user } = useAuth();
  const { studentId } = useParams();
  const isTutorView = !!studentId;
  const targetId = studentId || user?.id;

  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [progreso, setProgreso] = useState<Progreso | null>(null);
  const [logros, setLogros] = useState<Logro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!targetId) return;

    const fetchData = async () => {
      const { data: perfilData } = await supabase
        .from('perfiles')
        .select('nombre_completo')
        .eq('id', targetId)
        .single();

      if (perfilData) setPerfil(perfilData);

      const { data: modulos } = await supabase
        .from('modulos')
        .select('id, titulo');

      const { data: progresoData } = await supabase
        .from('progreso_usuarios')
        .select('modulo_id, letras_dominadas, nivel_actual, puntuacion_total, ultima_conexion, racha_dias, actividad_semanal')
        .eq('usuario_id', targetId);

      if (progresoData && progresoData.length > 0) {
        const todasLetras = [...new Set(progresoData.flatMap(p => p.letras_dominadas || []))];
        const puntuacionTotal = progresoData.reduce((sum, p) => sum + (p.puntuacion_total || 0), 0);
        const nivelMax = Math.max(...progresoData.map(p => p.nivel_actual || 1));
        const rachaMax = Math.max(...progresoData.map(p => p.racha_dias || 0));
        const ultimaConexion = progresoData.sort((a, b) =>
          new Date(b.ultima_conexion).getTime() - new Date(a.ultima_conexion).getTime()
        )[0].ultima_conexion;

        const desafiosModulo = modulos?.find(m => m.titulo === "Desafíos de Ortografía");
        const progDesafios = progresoData.find(p => p.modulo_id === desafiosModulo?.id);
        const nivelDesafios = progDesafios?.nivel_actual || 1;
        const completedLevelsDesafios = Math.max(0, nivelDesafios - 1);
        const porcentajeDesafios = Math.min(Math.round((completedLevelsDesafios / 3) * 100), 100);

        const actividadSemanal = [
          { day: "Lun", completed: 0 },
          { day: "Mar", completed: 0 },
          { day: "Mié", completed: 0 },
          { day: "Jue", completed: 0 },
          { day: "Vie", completed: 0 },
          { day: "Sáb", completed: 0 },
          { day: "Dom", completed: 0 },
        ];

        progresoData.forEach(p => {
          if (p.actividad_semanal && Array.isArray(p.actividad_semanal)) {
            p.actividad_semanal.forEach((act: any, i: number) => {
              actividadSemanal[i].completed += act.completed || 0;
            });
          }
        });

        setProgreso({
          letras_dominadas: todasLetras,
          nivel_actual: nivelMax,
          puntuacion_total: puntuacionTotal,
          ultima_conexion: ultimaConexion,
          racha_dias: rachaMax,
          actividad_semanal: actividadSemanal,
          progreso_desafios: porcentajeDesafios,
          nivel_actual_desafios: nivelDesafios,
        });
      } else {
        setProgreso({
          letras_dominadas: [],
          nivel_actual: 1,
          puntuacion_total: 0,
          ultima_conexion: new Date().toISOString(),
          racha_dias: 0,
          actividad_semanal: [
            { day: "Lun", completed: 0 },
            { day: "Mar", completed: 0 },
            { day: "Mié", completed: 0 },
            { day: "Jue", completed: 0 },
            { day: "Vie", completed: 0 },
            { day: "Sáb", completed: 0 },
            { day: "Dom", completed: 0 },
          ],
          progreso_desafios: 0,
          nivel_actual_desafios: 1,
        });
      }

      const { data: logrosData } = await supabase
        .from('logros_medallas')
        .select('id, nombre_logro, icono, fecha_ganado')
        .eq('usuario_id', targetId)
        .order('fecha_ganado', { ascending: false });

      if (logrosData) setLogros(logrosData);

      setLoading(false);
    };

    fetchData();
  }, [targetId]);

  const alphabet = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
  const learnedLetters = progreso?.letras_dominadas || [];
  const totalLetters = 27;

  const getNivel = (nivel: number) => {
    if (nivel <= 1) return "Explorador";
    if (nivel <= 3) return "Aventurero";
    if (nivel <= 5) return "Campeón";
    return "Maestro";
  };

  const maxActivity = Math.max(...(progreso?.actividad_semanal || []).map(d => d.completed), 1);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#c7f2a4] via-[#bae6fd] to-[#e9d5ff] flex items-center justify-center">
        <p className="font-['Fredoka_One',cursive] text-[1.5rem] text-[#6B21A8]">Cargando progreso... 🦕</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c7f2a4] via-[#bae6fd] to-[#e9d5ff] relative overflow-hidden">
      <DinoLettersBg />

      {/* Header */}
      <header className="bg-white shadow-[0_2px_12px_rgba(107,33,168,0.10)] px-8 py-4 relative z-10">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link to={isTutorView ? "/dashboard/tutor" : "/dashboard/nino"} className="flex items-center gap-2 no-underline">
            <span className="text-[2rem]">🦕</span>
            <span className="font-['Fredoka_One',cursive] text-[1.5rem] text-[#6B21A8]">
              LETRA<span className="text-[#16A34A]">SAURIO</span>
            </span>
          </Link>
          <Link
            to={isTutorView ? "/dashboard/tutor" : "/dashboard/nino"}
            className="text-[#6B21A8] font-bold hover:text-[#7C3AED] transition-colors no-underline"
          >
            ← Volver
          </Link>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-8 py-12 relative z-10">
        {/* Header Card */}
        <div className="bg-gradient-to-br from-[#F97316] to-[#FDE68A] text-gray-800 rounded-[28px] p-8 mb-8 shadow-[0_8px_30px_rgba(249,115,22,0.2)]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-['Fredoka_One',cursive] text-[2.5rem] mb-2">
                🏆 Panel de Progreso
              </h1>
              <p className="text-[1.2rem] font-bold">
                {perfil?.nombre_completo || user?.name} • Nivel: {getNivel(progreso?.nivel_actual || 1)}
              </p>
            </div>
            <div className="text-[4rem]">🦖</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(107,33,168,0.08)] text-center">
            <div className="text-[2.5rem] mb-2">📚</div>
            <p className="font-['Fredoka_One',cursive] text-[1.8rem] text-[#6B21A8]">
              {learnedLetters.length}/{totalLetters}
            </p>
            <p className="font-bold text-gray-600 text-sm">Letras aprendidas</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(107,33,168,0.08)] text-center">
            <div className="text-[2.5rem] mb-2">✍️</div>
            <p className="font-['Fredoka_One',cursive] text-[1.8rem] text-[#16A34A]">
              {progreso?.progreso_desafios || 0}%
            </p>
            <p className="font-bold text-gray-600 text-sm">Desafíos Ortografía</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(107,33,168,0.08)] text-center">
            <div className="text-[2.5rem] mb-2">🔥</div>
            <p className="font-['Fredoka_One',cursive] text-[1.8rem] text-[#F97316]">
              {progreso?.racha_dias || 0}
            </p>
            <p className="font-bold text-gray-600 text-sm">Días consecutivos</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(107,33,168,0.08)] text-center">
            <div className="text-[2.5rem] mb-2">⭐</div>
            <p className="font-['Fredoka_One',cursive] text-[1.8rem] text-[#FACC15]">
              {progreso?.puntuacion_total || 0}
            </p>
            <p className="font-bold text-gray-600 text-sm">Puntos totales</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-[20px] p-5 shadow-[0_4px_20px_rgba(107,33,168,0.08)] text-center">
            <div className="text-[2.5rem] mb-2">📈</div>
            <p className="font-['Fredoka_One',cursive] text-[1.8rem] text-[#7C3AED]">
              {Math.round(((learnedLetters.length / totalLetters) * 100 + (progreso?.progreso_desafios || 0)) / 2)}%
            </p>
            <p className="font-bold text-gray-600 text-sm">Progreso General</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Alphabet Progress */}
          <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(107,33,168,0.08)]">
            <h2 className="font-['Fredoka_One',cursive] text-[1.8rem] text-[#3B0764] mb-6">
              🔤 Alfabeto
            </h2>
            <div className="grid grid-cols-9 gap-2">
              {alphabet.map((letter) => {
                const isLearned = learnedLetters.includes(letter);
                return (
                  <motion.div
                    key={letter}
                    whileHover={{ scale: 1.1 }}
                    className={`aspect-square rounded-xl flex items-center justify-center font-['Fredoka_One',cursive] text-[1.5rem] transition-all ${
                      isLearned ? "bg-[#16A34A] text-white shadow-md" : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {letter}
                  </motion.div>
                );
              })}
            </div>
            <p className="text-gray-600 font-semibold mt-4 text-center">
              {learnedLetters.length} de {alphabet.length} letras dominadas
            </p>
          </div>

          {/* Desafíos de Ortografía Progress */}
          <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(107,33,168,0.08)] flex flex-col justify-between">
            <div>
              <h2 className="font-['Fredoka_One',cursive] text-[1.8rem] text-[#3B0764] mb-6">
                ✍️ Desafíos de Ortografía
              </h2>
              <div className="flex flex-col gap-4">
                {[
                  { name: "Fácil", emoji: "🌱", color: "from-[#16A34A] to-[#4ADE80]", level: 1, desc: "Completa 1 letra de la palabra" },
                  { name: "Medio", emoji: "🔥", color: "from-[#F97316] to-[#FDE68A]", level: 2, desc: "Completa 2 o 3 letras" },
                  { name: "Difícil", emoji: "⚡", color: "from-[#7C3AED] to-[#A855F7]", level: 3, desc: "Ordena las letras de la palabra" },
                ].map((lvl) => {
                  const nivelDesafios = progreso?.nivel_actual_desafios || 1;
                  const isCompleted = nivelDesafios > lvl.level;
                  const isUnlocked = nivelDesafios >= lvl.level;

                  return (
                    <motion.div
                      key={lvl.name}
                      whileHover={{ scale: isUnlocked ? 1.02 : 1 }}
                      className={`rounded-2xl p-4 flex items-center justify-between border-2 transition-all ${
                        isCompleted
                          ? "bg-green-50 border-green-300 text-green-800"
                          : isUnlocked
                          ? "bg-[#FAF7F0] border-[#c4b5fd] text-gray-800"
                          : "bg-gray-50 border-gray-200 text-gray-400"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-[1.8rem] ${
                          isUnlocked ? `bg-gradient-to-br ${lvl.color} text-white shadow-sm` : "bg-gray-200"
                        }`}>
                          {lvl.emoji}
                        </div>
                        <div>
                          <h4 className="font-['Fredoka_One',cursive] text-[1.15rem]">{lvl.name}</h4>
                          <p className="text-[0.8rem] font-semibold opacity-90">{lvl.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isCompleted ? (
                          <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-md">✓</span>
                        ) : isUnlocked ? (
                          <span className="bg-[#FAF7F0] border-2 border-[#6B21A8] text-[#6B21A8] rounded-full px-3 py-1 text-[0.75rem] font-extrabold animate-pulse">
                            JUGANDO
                          </span>
                        ) : (
                          <span className="text-[1.2rem]">🔒</span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <p className="text-gray-600 font-semibold mt-4 text-center">
              {Math.max(0, (progreso?.nivel_actual_desafios || 1) - 1)} de 3 niveles completados
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Weekly Activity */}
          <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(107,33,168,0.08)]">
            <h2 className="font-['Fredoka_One',cursive] text-[1.8rem] text-[#3B0764] mb-6">
              📅 Actividad semanal
            </h2>
            <div className="flex items-end justify-between gap-2 h-[200px]">
              {(progreso?.actividad_semanal || []).map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.completed / maxActivity) * 100}%` }}
                    transition={{ delay: index * 0.1 }}
                    className={`w-full rounded-t-lg ${day.completed > 0 ? "bg-[#7C3AED]" : "bg-gray-200"}`}
                    style={{ minHeight: day.completed > 0 ? "20px" : "4px" }}
                  />
                  <span className="font-bold text-[0.85rem] text-gray-600">{day.day}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-600 font-semibold mt-6 text-center">
              Total de lecciones esta semana: {(progreso?.actividad_semanal || []).reduce((sum, d) => sum + d.completed, 0)}
            </p>
          </div>

          {/* Logros */}
          <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(107,33,168,0.08)]">
            <h2 className="font-['Fredoka_One',cursive] text-[1.8rem] text-[#3B0764] mb-6">
              🏅 Medallas y logros
            </h2>
            {logros.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-[3rem] mb-4">🎯</p>
                <p className="font-bold text-gray-600">Aún no hay logros</p>
                <p className="text-gray-500 mt-2">¡Sigue practicando para ganar medallas!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 max-h-[220px] overflow-y-auto pr-2">
                {logros.map((logro, index) => {
                  const LOGROS_MAP: Record<string, { title: string; icon: string }> = {
                    "¡Primera letra aprendida!": { title: "¡Cascarón Roto!", icon: "🥚" },
                    "¡Abecedario completo!": { title: "¡Rex del Abecedario!", icon: "🦖" },
                    "¡Nivel Fácil completado!": { title: "Brote Ortográfico", icon: "🌱" },
                    "¡Nivel Medio completado!": { title: "Escritura de Fuego", icon: "🔥" },
                    "¡Maestro de Ortografía!": { title: "Velocirráptor de Palabras", icon: "⚡" },
                  };
                  const mapped = LOGROS_MAP[logro.nombre_logro] || { title: logro.nombre_logro, icon: logro.icono };

                  return (
                    <motion.div
                      key={logro.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-br from-[#FAF7F0] to-[#e9d5ff] rounded-2xl p-4 text-center hover:shadow-md transition-all"
                    >
                      <div className="text-[2.2rem] mb-2">{mapped.icon}</div>
                      <h3 className="font-['Fredoka_One',cursive] text-[0.95rem] text-[#6B21A8] mb-1 line-clamp-1">{mapped.title}</h3>
                      <p className="text-[0.75rem] text-gray-500 font-semibold">
                        {new Date(logro.fecha_ganado).toLocaleDateString('es-MX')}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Última conexión */}
        {progreso?.ultima_conexion && (
          <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(107,33,168,0.08)] mt-8 text-center">
            <p className="text-gray-600 font-semibold">
              🕐 Última actividad: {new Date(progreso.ultima_conexion).toLocaleDateString('es-MX', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
              })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}