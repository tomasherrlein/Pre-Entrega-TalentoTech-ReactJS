import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-[1200px] mx-auto">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer position="bottom-right" theme="dark" autoClose={2500} />
    </div>
  );
}

export default Layout;
