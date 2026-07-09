function ModalConfirmacion({ mensaje, onConfirmar, onCancelar }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-surface border border-border rounded-card p-6 max-w-sm w-full text-center">
        <p className="text-text mb-6">{mensaje}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onCancelar}
            className="px-4 py-2 rounded-card border border-border text-text hover:bg-surface-2 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="px-4 py-2 rounded-card bg-red-600 hover:bg-red-700 text-white transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmacion;
