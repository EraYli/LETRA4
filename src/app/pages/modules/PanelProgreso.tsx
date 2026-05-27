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

      const { data: progresoData } = await supabase
        .from('progreso_usuarios')
        .select('letras_dominadas, nivel_actual, puntuacion_total, ultima_conexion, racha_dias, actividad_semanal')
        .eq('usuario_id', targetId);

      if (progresoData && progresoData.length > 0) {
        const todasLetras = [...new Set(progresoData.flatMap(p => p.letras_dominadas || []))];
        const puntuacionTotal = progresoData.reduce((sum, p) => sum + (p.puntuacion_total || 0), 0);
        const nivelMax = Math.max(...progresoData.map(p => p.nivel_actual || 1));
        const rachaMax = Math.max(...progresoData.map(p => p.racha_dias || 0));
        const ultimaConexion = progresoData.sort((a, b) =>
          new Date(b.ultima_conexion).getTime() - new Date(a.ultima_conexion).getTime()
        )[0].ultima_conexion;

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
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-[20px] p-6 shadow-[0_4px_20px_rgba(107,33,168,0.08)] text-center">
            <div className="text-[3rem] mb-2">📚</div>
            <p className="font-['Fredoka_One',cursive] text-[2rem] text-[#6B21A8]">
              {learnedLetters.length}/{totalLetters}
            </p>
            <p className="font-bold text-gray-600">Letras aprendidas</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-[20px] p-6 shadow-[0_4px_20px_rgba(107,33,168,0.08)] text-center">
            <div className="text-[3rem] mb-2">🔥</div>
            <p className="font-['Fredoka_One',cursive] text-[2rem] text-[#F97316]">
              {progreso?.racha_dias || 0}
            </p>
            <p className="font-bold text-gray-600">Días consecutivos</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-[20px] p-6 shadow-[0_4px_20px_rgba(107,33,168,0.08)] text-center">
            <div className="text-[3rem] mb-2">⭐</div>
            <p className="font-['Fredoka_One',cursive] text-[2rem] text-[#FACC15]">
              {progreso?.puntuacion_total || 0}
            </p>
            <p className="font-bold text-gray-600">Puntos totales</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-[20px] p-6 shadow-[0_4px_20px_rgba(107,33,168,0.08)] text-center">
            <div className="text-[3rem] mb-2">📈</div>
            <p className="font-['Fredoka_One',cursive] text-[2rem] text-[#16A34A]">
              {Math.round((learnedLetters.length / totalLetters) * 100)}%
            </p>
            <p className="font-bold text-gray-600">Progreso</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
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
        </div>

        {/* Logros */}
        <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(107,33,168,0.08)] mt-8">
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
            <div className="grid md:grid-cols-3 gap-6">
              {logros.map((logro, index) => (
                <motion.div
                  key={logro.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-[#FAF7F0] to-[#e9d5ff] rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-[3.5rem] mb-3">{logro.icono}</div>
                  <h3 className="font-['Fredoka_One',cursive] text-[1.2rem] text-[#6B21A8] mb-2">{logro.nombre_logro}</h3>
                  <p className="text-[0.9rem] text-gray-600 font-semibold">
                    Obtenido: {new Date(logro.fecha_ganado).toLocaleDateString('es-MX')}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
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