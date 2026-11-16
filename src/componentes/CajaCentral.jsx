import { useState } from 'react';

function sumarRegistros(registros) {
  return registros.reduce((total, registro) => {
    return total + (Number(registro.monto) || 0);
  }, 0);
}

function CajaCentral({ 
  registros = [], 
  error = '',
  onEditarRegistro,
  onAgregarRegistro

}) {
  // Estados para controlar la búsqueda y el ordenamiento
  const [busqueda, setBusqueda] = useState('');
  const [ordenarPor, setOrdenarPor] = useState('fecha-desc');
  const total = sumarRegistros(registros);
  const totalFormateado = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  }).format(total);

  // 1. Filtramos los registros según lo que se escriba en la barra de búsqueda
  const registrosFiltrados = registros
    .filter((item) => {
      const texto = busqueda.toLowerCase();
      const coincideTitulo = item.titulo.toLowerCase().includes(texto);
      const coincideDesc = item.descripcion 
        ? item.descripcion.toLowerCase().includes(texto) 
        : false;
      return coincideTitulo || coincideDesc;
    })
    // 2. Ordenamos según el filtro seleccionado (fecha, monto o alfabético)
    .sort((a, b) => {
      if (ordenarPor === 'fecha-desc') return b.fecha - a.fecha;
      if (ordenarPor === 'fecha-asc') return a.fecha - b.fecha;
      if (ordenarPor === 'monto-desc') return b.monto - a.monto;
      if (ordenarPor === 'monto-asc') return a.monto - b.monto;
      if (ordenarPor === 'alfabetico-asc') return a.titulo.localeCompare(b.titulo);
      if (ordenarPor === 'alfabetico-desc') return b.titulo.localeCompare(a.titulo);
      return 0;
    });

  // Función auxiliar para convertir el 'Long' de la base de datos a fecha legible
  const formatearFecha = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <main className="caja-central">
      <section className="encabezado-caja">
        <h2>Mis Transacciones</h2>
        <p>Gestiona y consulta tus registros.</p>
      </section>

      <section className="resumen-saldo" aria-label="Resumen de transacciones">
        <p className="resumen-saldo-etiqueta">Total de los registros</p>
        <p className="resumen-saldo-valor">{totalFormateado}</p>
      </section>


      {/* Barra superior: Búsqueda, Filtros y Botón Agregar */}
      <section className="controles-superiores">
        <input
          className="campo-busqueda"
          type="text"
          placeholder="Buscar por título o descripción..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          className="selector-orden"
          value={ordenarPor} 
          onChange={(e) => setOrdenarPor(e.target.value)}
        >
          <option value="fecha-desc">Fecha: Más recientes primero</option>
          <option value="fecha-asc">Fecha: Más antiguos primero</option>
          <option value="monto-desc">Monto: Mayor a menor</option>
          <option value="monto-asc">Monto: Menor a mayor</option>
          <option value="alfabetico-asc">Orden alfabético: A - Z</option>
          <option value="alfabetico-desc">Orden alfabético: Z - A</option>
        </select>

        <button className="boton boton-principal boton-agregar" type="button" onClick={onAgregarRegistro}>
          + Nuevo Registro
        </button>
      </section>

      {/* Mensajes de error o estado vacío */}
      {error && <p className="mensaje-error" role="alert">{error}</p>}

      {!error && registrosFiltrados.length === 0 ? (
        <p className="estado-vacio">No se encontraron registros para mostrar.</p>
      ) : (
        /* Lista de registros donde cada caja es un botón */
        <ul className="lista-transacciones">
          {registrosFiltrados.map((item) => (
            <li className="elemento-transaccion" key={item.id}>
              <button
                className="tarjeta-transaccion"
                type="button"
                onClick={() => onEditarRegistro(item)}
              >
                <div className="tarjeta-transaccion-cabecera">
                  <h3>{item.titulo}</h3>
                  <span className="monto-transaccion">${item.monto.toLocaleString()}</span>
                </div>

                <small className="fecha-transaccion">{formatearFecha(item.fecha)}</small>

                {/* Renderizado condicional: solo se muestra si descripcion no es null ni vacía */}
                {item.descripcion && <p className="descripcion-transaccion">{item.descripcion}</p>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default CajaCentral;
