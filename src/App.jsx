import { Routes, Route } from 'react-router-dom';
import Layout from './componentes/layout/Layout';
import Inicio from './componentes/Inicio/Inicio';
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer';
import ProductoDetalle from './componentes/ProductoDetalle/ProductoDetalle';
import Cart from './componentes/Cart/Cart';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<ItemListContainer Mensaje="Nuestros productos" />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/carrito" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
