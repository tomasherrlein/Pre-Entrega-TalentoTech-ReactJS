import { useState, useEffect } from 'react';
import TarjetaContacto from '../TarjetaContacto/TarjetaContacto';
import styles from './Footer.module.css';

function Footer() {
  const [equipo, setEquipo] = useState([]);

  useEffect(() => {
    fetch('/data/nosotros.json')
      .then((respuesta) => respuesta.json())
      .then((datos) => setEquipo(datos))
      .catch((error) => console.error('Error al cargar el equipo:', error));
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.empresa}>
        <h3>TalentoLab</h3>
        <p>Tu tienda de tecnología de confianza.</p>
        <p>Av. Corrientes 1234, Buenos Aires, Argentina</p>
        <p>contacto@talentolab.com | (011) 4567-8900</p>
      </div>

      <div className={styles.equipo}>
        <h4 className={styles.tituloEquipo}>Nuestro equipo</h4>
        <div className={styles.tarjetas}>
          {equipo.map((persona) => (
            <TarjetaContacto
              key={persona.id}
              nombre={persona.nombre}
              email={persona.email}
              puesto={persona.puesto}
              foto={persona.foto}
            />
          ))}
        </div>
      </div>

      <p className={styles.copy}>© 2026 TalentoLab. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;
