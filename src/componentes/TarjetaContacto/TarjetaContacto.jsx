import styles from './TarjetaContacto.module.css';

function TarjetaContacto({ nombre, email, puesto, foto }) {
  return (
    <div className={styles.tarjeta}>
      <img src={foto} alt={nombre} className={styles.foto} />
      <h4 className={styles.nombre}>{nombre}</h4>
      <p className={styles.puesto}>{puesto}</p>
      <p className={styles.email}>{email}</p>
    </div>
  );
}

export default TarjetaContacto;
