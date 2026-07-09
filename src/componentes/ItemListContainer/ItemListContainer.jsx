import { useProductos } from '../../context/ProductosContext';
import { useBusqueda } from '../../context/BusquedaContext';
import { usePaginacion } from '../../hooks/usePaginacion';
import ItemList from '../ItemList/ItemList';
import BarraBusqueda from '../BarraBusqueda/BarraBusqueda';
import Paginacion from '../Paginacion/Paginacion';

function ItemListContainer({ Mensaje }) {
  const { productos, cargando, error } = useProductos();
  const { busqueda } = useBusqueda();

  const filtrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const { itemsPagina, paginaActual, totalPaginas, setPaginaActual } = usePaginacion(filtrados, 6);

  if (cargando) return <p className="text-center text-muted text-lg py-10">Cargando productos...</p>;
  if (error) return <p className="text-center text-muted text-lg py-10">Error: {error}</p>;

  return (
    <div>
      <title>Player 2 — Productos</title>
      <h1 className="text-center text-2xl font-bold text-text mt-10 mb-6">{Mensaje}</h1>
      <BarraBusqueda />

      {filtrados.length === 0 ? (
        <p className="text-center text-muted py-10">No se encontraron productos.</p>
      ) : (
        <>
          <ItemList productos={itemsPagina} />
          <Paginacion paginaActual={paginaActual} totalPaginas={totalPaginas} onCambiar={setPaginaActual} />
        </>
      )}
    </div>
  );
}

export default ItemListContainer;
