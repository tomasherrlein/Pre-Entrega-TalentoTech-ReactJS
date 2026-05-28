import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ItemList from '../ItemList/ItemList';
import styles from './Inicio.module.css';

function Inicio() {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    fetch('/data/productos.json')
      .then((respuesta) => respuesta.json())
      .then((datos) => setDestacados(datos.slice(0, 3)))
      .catch((error) => console.error('Error al cargar destacados:', error));
  }, []);

  return (
    <div className={styles.inicio}>
      <section className={styles.bienvenida}>
        <h1>Bienvenido a TalentoLab</h1>
        <p>Tu tienda de tecnología con los mejores productos al mejor precio.</p>
        <Link to="/productos" className={styles.boton}>Ver productos</Link>
      </section>

      <section className={styles.destacados}>
        <h2>Productos destacados</h2>
        <ItemList productos={destacados} />
      </section>
    </div>
  );
}

export default Inicio;
