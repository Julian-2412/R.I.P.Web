import { useState } from 'react';

function FormularioEditar({ registro, onCerrar, onRegistroActualizado }) {
  // Función auxiliar para convertir el Long de la BD al formato del input date (YYYY-MM-DD)
  const convertirLongAInputDate = (timestamp) => {
    return new Date(timestamp).toISOString().split('T')[0];
  };

  // 1. Precargamos los estados con los datos que llegaron en la prop 'registro'
  const [titulo, setTitulo] = useState(registro.titulo);
  const [monto, setMonto] = useState(registro.monto);
  const [fecha, setFecha] = useState(convertirLongAInputDate(registro.fecha));
  const [descripcion, setDescripcion] = useState(registro.descripcion || '');
  const [error, setError] = useState('');

  const manejarEditar = async (e) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('token');
    const usuarioId = localStorage.getItem('usuarioId');

    if (!token || !usuarioId) {
      setError('No hay una sesión válida. Inicia sesión nuevamente.');
      return;
    }

    try {
      const fechaEnMilisegundos = new Date(fecha).getTime();

      const respuesta = await fetch(`http://localhost:4000/usuarios/${usuarioId}/transacciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify([{
            ...registro,
            titulo,
            monto: Number(monto),
            fecha: fechaEnMilisegundos,
            descripcion: descripcion.trim() === '' ? null : descripcion,
        }]),
      });

      if (!respuesta.ok) {
        const cuerpo = await respuesta.text();
        let mensaje = cuerpo;

        try {
          const datos = JSON.parse(cuerpo);
          mensaje = datos.mensaje || datos.message || datos.error || cuerpo;
        } catch {
          // El servidor puede responder con texto o sin cuerpo.
        }

        setError(mensaje || `Error al actualizar el registro (HTTP ${respuesta.status})`);
        return;
      }

      // El padre vuelve a consultar los registros; la respuesta puede no traer JSON.
      if (onRegistroActualizado) await onRegistroActualizado();
      onCerrar();

    } catch (err) {
      setError(`No se pudo completar la petición: ${err.message}`);
    }
  };

  return (
    <form className="formulario-registro" onSubmit={manejarEditar}>
      <p className="formulario-etiqueta">Transacción</p>
      <h2>Editar Registro</h2>
      {error && <p className="mensaje-error" role="alert">{error}</p>}

      <div className="campo-formulario">
        <label>Título:</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>

      <div className="campo-formulario">
        <label>Monto:</label>
        <input
          type="number"
          step="0.01"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          required
        />
      </div>

      <div className="campo-formulario">
        <label>Fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
      </div>

      <div className="campo-formulario">
        <label>Descripción (opcional):</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <div className="acciones-formulario">
        <button className="boton boton-secundario" type="button" onClick={onCerrar}>Cancelar</button>
        <button className="boton boton-principal" type="submit">Guardar Cambios</button>
      </div>
    </form>
  );
}

export default FormularioEditar;
