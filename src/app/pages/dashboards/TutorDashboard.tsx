import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import DinoLettersBg from "../../components/DinoLettersBg";

interface Nino {
  id: string;
  nombre_completo: string;
  fecha_registro: string;
}

export default function TutorDashboard() {
  const { user, logout, registerNino } = useAuth();
  const navigate = useNavigate();
  const [ninos, setNinos] = useState<Nino[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState('');

  const handleLogout = () => { logout(); navigate("/"); };

  useEffect(() => {
    if (!user) return;
    const fetchNinos = async () => {
      const { data, error } = await supabase
        .from('perfiles')
        .select('id, nombre_completo, fecha_registro')
        .eq('tutor_id', user.id)
        .eq('tipo_usuario', 'niño');
      if (!error && data) setNinos(data);
      setLoading(false);
    };
    fetchNinos();
  }, [user]);

  const handleAddNino = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(''); setFormSuccess('');
    if (!formName || !formEmail || !formPassword) { setFormError('Completa todos los campos'); return; }
    if (formPassword.length < 6) { setFormError('La contraseña debe tener al menos 6 caracteres'); return; }
    setFormLoading(true);
    try {
      await registerNino(formName, formEmail, formPassword);
      setFormSuccess(`¡${formName} fue registrado exitosamente!`);
      setFormName(''); setFormEmail(''); setFormPassword('');
      const { data } = await supabase
        .from('perfiles')
        .select('id, nombre_completo, fecha_registro')
        .eq('tutor_id', user!.id)
        .eq('tipo_usuario', 'niño');
      if (data) setNinos(data);
    } catch (err: any) {
      if (err.message?.includes('already registered')) setFormError('Ese correo ya está registrado.');
      else setFormError(err.message || 'Error al registrar el niño');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c7f2a4] via-[#bae6fd] to-[#e9d5ff] relative overflow-hidden">
      <DinoLettersBg />

      {/* Header */}
      <header className="bg-white shadow-[0_2px_12px_rgba(107,33,168,0.10)] px-8 py-4 relative z-10">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span className="text-[2rem]">🦕</span>
            <span className="font-['Fredoka_One',cursive] text-[1.5rem] text-[#6B21A8]">
              LETRA<span className="text-[#16A34A]">SAURIO</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-bold text-gray-800">Panel de Tutor 👨‍👩‍👧</p>
              <p className="text-[0.85rem] text-gray-600 font-semibold">{user?.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white border-2 border-[#6B21A8] text-[#6B21A8] font-bold px-4 py-2 rounded-full hover:bg-[#6B21A8] hover:text-white transition-all"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-8 py-12 relative z-10">
        <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(107,33,168,0.08)] mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-['Fredoka_One',cursive] text-[1.8rem] text-[#3B0764]">🧒 Mis estudiantes</h2>
            <button
              onClick={() => { setShowModal(true); setFormSuccess(''); setFormError(''); }}
              className="bg-[#6B21A8] hover:bg-[#7C3AED] text-white font-bold px-6 py-3 rounded-xl transition-all"
            >
              + Agregar niño
            </button>
          </div>

          {loading ? (
            <p className="text-center text-gray-500 py-8">Cargando...</p>
          ) : ninos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[3rem] mb-4">👶</p>
              <p className="font-bold text-gray-600 text-[1.1rem]">Aún no tienes estudiantes registrados</p>
              <p className="text-gray-500 mt-2">Haz clic en "Agregar niño" para comenzar</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {ninos.map((nino) => (
                <div key={nino.id} className="bg-gradient-to-br from-[#6B21A8] to-[#7C3AED] text-white rounded-2xl p-6">
                  <div className="text-[2.5rem] mb-3">🧒</div>
                  <h3 className="font-['Fredoka_One',cursive] text-[1.3rem] mb-1">{nino.nombre_completo}</h3>
                  <p className="text-[0.85rem] opacity-80 mb-4">
                    Registrado: {new Date(nino.fecha_registro).toLocaleDateString('es-MX')}
                  </p>
                  <Link
                    to={`/progreso-alumno/${nino.id}`}
                    className="block text-center bg-white/20 hover:bg-white/30 text-white font-bold py-2 rounded-xl transition-all no-underline"
                  >
                    Ver progreso →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal agregar niño */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-[24px] p-8 w-full max-w-md shadow-2xl">
            <h3 className="font-['Fredoka_One',cursive] text-[1.8rem] text-[#3B0764] mb-6 text-center">
              Registrar nuevo niño 🧒
            </h3>
            {formSuccess ? (
              <div className="text-center py-4">
                <p className="text-[3rem] mb-4">🎉</p>
                <p className="font-bold text-green-700 text-[1.1rem] mb-6">{formSuccess}</p>
                <button onClick={() => setShowModal(false)} className="bg-[#6B21A8] text-white font-bold px-8 py-3 rounded-xl">
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={handleAddNino} className="space-y-4">
                {formError && (
                  <div className="bg-red-50 border-2 border-red-300 text-red-700 p-3 rounded-xl font-semibold text-[0.9rem]">
                    ⚠️ {formError}
                  </div>
                )}
                <div>
                  <label className="block font-bold text-gray-700 mb-2">Nombre del niño</label>
                  <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#6B21A8] focus:outline-none font-semibold"
                    placeholder="Nombre completo" />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-2">Correo electrónico</label>
                  <input type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#6B21A8] focus:outline-none font-semibold"
                    placeholder="correo@gmail.com" />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-2">Contraseña</label>
                  <input type="password" value={formPassword} onChange={(e) => setFormPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#6B21A8] focus:outline-none font-semibold"
                    placeholder="••••••••" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50">
                    Cancelar
                  </button>
                  <button type="submit" disabled={formLoading}
                    className="flex-1 bg-[#6B21A8] hover:bg-[#7C3AED] disabled:bg-gray-400 text-white font-bold py-3 rounded-xl transition-all">
                    {formLoading ? 'Registrando...' : 'Registrar niño 🚀'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}