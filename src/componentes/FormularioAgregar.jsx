import { useState } from 'react';

function FormularioCrear({ onCerrar, onRegistroGuardado }) {
  // Estados vacíos para un registro nuevo
  const [titulo, setTitulo] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]); // Fecha de hoy (YYYY-MM-DD)
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');

  const manejarCrear = async (e) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('token');
    const usuarioId = localStorage.getItem('usuarioId');

    if (!token || !usuarioId) {
      setError('No hay una sesión válida. Inicia sesión nuevamente.');
      return;
    }

    try {
      // Convertimos la fecha del input (YYYY-MM-DD) a Long (milisegundos) para tu backend
      const fechaEnMilisegundos = new Date(fecha).getTime();

      const respuesta = await fetch(`http://localhost:4000/usuarios/${usuarioId}/transacciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify([{
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

        setError(mensaje || `Error al crear el registro (HTTP ${respuesta.status})`);
        return;
      }

      // El padre vuelve a consultar los registros; la respuesta puede no traer JSON.
      if (onRegistroGuardado) await onRegistroGuardado();
      onCerrar();

    } catch {
      setError('No se pudo conectar con el servidor.');
    }
  };

  return (
    <form className="formulario-registro" onSubmit={manejarCrear}>
      <p className="formulario-etiqueta">Transacción</p>
      <h2>Nuevo Registro</h2>
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
        <button className="boton boton-principal" type="submit">Guardar Registro</button>
      </div>
    </form>
  );
}

export default FormularioCrear;
