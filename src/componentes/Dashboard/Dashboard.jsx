import { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useProductos } from '../../context/ProductosContext';
import { usePaginacion } from '../../hooks/usePaginacion';
import ModalConfirmacion from '../ModalConfirmacion/ModalConfirmacion';
import Paginacion from '../Paginacion/Paginacion';

const CATEGORIAS = ['Consolas', 'Cartuchos', 'Controles', 'Accesorios', 'Coleccionables'];

const FORM_VACIO = {
  nombre: '',
  descripcion: '',
  precio: '',
  stock: '',
  categoria: '',
  imagen: '',
};

function Dashboard() {
  const { productos, cargando, error, agregarProducto, editarProducto, eliminarProducto } = useProductos();

  const [form, setForm] = useState(FORM_VACIO);
  const [editandoId, setEditandoId] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [errorForm, setErrorForm] = useState(null);
  const [aEliminar, setAEliminar] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  const filtrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const { itemsPagina, paginaActual, totalPaginas, setPaginaActual } = usePaginacion(filtrados, 5);

  const manejarCambio = (evento) => {
    setForm({ ...form, [evento.target.name]: evento.target.value });
  };

  const manejarSubmit = async (evento) => {
    evento.preventDefault();
    setErrorForm(null);

    if (Number(form.precio) <= 0) {
      setErrorForm('El precio debe ser mayor a 0.');
      return;
    }
    if (Number(form.stock) < 0) {
      setErrorForm('El stock no puede ser negativo.');
      return;
    }

    const datos = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: Number(form.precio),
      stock: Number(form.stock),
      categoria: form.categoria,
      imagen: form.imagen,
    };

    setGuardando(true);
    try {
      if (editandoId) {
        await editarProducto(editandoId, datos);
        toast.success('Producto actualizado.');
      } else {
        await agregarProducto(datos);
        toast.success('Producto agregado.');
      }
      cancelarEdicion();
    } catch {
      setErrorForm('No se pudo guardar el producto. Intentá de nuevo.');
    } finally {
      setGuardando(false);
    }
  };

  const empezarEdicion = (producto) => {
    setEditandoId(producto.id);
    setForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion || '',
      precio: producto.precio,
      stock: producto.stock,
      categoria: producto.categoria,
      imagen: producto.imagen,
    });
    setErrorForm(null);
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setForm(FORM_VACIO);
    setErrorForm(null);
  };

  const confirmarEliminar = async () => {
    await eliminarProducto(aEliminar.id);
    toast.success('Producto eliminado.');
    setAEliminar(null);
  };

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto">
      <title>Player 2 — Panel de administración</title>
      <h1 className="text-2xl font-bold text-text mb-8">Panel de administración</h1>

      <form onSubmit={manejarSubmit} className="bg-surface border border-border rounded-card p-6 mb-10">
        <h2 className="text-lg font-semibold text-text mb-4">
          {editandoId ? 'Editar producto' : 'Agregar producto'}
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm text-muted mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={manejarCambio}
              className="w-full bg-bg border border-border rounded-card px-3 py-2 text-text focus:border-brand outline-none"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm text-muted mb-1">Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={manejarCambio}
              rows={2}
              className="w-full bg-bg border border-border rounded-card px-3 py-2 text-text focus:border-brand outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">Precio</label>
            <input
              type="number"
              name="precio"
              value={form.precio}
              onChange={manejarCambio}
              min="0"
              className="w-full bg-bg border border-border rounded-card px-3 py-2 text-text focus:border-brand outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={manejarCambio}
              min="0"
              className="w-full bg-bg border border-border rounded-card px-3 py-2 text-text focus:border-brand outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">Categoría</label>
            <select
              name="categoria"
              value={form.categoria}
              onChange={manejarCambio}
              className="w-full bg-bg border border-border rounded-card px-3 py-2 text-text focus:border-brand outline-none"
              required
            >
              <option value="" disabled>Elegí una categoría</option>
              {CATEGORIAS.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-muted mb-1">Imagen (URL)</label>
            <input
              type="text"
              name="imagen"
              value={form.imagen}
              onChange={manejarCambio}
              placeholder="https://..."
              className="w-full bg-bg border border-border rounded-card px-3 py-2 text-text focus:border-brand outline-none"
            />
          </div>
        </div>

        {errorForm && <p className="text-sm text-red-400 mt-4">{errorForm}</p>}

        <div className="flex gap-3 mt-5">
          <button
            type="submit"
            disabled={guardando}
            className="bg-brand hover:bg-brand-dark text-text font-medium px-5 py-2 rounded-card transition-colors disabled:opacity-50"
          >
            {guardando ? 'Guardando...' : editandoId ? 'Guardar cambios' : 'Agregar producto'}
          </button>
          {editandoId && (
            <button
              type="button"
              onClick={cancelarEdicion}
              className="border border-border text-text px-5 py-2 rounded-card hover:bg-surface-2 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h2 className="text-lg font-semibold text-text mb-4">Productos cargados</h2>

      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar productos..."
        className="w-full bg-bg border border-border rounded-card px-3 py-2 text-text focus:border-brand outline-none mb-4"
      />

      {cargando && <p className="text-muted py-6">Cargando productos...</p>}
      {error && <p className="text-red-400 py-6">{error}</p>}

      {!cargando && !error && (
        filtrados.length === 0 ? (
          <p className="text-muted py-6">No se encontraron productos.</p>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              {itemsPagina.map((producto) => (
                <div
                  key={producto.id}
                  className="flex items-center gap-4 bg-surface border border-border rounded-card p-3"
                >
                  <img src={producto.imagen} alt={producto.nombre} className="w-14 h-14 object-contain" />
                  <div className="flex-1">
                    <p className="text-text font-medium">{producto.nombre}</p>
                    <p className="text-muted text-sm">
                      {producto.categoria} · ${producto.precio.toLocaleString('es-AR')} · Stock: {producto.stock}
                    </p>
                  </div>
                  <button
                    onClick={() => empezarEdicion(producto)}
                    className="text-text hover:text-neon p-2 transition-colors"
                    title="Editar"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => setAEliminar(producto)}
                    className="text-text hover:text-red-400 p-2 transition-colors"
                    title="Eliminar"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
            <Paginacion paginaActual={paginaActual} totalPaginas={totalPaginas} onCambiar={setPaginaActual} />
          </>
        )
      )}

      {aEliminar && (
        <ModalConfirmacion
          mensaje={`¿Seguro que querés eliminar "${aEliminar.nombre}"?`}
          onConfirmar={confirmarEliminar}
          onCancelar={() => setAEliminar(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;
