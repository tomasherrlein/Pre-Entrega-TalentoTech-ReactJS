import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './CartWidget.module.css';

function CartWidget() {
  const { getCartQuantity } = useCart();
  const totalItems = getCartQuantity();

  return (
    <Link to="/carrito" className={styles.widget}>
      🛒
      {totalItems > 0 && <span className={styles.contador}>{totalItems}</span>}
    </Link>
  );
}

export default CartWidget;
