import { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

const ProductosContext = createContext();

export const useProductos = () => useContext(ProductosContext);

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarProductos = async () => {
    setCargando(true);
    setError(null);
    try {
      const snapshot = await getDocs(collection(db, 'productos'));
      setProductos(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch {
      setError('No se pudieron cargar los productos.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const agregarProducto = async (datos) => {
    await addDoc(collection(db, 'productos'), datos);
    await cargarProductos();
  };

  const editarProducto = async (id, datos) => {
    await updateDoc(doc(db, 'productos', id), datos);
    await cargarProductos();
  };

  const eliminarProducto = async (id) => {
    await deleteDoc(doc(db, 'productos', id));
    await cargarProductos();
  };

  return (
    <ProductosContext.Provider
      value={{ productos, cargando, error, agregarProducto, editarProducto, eliminarProducto }}
    >
      {children}
    </ProductosContext.Provider>
  );
};
