import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function RutasProtegidas({ children, soloAdmin = false }) {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (soloAdmin && usuario.rol !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RutasProtegidas;
