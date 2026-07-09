import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const manejarSubmit = async (evento) => {
    evento.preventDefault();
    setError(null);
    try {
      await login(email, password);
      toast.success('¡Bienvenido de vuelta!');
      navigate('/');
    } catch (err) {
      if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/user-not-found'
      ) {
        setError('Email o contraseña incorrectos.');
      } else if (err.code === 'auth/invalid-email') {
        setError('El email no es válido.');
      } else {
        setError('No se pudo iniciar sesión. Intentá de nuevo.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <title>Player 2 — Ingresar</title>
      <div className="bg-surface border border-border rounded-card p-8">
        <h1 className="text-2xl font-bold text-text mb-6 text-center">Iniciar sesión</h1>

        <form onSubmit={manejarSubmit} className="flex flex-col gap-4">
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
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            className="bg-brand hover:bg-brand-dark text-text font-medium py-2.5 rounded-card transition-colors"
          >
            Ingresar
          </button>
        </form>

        <p className="text-sm text-muted text-center mt-5">
          ¿No tenés cuenta?{' '}
          <Link to="/registro" className="text-neon hover:underline">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
