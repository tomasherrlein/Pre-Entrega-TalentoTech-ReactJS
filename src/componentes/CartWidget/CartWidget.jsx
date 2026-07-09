import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

function CartWidget() {
  const { getCartQuantity } = useCart();
  const totalItems = getCartQuantity();

  return (
    <Link to="/carrito" className="relative inline-flex items-center text-xl text-text hover:text-neon transition-colors">
      <FiShoppingCart />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-3 bg-brand text-text text-xs font-bold rounded-full px-1.5 py-0.5">
          {totalItems}
        </span>
      )}
    </Link>
  );
}

export default CartWidget;
