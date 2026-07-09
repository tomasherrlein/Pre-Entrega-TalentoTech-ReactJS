import { useState } from 'react';

export function usePaginacion(items, porPagina = 6) {
  const [pagina, setPagina] = useState(1);

  const totalPaginas = Math.ceil(items.length / porPagina) || 1;
  const paginaActual = Math.min(pagina, totalPaginas);
  const inicio = (paginaActual - 1) * porPagina;
  const itemsPagina = items.slice(inicio, inicio + porPagina);

  return { itemsPagina, paginaActual, totalPaginas, setPaginaActual: setPagina };
}
