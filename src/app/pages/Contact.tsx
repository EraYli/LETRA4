import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroBg from "../components/HeroBg";
import LettersBg from "../components/LettersBg";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "", email: "", subject: "", message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
    else if (formData.name.trim().length < 3) newErrors.name = "El nombre debe tener al menos 3 caracteres";
    if (!formData.email.trim()) newErrors.email = "El correo electrónico es requerido";
    else if (!validateEmail(formData.email)) newErrors.email = "Ingresa un correo electrónico válido";
    if (!formData.subject.trim()) newErrors.subject = "El asunto es requerido";
    if (!formData.message.trim()) newErrors.message = "El mensaje es requerido";
    else if (formData.message.trim().length < 10) newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Nunito',sans-serif]">
      <Header />

      <section className="py-20 px-8 bg-gradient-to-br from-[#c7f2a4] via-[#bae6fd] to-[#e9d5ff] relative overflow-hidden">
        <HeroBg />
        <div className="max-w-[1100px] mx-auto text-center relative z-10">
          <h1 className="font-['Fredoka_One',cursive] text-[3rem] text-[#3B0764] mb-6">
            Contáctanos 📧
          </h1>
          <p className="text-[1.1rem] text-gray-700 font-semibold max-w-[700px] mx-auto leading-relaxed">
            ¿Tienes preguntas o sugerencias? Estamos aquí para ayudarte.
          </p>
        </div>
      </section>

      <section className="py-16 px-8 bg-white relative overflow-hidden">
        <LettersBg />
        <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-12 relative z-10">
          <div className="bg-[#FAF7F0] rounded-[24px] p-8 shadow-[0_4px_20px_rgba(107,33,168,0.08)]">
            <h2 className="font-['Fredoka_One',cursive] text-[1.8rem] text-[#6B21A8] mb-6">
              Envíanos un mensaje
            </h2>

            {submitted && (
              <div className="bg-[#16A34A] text-white p-4 rounded-2xl mb-6 font-semibold">
                ✅ ¡Mensaje enviado con éxito! Te responderemos pronto.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-bold text-gray-700 mb-2">Nombre completo *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-[#6B21A8] focus:outline-none font-semibold transition-colors`}
                  placeholder="Tu nombre" />
                {errors.name && <p className="text-red-500 text-[0.85rem] mt-1 font-semibold">⚠️ {errors.name}</p>}
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-2">Correo electrónico *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-[#6B21A8] focus:outline-none font-semibold transition-colors`}
                  placeholder="tu@email.com" />
                {errors.email && <p className="text-red-500 text-[0.85rem] mt-1 font-semibold">⚠️ {errors.email}</p>}
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-2">Asunto *</label>
                <select name="subject" value={formData.subject} onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${errors.subject ? 'border-red-500' : 'border-gray-300'} focus:border-[#6B21A8] focus:outline-none font-semibold transition-colors`}>
                  <option value="">Selecciona un asunto</option>
                  <option value="soporte">Soporte técnico</option>
                  <option value="sugerencia">Sugerencia</option>
                  <option value="colaboracion">Colaboración educativa</option>
                  <option value="otro">Otro</option>
                </select>
                {errors.subject && <p className="text-red-500 text-[0.85rem] mt-1 font-semibold">⚠️ {errors.subject}</p>}
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-2">Mensaje *</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={5}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:border-[#6B21A8] focus:outline-none font-semibold transition-colors resize-none`}
                  placeholder="Escribe tu mensaje aquí..." />
                {errors.message && <p className="text-red-500 text-[0.85rem] mt-1 font-semibold">⚠️ {errors.message}</p>}
              </div>
              <button type="submit"
                className="w-full bg-[#6B21A8] hover:bg-[#7C3AED] text-white font-['Fredoka_One',cursive] text-[1.1rem] py-4 rounded-xl transition-all shadow-[0_4px_15px_rgba(107,33,168,0.3)]">
                Enviar mensaje 📤
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#7C3AED] to-[#A855F7] text-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(107,33,168,0.15)]">
              <h3 className="font-['Fredoka_One',cursive] text-[1.5rem] mb-4">📍 Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-[1.5rem]">✉️</span>
                  <div>
                    <p className="font-bold mb-1">Correo electrónico</p>
                    <p className="opacity-90">letrasaurio@ujat.mx</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[1.5rem]">📍</span>
                  <div>
                    <p className="font-bold mb-1">Ubicación</p>
                    <p className="opacity-90">Cunduacán, Tabasco, México</p>
                    <p className="opacity-90 text-[0.9rem] mt-1">UJAT - DACTI</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[1.5rem]">⏰</span>
                  <div>
                    <p className="font-bold mb-1">Horario de atención</p>
                    <p className="opacity-90">Lunes a Viernes</p>
                    <p className="opacity-90">9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF7F0] rounded-[24px] p-8 shadow-[0_4px_20px_rgba(107,33,168,0.08)]">
              <h3 className="font-['Fredoka_One',cursive] text-[1.5rem] text-[#16A34A] mb-4">🤝 Síguenos en redes</h3>
              <div className="flex gap-3">
                <a href="#" className="w-12 h-12 bg-[#1877F2] rounded-full flex items-center justify-center text-white text-[1.2rem] hover:scale-110 transition-transform">f</a>
                <a href="#" className="w-12 h-12 bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-full flex items-center justify-center text-[1.2rem] hover:scale-110 transition-transform">📷</a>
                <a href="#" className="w-12 h-12 bg-[#FF0000] rounded-full flex items-center justify-center text-white text-[1.2rem] hover:scale-110 transition-transform">▶</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}