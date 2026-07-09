# Player 2 Tienda Retro Gaming

Ecommerce de productos retro gaming (consolas, cartuchos, controles, accesorios y coleccionables) hecho con React. Incluye catálogo dinámico desde Firebase, carrito de compras, autenticación con roles y un panel de administración para gestionar productos.

[**Demo en Vercel:**] (https://talento-tech-player-2.vercel.app/)

## Tecnologías

- React 19 + Vite
- React Router 7
- Tailwind CSS v4
- Firebase (Authentication + Firestore)
- react-icons y react-toastify

## Funcionalidades

- Catálogo de productos cargado desde Firestore
- Carrito de compras con Context API (sumar, restar, eliminar y vaciar, sin duplicar productos)
- Registro, login y logout con Firebase Authentication
- Roles de usuario: el administrador ve el panel de gestión, el usuario común no
- CRUD completo de productos (crear, leer, editar y eliminar) con modal de confirmación
- Detalle de producto con título, precio, descripción, imagen, stock y categoría
- Barra de búsqueda en tiempo real y paginación
- Diseño responsivo con menú hamburguesa
- Notificaciones con react-toastify y títulos por página

## Instalación

El proyecto ya viene conectado a Firebase, así que no hace falta configurar nada.

```bash
git clone https://github.com/tomasherrlein/Pre-Entrega-TalentoTech-ReactJS.git
cd talentolab-ecommerce
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173`.

## Uso

Cualquiera puede ver los productos. Solo un administrador puede crearlos, editarlos o eliminarlos desde el panel.

## Usuario administrador de demo

- **Email:** admin@player2.com
- **Contraseña:** 123456

## Estructura del proyecto

```
src/
  componentes/    componentes y páginas (layout, catálogo, carrito, auth, dashboard)
  context/        AuthContext, CartContext, ProductosContext, BusquedaContext
  hooks/          usePaginacion
  firebase/       conexión con Firebase
scripts/          seed de productos
public/           datos e imágenes
```

## Deploy

Está preparado para Vercel. El archivo `vercel.json` redirige todas las rutas a `index.html` para que funcione el ruteo del lado del cliente. Solo hace falta conectar el repositorio en Vercel y desplegar, sin variables de entorno.
