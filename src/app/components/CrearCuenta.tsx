import { useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function CrearCuenta() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState<'niño' | 'tutor' | 'admin'>('niño');
  const [cargando, setCargando] = useState(false);

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Intentando registrar a:", correo);
    setCargando(true);

    try {
      // 1. Registro en Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: correo,
        password: contrasena,
      });

      if (authError) throw authError;

      // 2. Guardar el perfil
      if (authData.user) {
        const { error: perfilError } = await supabase
          .from('perfiles')
          .insert([{
            id: authData.user.id,
            nombre_completo: nombre,
            tipo_usuario: tipoUsuario,
          }]);

        if (perfilError) throw perfilError;
        alert('¡Registro exitoso!');
      }
    } catch (error: any) {
      console.error("Error completo:", error);
      alert(error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <form onSubmit={handleRegistro}>
      <h2>Crear cuenta 🌟</h2>
      <input type="text" placeholder="Tu nombre" onChange={(e) => setNombre(e.target.value)} required />
      <input type="email" placeholder="tu@email.com" onChange={(e) => setCorreo(e.target.value)} required />
      <input type="password" placeholder="********" onChange={(e) => setContrasena(e.target.value)} required />
      
      <div>
        <button type="button" onClick={() => setTipoUsuario('niño')}>👦 Niño</button>
        <button type="button" onClick={() => setTipoUsuario('tutor')}>👨‍👩‍👧 Tutor</button>
        <button type="button" onClick={() => setTipoUsuario('admin')}>👤 Admin</button>
      </div>

      {/* ESTE ES EL BOTÓN QUE DISPARA EL SUBMIT */}
      <button type="submit" disabled={cargando}>
        {cargando ? 'Registrando...' : 'Crear cuenta 🚀'}
      </button>
    </form>
  );
}