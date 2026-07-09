function Paginacion({ paginaActual, totalPaginas, onCambiar }) {
  if (totalPaginas <= 1) return null;

  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 py-8">
      <button
        onClick={() => onCambiar(paginaActual - 1)}
        disabled={paginaActual === 1}
        className="px-3 py-1.5 rounded-card border border-border text-text hover:bg-surface-2 transition-colors disabled:opacity-40"
      >
        Anterior
      </button>

      {paginas.map((numero) => (
        <button
          key={numero}
          onClick={() => onCambiar(numero)}
          className={`px-3 py-1.5 rounded-card border transition-colors ${
            numero === paginaActual
              ? 'bg-brand border-brand text-text'
              : 'border-border text-text hover:bg-surface-2'
          }`}
        >
          {numero}
        </button>
      ))}

      <button
        onClick={() => onCambiar(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
        className="px-3 py-1.5 rounded-card border border-border text-text hover:bg-surface-2 transition-colors disabled:opacity-40"
      >
        Siguiente
      </button>
    </div>
  );
}

export default Paginacion;
