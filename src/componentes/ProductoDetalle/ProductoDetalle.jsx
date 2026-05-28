import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './ProductoDetalle.module.css';

function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    fetch('/data/productos.json')
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        const encontrado = datos.find((p) => p.id === parseInt(id));
        setProducto(encontrado);
      })
      .catch((error) => console.error('Error al cargar el producto:', error));
  }, [id]);

  if (!producto) {
    return <p className={styles.mensaje}>Cargando detalle del producto...</p>;
  }

  const incrementar = () => {
    if (cantidad < producto.stock) setCantidad(cantidad + 1);
  };

  const decrementar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const handleAddToCart = () => {
    const enCarrito = cart.find((item) => item.id === producto.id);
    const cantidadEnCarrito = enCarrito ? enCarrito.quantity : 0;

    if (cantidadEnCarrito + cantidad > producto.stock) {
      alert(
        `No hay stock suficiente. Ya tenés ${cantidadEnCarrito} en el carrito y el stock máximo es ${producto.stock}.`
      );
      return;
    }

    addToCart(producto, cantidad);
    alert(`Agregaste ${cantidad} unidad(es) de ${producto.nombre} al carrito.`);
  };

  return (
    <div className={styles.detalle}>
      <img src={producto.imagen} alt={producto.nombre} className={styles.imagen} />
      <div className={styles.info}>
        <h1>{producto.nombre}</h1>
        <p className={styles.precio}>${producto.precio}</p>
        <p className={styles.descripcion}>{producto.descripcion}</p>
        <p className={styles.stock}>Stock disponible: {producto.stock}</p>

        <div className={styles.contador}>
          <button onClick={decrementar}>-</button>
          <span>{cantidad}</span>
          <button onClick={incrementar}>+</button>
        </div>

        <button className={styles.boton} onClick={handleAddToCart}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductoDetalle;
