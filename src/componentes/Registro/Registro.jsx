import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { registrar } = useAuth();
  const navigate = useNavigate();

  const manejarSubmit = async (evento) => {
    evento.preventDefault();
    setError(null);
    try {
      const credenciales = await registrar(email, password);
      await setDoc(doc(db, 'usuarios', credenciales.user.uid), {
        nombre,
        email,
        rol: 'user',
      });
      toast.success('¡Cuenta creada con éxito!');
      navigate('/');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Ese email ya está registrado.');
      } else if (err.code === 'auth/weak-password') {
        setError('La contraseña debe tener al menos 6 caracteres.');
      } else if (err.code === 'auth/invalid-email') {
        setError('El email no es válido.');
      } else {
        setError('No se pudo crear la cuenta. Intentá de nuevo.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <title>Player 2 — Crear cuenta</title>
      <div className="bg-surface border border-border rounded-card p-8">
        <h1 className="text-2xl font-bold text-text mb-6 text-center">Crear cuenta</h1>

        <form onSubmit={manejarSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-muted mb-1">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full bg-bg border border-border rounded-card px-3 py-2 text-text focus:border-brand outline-none"
              placeholder="Tu nombre"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-bg border border-border rounded-card px-3 py-2 text-text focus:border-brand outline-none"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-bg border border-border rounded-card px-3 py-2 text-text focus:border-brand outline-none"
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            className="bg-brand hover:bg-brand-dark text-text font-medium py-2.5 rounded-card transition-colors"
          >
            Registrarme
          </button>
        </form>

        <p className="text-sm text-muted text-center mt-5">
          ¿Ya tenés cuenta?{' '}
          <Link to="/login" className="text-neon hover:underline">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registro;
