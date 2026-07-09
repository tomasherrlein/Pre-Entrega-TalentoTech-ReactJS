function TarjetaContacto({ nombre, email, puesto, foto }) {
  return (
    <div className="bg-surface-2 border border-border rounded-card p-4 text-center w-56">
      <img
        src={foto}
        alt={nombre}
        className="w-20 h-20 rounded-full object-cover object-top mx-auto mb-2"
      />
      <h4 className="font-semibold text-text mb-1">{nombre}</h4>
      <p className="text-brand text-sm mb-1">{puesto}</p>
      <p className="text-muted text-xs break-words">{email}</p>
    </div>
  );
}

export default TarjetaContacto;
