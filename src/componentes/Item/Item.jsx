import { Link } from 'react-router-dom';

function Item({ id, nombre, precio, stock, categoria, imagen }) {
  return (
    <div className="bg-surface border border-border rounded-card p-5 w-64 text-center hover:border-brand transition-colors">
      <div className="flex justify-center mb-4">
        <img src={imagen} alt={nombre} className="w-40 h-40 object-contain" />
      </div>
      <span className="inline-block text-xs text-neon border border-border rounded-full px-2 py-0.5 mb-2">
        {categoria}
      </span>
      <h3 className="text-base font-semibold text-text mb-2">{nombre}</h3>
      <p className="text-brand text-lg font-bold mb-1">${precio.toLocaleString('es-AR')}</p>
      <p className="text-muted text-sm mb-4">Stock disponible: {stock}</p>
      <Link
        to={`/producto/${id}`}
        className="inline-block bg-brand hover:bg-brand-dark text-text font-medium px-4 py-2 rounded-card text-sm transition-colors"
      >
        Ver detalle
      </Link>
    </div>
  );
}

export default Item;
