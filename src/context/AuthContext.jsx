import { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  const registrar = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    const desuscribir = onAuthStateChanged(auth, async (usuarioActual) => {
      if (usuarioActual) {
        const ref = doc(db, 'usuarios', usuarioActual.uid);
        const snap = await getDoc(ref);
        const datos = snap.exists() ? snap.data() : {};
        setUsuario({
          uid: usuarioActual.uid,
          email: usuarioActual.email,
          nombre: datos.nombre || 'Jugador',
          rol: datos.rol || 'user',
        });
      } else {
        setUsuario(null);
      }
      setCargando(false);
    });

    return () => desuscribir();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, cargando, registrar, login, logout }}>
      {!cargando && children}
    </AuthContext.Provider>
  );
};
