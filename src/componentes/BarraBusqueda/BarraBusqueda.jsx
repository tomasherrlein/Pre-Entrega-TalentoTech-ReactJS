import { FiSearch } from 'react-icons/fi';
import { useBusqueda } from '../../context/BusquedaContext';

function BarraBusqueda() {
  const { busqueda, setBusqueda } = useBusqueda();

  return (
    <div className="max-w-md mx-auto px-6 mb-8">
      <div className="flex items-center gap-2 bg-surface border border-border rounded-card px-3 py-2 focus-within:border-brand">
        <FiSearch className="text-muted" />
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar productos..."
          className="w-full bg-transparent text-text outline-none"
        />
      </div>
    </div>
  );
}

export default BarraBusqueda;
