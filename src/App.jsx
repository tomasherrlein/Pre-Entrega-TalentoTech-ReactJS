import { Routes, Route } from 'react-router-dom';
import Layout from './componentes/layout/Layout';
import Inicio from './componentes/Inicio/Inicio';
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer';
import ProductoDetalle from './componentes/ProductoDetalle/ProductoDetalle';
import Cart from './componentes/Cart/Cart';
import Login from './componentes/Login/Login';
import Registro from './componentes/Registro/Registro';
import Dashboard from './componentes/Dashboard/Dashboard';
import RutasProtegidas from './componentes/RutasProtegidas/RutasProtegidas';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<ItemListContainer Mensaje="Nuestros productos" />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/dashboard"
          element={
            <RutasProtegidas soloAdmin>
              <Dashboard />
            </RutasProtegidas>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
