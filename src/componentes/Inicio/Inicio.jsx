import { Link } from 'react-router-dom';
import { useProductos } from '../../context/ProductosContext';
import ItemList from '../ItemList/ItemList';

function Inicio() {
  const { productos } = useProductos();
  const destacados = productos.slice(0, 3);

  return (
    <div>
      <title>Player 2 — Tienda Retro Gaming</title>
      <meta name="description" content="Player 2: consolas, cartuchos, controles y coleccionables retro gaming." />
      <section className="text-center px-6 pt-20 pb-16">
        <h1 className="font-arcade text-xl sm:text-2xl text-text text-glow mb-4">Bienvenido a Player 2</h1>
        <p className="text-muted text-lg mb-6">Tu tienda retro gaming con los mejores productos al mejor precio.</p>
        <Link
          to="/productos"
          className="inline-block bg-brand hover:bg-brand-dark text-text font-medium px-7 py-3 rounded-card transition-colors"
        >
          Ver productos
        </Link>
      </section>

      <section className="px-6 pb-16">
        <h2 className="text-center text-2xl font-bold text-text mb-8">Productos destacados</h2>
        <ItemList productos={destacados} />
      </section>
    </div>
  );
}

export default Inicio;
