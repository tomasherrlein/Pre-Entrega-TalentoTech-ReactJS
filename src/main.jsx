import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ProductosProvider } from './context/ProductosContext.jsx';
import { BusquedaProvider } from './context/BusquedaContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ProductosProvider>
        <BusquedaProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </BusquedaProvider>
      </ProductosProvider>
    </AuthProvider>
  </BrowserRouter>
);
