import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../../supabaseClient";
import DinoLettersBg from "../../components/DinoLettersBg";

interface Nino { id: string; nombre_completo: string; fecha_registro: string; }
interface Tutor { id: string; nombre_completo: string; fecha_registro: string; ninos: Nino[]; }
interface Perfil { id: string; nombre_completo: string; tipo_usuario: string; fecha_registro: string; tutor_id: string | null; tutor?: { nombre_completo: string }; }

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"tutores" | "users" | "content">("tutores");
  const [perfiles, setPerfiles] = useState<Perfil[]>([]);
  const [tutores, setTutores] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => { logout(); navigate("/"); };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('perfiles')
        .select('id, nombre_completo, tipo_usuario, fecha_registro, tutor_id')
        .order('fecha_registro', { ascending: false });

      if (!error && data) {
        const perfilesConTutor: Perfil[] = await Promise.all(
          data.map(async (p) => {
            if (p.tutor_id) {
              const { data: tutor } = await supabase.from('perfiles').select('nombre_completo').eq('id', p.tutor_id).single();
              return { ...p, tutor: tutor ?? undefined };
            }
            return { ...p, tutor: undefined };
          })
        );
        setPerfiles(perfilesConTutor);

        const tutoresList = data.filter(p => p.tipo_usuario === 'tutor');
        const ninos = data.filter(p => p.tipo_usuario === 'niño');
        const tutoresConNinos: Tutor[] = tutoresList.map(tutor => ({
          id: tutor.id,
          nombre_completo: tutor.nombre_completo,
          fecha_registro: tutor.fecha_registro,
          ninos: ninos.filter(n => n.tutor_id === tutor.id).map(n => ({
            id: n.id, nombre_completo: n.nombre_completo, fecha_registro: n.fecha_registro,
          })),
        }));
        setTutores(tutoresConNinos);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const stats = {
    totalUsers: perfiles.length,
    activeNinos: perfiles.filter(p => p.tipo_usuario === 'niño').length,
    activeTutors: perfiles.filter(p => p.tipo_usuario === 'tutor').length,
    admins: perfiles.filter(p => p.tipo_usuario === 'admin').length,
  };

  const content = [
    { id: 1, title: "Módulo Letra A",          type: "Lección",    status: "Publicado", difficulty: "Básico"     },
    { id: 2, title: "Desafío Sílabas MA-ME-MI", type: "Ejercicio",  status: "Publicado", difficulty: "Intermedio" },
    { id: 3, title: "Módulo Letra R",           type: "Lección",    status: "Borrador",  difficulty: "Avanzado"   },
    { id: 4, title: "Dictado Nivel 1",          type: "Evaluación", status: "Publicado", difficulty: "Básico"     },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c7f2a4] via-[#bae6fd] to-[#e9d5ff] relative overflow-hidden">
      <DinoLettersBg />

      {/* Header */}
      <header className="bg-[#3B0764] shadow-[0_2px_12px_rgba(107,33,168,0.10)] px-8 py-4 relative z-10">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span className="text-[2rem]">🦕</span>
            <span className="font-['Fredoka_One',cursive] text-[1.5rem] text-white">
              LETRASAURIO <span className="text-[#FACC15]">ADMIN</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-right text-white">
              <p className="font-bold">Panel de Administración 👤</p>
              <p className="text-[0.85rem] opacity-90 font-semibold">{user?.name}</p>
            </div>
            <button onClick={handleLogout} className="bg-white/20 border-2 border-white/50 text-white font-bold px-4 py-2 rounded-full hover:bg-white/30 transition-all">
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 relative z-10">
        <div className="max-w-[1400px] mx-auto px-8 py-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-[#7C3AED] to-[#A855F7] text-white rounded-2xl p-4 text-center">
              <div className="text-[2rem] mb-1">👥</div>
              <p className="font-['Fredoka_One',cursive] text-[1.8rem]">{stats.totalUsers}</p>
              <p className="text-[0.85rem] font-semibold opacity-90">Total usuarios</p>
            </div>
            <div className="bg-gradient-to-br from-[#16A34A] to-[#4ADE80] text-white rounded-2xl p-4 text-center">
              <div className="text-[2rem] mb-1">🧒</div>
              <p className="font-['Fredoka_One',cursive] text-[1.8rem]">{stats.activeNinos}</p>
              <p className="text-[0.85rem] font-semibold opacity-90">Niños</p>
            </div>
            <div className="bg-gradient-to-br from-[#F97316] to-[#FDE68A] text-gray-800 rounded-2xl p-4 text-center">
              <div className="text-[2rem] mb-1">👨‍👩‍👧</div>
              <p className="font-['Fredoka_One',cursive] text-[1.8rem]">{stats.activeTutors}</p>
              <p className="text-[0.85rem] font-semibold opacity-90">Tutores</p>
            </div>
            <div className="bg-gradient-to-br from-[#3B82F6] to-[#93C5FD] text-white rounded-2xl p-4 text-center">
              <div className="text-[2rem] mb-1">👤</div>
              <p className="font-['Fredoka_One',cursive] text-[1.8rem]">{stats.admins}</p>
              <p className="text-[0.85rem] font-semibold opacity-90">Admins</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 relative z-10">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex gap-2">
            {[
              { key: "tutores", label: "👨‍👩‍👧 Tutores y Estudiantes" },
              { key: "users",   label: "👥 Todos los Usuarios"       },
              { key: "content", label: "📝 Contenido Educativo"      },
            ].map(({ key, label }) => (
              <button key={key}
                onClick={() => setActiveTab(key as any)}
                className={`px-6 py-4 font-bold transition-all ${activeTab === key ? "text-[#6B21A8] border-b-4 border-[#6B21A8]" : "text-gray-600 hover:text-gray-800"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-8 relative z-10">

        {activeTab === "tutores" && (
          <div>
            <h2 className="font-['Fredoka_One',cursive] text-[1.8rem] text-[#3B0764] mb-6">Tutores y sus estudiantes</h2>
            {loading ? (
              <p className="text-center text-gray-500 py-8">Cargando...</p>
            ) : tutores.length === 0 ? (
              <div className="bg-white rounded-[24px] p-12 text-center shadow-[0_4px_20px_rgba(107,33,168,0.08)]">
                <p className="text-[3rem] mb-4">👨‍👩‍👧</p>
                <p className="font-bold text-gray-600 text-[1.1rem]">No hay tutores registrados aún</p>
              </div>
            ) : (
              <div className="space-y-6">
                {tutores.map((tutor) => (
                  <div key={tutor.id} className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(107,33,168,0.08)]">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-gradient-to-br from-[#6B21A8] to-[#7C3AED] text-white rounded-2xl p-4">
                        <span className="text-[2rem]">👨‍👩‍👧</span>
                      </div>
                      <div>
                        <h3 className="font-['Fredoka_One',cursive] text-[1.5rem] text-[#3B0764]">{tutor.nombre_completo}</h3>
                        <p className="text-gray-500 font-semibold text-[0.9rem]">
                          Registrado: {new Date(tutor.fecha_registro).toLocaleDateString('es-MX')} •{" "}
                          <span className="text-[#6B21A8]">{tutor.ninos.length} {tutor.ninos.length === 1 ? 'estudiante' : 'estudiantes'}</span>
                        </p>
                      </div>
                    </div>
                    {tutor.ninos.length === 0 ? (
                      <div className="bg-gray-50 rounded-2xl p-6 text-center">
                        <p className="text-gray-500 font-semibold">Este tutor aún no tiene estudiantes asignados</p>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-3 gap-4">
                        {tutor.ninos.map((nino) => (
                          <div key={nino.id} className="bg-gradient-to-br from-[#FAF7F0] to-[#e9d5ff] rounded-2xl p-5 flex items-center gap-4">
                            <div className="bg-white rounded-xl p-3 shadow-sm"><span className="text-[1.8rem]">🧒</span></div>
                            <div>
                              <p className="font-['Fredoka_One',cursive] text-[1.1rem] text-[#6B21A8]">{nino.nombre_completo}</p>
                              <p className="text-gray-500 font-semibold text-[0.8rem]">{new Date(nino.fecha_registro).toLocaleDateString('es-MX')}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "users" && (
          <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(107,33,168,0.08)]">
            <h2 className="font-['Fredoka_One',cursive] text-[1.8rem] text-[#3B0764] mb-6">Todos los usuarios</h2>
            {loading ? (
              <p className="text-center text-gray-500 py-8">Cargando...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 font-bold text-gray-700">Nombre</th>
                      <th className="text-left py-4 px-4 font-bold text-gray-700">Rol</th>
                      <th className="text-left py-4 px-4 font-bold text-gray-700">Tutor asignado</th>
                      <th className="text-left py-4 px-4 font-bold text-gray-700">Fecha registro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {perfiles.map((perfil) => (
                      <tr key={perfil.id} className="border-b border-gray-100 hover:bg-[#FAF7F0] transition-colors">
                        <td className="py-4 px-4 font-semibold">{perfil.nombre_completo}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-[0.85rem] font-bold ${
                            perfil.tipo_usuario === 'niño'  ? 'bg-purple-100 text-purple-700' :
                            perfil.tipo_usuario === 'tutor' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {perfil.tipo_usuario === 'niño' ? '🧒 Niño' : perfil.tipo_usuario === 'tutor' ? '👨‍👩‍👧 Tutor' : '👤 Admin'}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-semibold text-gray-600">
                          {perfil.tutor ? `👨‍👩‍👧 ${perfil.tutor.nombre_completo}` : '—'}
                        </td>
                        <td className="py-4 px-4 font-semibold text-gray-600">
                          {new Date(perfil.fecha_registro).toLocaleDateString('es-MX')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "content" && (
          <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(107,33,168,0.08)]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Fredoka_One',cursive] text-[1.8rem] text-[#3B0764]">Contenido educativo</h2>
              <button className="bg-[#16A34A] hover:bg-[#22C55E] text-white font-bold px-6 py-3 rounded-xl transition-all">
                + Crear contenido
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {content.map((item) => (
                <div key={item.id} className="bg-[#FAF7F0] rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-['Fredoka_One',cursive] text-[1.3rem] text-[#6B21A8]">{item.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-[0.8rem] font-bold ${item.status === 'Publicado' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[0.85rem] font-bold">{item.type}</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-[0.85rem] font-bold">{item.difficulty}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-white hover:bg-gray-50 border-2 border-[#6B21A8] text-[#6B21A8] font-bold py-2 rounded-xl transition-all">✏️ Editar</button>
                    <button className="flex-1 bg-[#6B21A8] hover:bg-[#7C3AED] text-white font-bold py-2 rounded-xl transition-all">👁️ Vista previa</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}