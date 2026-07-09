import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import CartWidget from '../CartWidget/CartWidget';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const cerrarMenu = () => setMenuAbierto(false);

  const manejarLogout = () => {
    logout();
    cerrarMenu();
    navigate('/');
  };

  const enlaces = (
    <>
      <Link to="/" onClick={cerrarMenu} className="text-text hover:text-neon transition-colors">Inicio</Link>
      <Link to="/productos" onClick={cerrarMenu} className="text-text hover:text-neon transition-colors">Productos</Link>
      {usuario?.rol === 'admin' && (
        <Link to="/dashboard" onClick={cerrarMenu} className="text-text hover:text-neon transition-colors">Dashboard</Link>
      )}
      <CartWidget />
      {usuario ? (
        <>
          <span className="bg-surface-2 border border-border rounded-sm px-2.5 py-1 text-sm text-text">{usuario.nombre}</span>
          <button onClick={manejarLogout} className="text-text hover:text-neon transition-colors">Salir</button>
        </>
      ) : (
        <Link to="/login" onClick={cerrarMenu} className="text-neon hover:underline">Ingresar</Link>
      )}
    </>
  );

  return (
    <header className="bg-surface border-b border-border px-8 py-6">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        <Link to="/" className="font-arcade text-base text-brand text-glow">
          Player 2
        </Link>

        <nav className="hidden md:flex items-center gap-8">{enlaces}</nav>

        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="md:hidden text-text text-2xl"
          aria-label="Abrir menú"
        >
          {menuAbierto ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {menuAbierto && (
        <nav className="md:hidden flex flex-col items-center gap-4 pt-4">{enlaces}</nav>
      )}
    </header>
  );
}

export default Header;
