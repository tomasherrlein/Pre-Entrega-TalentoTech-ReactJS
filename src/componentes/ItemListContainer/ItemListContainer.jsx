import { useState, useEffect } from 'react';
import ItemList from '../ItemList/ItemList';
import styles from './ItemListContainer.module.css';

function ItemListContainer({ Mensaje }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/productos.json')
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error('No se pudo cargar el catálogo');
        return respuesta.json();
      })
      .then((datos) => setProductos(datos))
      .catch((error) => setError(error.message))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <p className={styles.mensaje}>Cargando productos...</p>;
  if (error) return <p className={styles.mensaje}>Error: {error}</p>;

  return (
    <div>
      <h1 className={styles.titulo}>{Mensaje}</h1>
      <ItemList productos={productos} />
    </div>
  );
}

export default ItemListContainer;
