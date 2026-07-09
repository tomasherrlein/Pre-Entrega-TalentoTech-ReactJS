import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
  } = useCart();

  const vaciarCarrito = () => {
    clearCart();
    toast.info('Vaciaste el carrito.');
  };

  const finalizarCompra = () => {
    clearCart();
    toast.success('¡Compra realizada con éxito!');
  };

  if (cart.length === 0) {
    return (
      <div className="text-center text-muted py-16 px-6">
        <title>Player 2 — Carrito</title>
        <h1 className="text-xl font-semibold text-text mb-3">El carrito está vacío</h1>
        <p>Agregá productos para continuar la compra.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <title>Player 2 — Carrito</title>
      <h1 className="text-center text-2xl font-bold text-text mb-6">Carrito de Compras</h1>
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 bg-surface border border-border rounded-card p-3 mb-3"
        >
          <img src={item.imagen} alt={item.nombre} className="w-20 h-20 object-cover rounded-card" />
          <div>
            <h4 className="font-semibold text-text mb-1">{item.nombre}</h4>
            <div className="flex items-center gap-2.5 my-1.5">
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="w-7 h-7 border border-border rounded-card text-text hover:bg-surface-2 transition-colors"
              >
                -
              </button>
              <span className="min-w-5 text-center text-text">{item.quantity}</span>
              <button
                onClick={() => increaseQuantity(item.id)}
                disabled={item.quantity >= item.stock}
                className="w-7 h-7 border border-border rounded-card text-text hover:bg-surface-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
            <p className="text-muted text-sm">Precio unitario: ${item.precio.toLocaleString('es-AR')}</p>
            <p className="text-muted text-sm">Subtotal: ${(item.precio * item.quantity).toLocaleString('es-AR')}</p>
          </div>
          <button
            className="ml-auto text-xl p-1.5 rounded-card hover:bg-surface-2 transition-colors"
            onClick={() => removeFromCart(item.id)}
            title="Eliminar del carrito"
          >
            🗑️
          </button>
        </div>
      ))}
      <hr className="my-6 border-border" />
      <h3 className="text-right text-lg font-semibold text-text mb-4">Total a pagar: ${getCartTotal().toLocaleString('es-AR')}</h3>
      <div className="flex gap-3 justify-end">
        <button
          className="border border-border text-text px-5 py-2.5 rounded-card hover:bg-surface-2 transition-colors"
          onClick={vaciarCarrito}
        >
          Vaciar carrito
        </button>
        <button
          className="bg-neon text-bg font-semibold px-5 py-2.5 rounded-card hover:bg-neon-bright transition-colors"
          onClick={finalizarCompra}
        >
          Comprar
        </button>
      </div>
    </div>
  );
}

export default Cart;
