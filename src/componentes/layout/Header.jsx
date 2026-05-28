import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>TalentoLab</Link>
      <nav>
        <ul className={styles.lista}>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><CartWidget /></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
