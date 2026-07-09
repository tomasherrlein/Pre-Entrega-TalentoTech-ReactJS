import { createContext, useContext, useState } from 'react';

const BusquedaContext = createContext();

export const useBusqueda = () => useContext(BusquedaContext);

export const BusquedaProvider = ({ children }) => {
  const [busqueda, setBusqueda] = useState('');

  return (
    <BusquedaContext.Provider value={{ busqueda, setBusqueda }}>
      {children}
    </BusquedaContext.Provider>
  );
};
