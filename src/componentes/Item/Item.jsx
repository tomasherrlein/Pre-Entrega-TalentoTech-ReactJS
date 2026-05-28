import { Link } from 'react-router-dom';
import styles from './Item.module.css';

function Item({ id, nombre, precio, stock, imagen }) {
  return (
    <div className={styles.card}>
      <img src={imagen} alt={nombre} className={styles.imagen} />
      <h3 className={styles.nombre}>{nombre}</h3>
      <p className={styles.precio}>${precio}</p>
      <p className={styles.stock}>Stock disponible: {stock}</p>
      <Link to={`/producto/${id}`} className={styles.boton}>Ver detalle</Link>
    </div>
  );
}

export default Item;
