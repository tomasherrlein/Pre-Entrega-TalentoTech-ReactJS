import { useCart } from '../../context/CartContext';
import styles from './Cart.module.css';

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className={styles.vacio}>
        <h1>El carrito está vacío</h1>
        <p>Agregá productos para continuar la compra.</p>
      </div>
    );
  }

  return (
    <div className={styles.carrito}>
      <h1>Carrito de Compras</h1>
      {cart.map((item) => (
        <div key={item.id} className={styles.item}>
          <img src={item.imagen} alt={item.nombre} className={styles.imagen} />
          <div className={styles.datos}>
            <h4>{item.nombre}</h4>
            <div className={styles.contador}>
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button
                onClick={() => increaseQuantity(item.id)}
                disabled={item.quantity >= item.stock}
              >
                +
              </button>
            </div>
            <p>Precio unitario: ${item.precio}</p>
            <p>Subtotal: ${item.precio * item.quantity}</p>
          </div>
          <button
            className={styles.eliminar}
            onClick={() => removeFromCart(item.id)}
            title="Eliminar del carrito"
          >
            🗑️
          </button>
        </div>
      ))}
      <hr className={styles.separador} />
      <h3 className={styles.total}>Total a pagar: ${getCartTotal()}</h3>
      <button className={styles.boton} onClick={clearCart}>Vaciar carrito</button>
    </div>
  );
}

export default Cart;
