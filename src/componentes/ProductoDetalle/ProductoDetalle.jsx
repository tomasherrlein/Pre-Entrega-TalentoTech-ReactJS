import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useCart } from '../../context/CartContext';

function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      const snap = await getDoc(doc(db, 'productos', id));
      if (snap.exists()) setProducto({ id: snap.id, ...snap.data() });
      setCargando(false);
    };
    cargar();
  }, [id]);

  if (cargando) {
    return <p className="text-center text-muted py-10">Cargando detalle del producto...</p>;
  }

  if (!producto) {
    return <p className="text-center text-muted py-10">Producto no encontrado.</p>;
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
      toast.error(`No hay stock suficiente. El máximo disponible es ${producto.stock}.`);
      return;
    }

    addToCart(producto, cantidad);
    toast.success(`Agregaste ${cantidad} unidad(es) de ${producto.nombre} al carrito.`);
  };

  return (
    <div className="flex flex-wrap gap-8 justify-center items-start px-6 py-10 max-w-4xl mx-auto">
      <title>{`${producto.nombre} — Player 2`}</title>
      <meta name="description" content={producto.descripcion} />
      <img src={producto.imagen} alt={producto.nombre} className="w-full sm:w-80 rounded-card object-contain" />
      <div className="flex-1 min-w-64">
        <h1 className="text-2xl font-bold text-text mb-3">{producto.nombre}</h1>
        <span className="inline-block text-xs text-neon border border-border rounded-full px-2 py-0.5 mb-3">
          {producto.categoria}
        </span>
        <p className="text-brand text-2xl font-bold mb-4">${producto.precio.toLocaleString('es-AR')}</p>
        <p className="text-muted mb-4">{producto.descripcion}</p>
        <p className="text-muted text-sm mb-4">Stock disponible: {producto.stock}</p>

        <div className="flex items-center gap-3 my-4">
          <button
            onClick={decrementar}
            className="w-8 h-8 border border-border rounded-card text-text hover:bg-surface-2 transition-colors"
          >
            -
          </button>
          <span className="min-w-6 text-center text-text">{cantidad}</span>
          <button
            onClick={incrementar}
            className="w-8 h-8 border border-border rounded-card text-text hover:bg-surface-2 transition-colors"
          >
            +
          </button>
        </div>

        <button
          className="bg-neon text-bg font-semibold px-6 py-3 rounded-card hover:bg-neon-bright transition-colors"
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductoDetalle;
