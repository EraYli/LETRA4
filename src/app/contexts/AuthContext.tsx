import { supabase } from '../../supabaseClient';
import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'niño' | 'tutor' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  registerNino: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('letrasaurio_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (authError) throw authError;
    if (!data.user) throw new Error('No se pudo crear el usuario');

    const { error: dbError } = await supabase
      .from('perfiles')
      .insert([{
        id: data.user.id,
        nombre_completo: name,
        tipo_usuario: role,
      }]);

    if (dbError) throw dbError;

    const newUser: User = {
      id: data.user.id,
      name,
      email,
      role: role || 'niño',
    };
    setUser(newUser);
    localStorage.setItem('letrasaurio_user', JSON.stringify(newUser));
  };

  // Función especial para que el tutor registre un niño
  const registerNino = async (name: string, email: string, password: string) => {
    console.log('Rol del usuario:', user?.role);
    if (!user || user.role !== 'tutor') throw new Error('Solo los tutores pueden registrar niños');

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (authError) throw authError;
    if (!data.user) throw new Error('No se pudo crear el niño');

    const { error: dbError } = await supabase
      .from('perfiles')
      .insert([{
        id: data.user.id,
        nombre_completo: name,
        tipo_usuario: 'niño',
        tutor_id: user.id,
      }]);

    if (dbError) throw dbError;
  };

  const login = async (email: string, password: string, _role: UserRole) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;
    if (!data.user) throw new Error('No se encontró el usuario');

    const { data: perfil } = await supabase
      .from('perfiles')
      .select('nombre_completo, tipo_usuario')
      .eq('id', data.user.id)
      .single();

    const loggedUser: User = {
      id: data.user.id,
      name: perfil?.nombre_completo || data.user.email?.split('@')[0] || 'Usuario',
      email: data.user.email || '',
      role: perfil?.tipo_usuario || 'niño',
    };
    setUser(loggedUser);
    localStorage.setItem('letrasaurio_user', JSON.stringify(loggedUser));
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('letrasaurio_user');
  };

  return (
    <AuthContext.Provider value={{
      user, login, register, registerNino, logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}