import { useState } from 'react';

function FormularioRegistrarse({ onCerrar, onRegistrado }) {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  async function manejarRegistro(e) {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      const respuesta = await fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombreUsuario, password }),
      });

      const cuerpo = await respuesta.text();
      let datos = null;

      if (cuerpo.trim()) {
        try {
          datos = JSON.parse(cuerpo);
        } catch {
          datos = null;
        }
      }

      if (!respuesta.ok) {
        const mensaje = datos?.mensaje || datos?.message || datos?.error || cuerpo;
        setError(mensaje || `No se pudo crear la cuenta (HTTP ${respuesta.status}).`);
        return;
      }

      onRegistrado?.(nombreUsuario);
      onCerrar?.();
    } catch (e) {
      setError(`No se pudo conectar con el servidor: ${e.message}`);
    } finally {
      setCargando(false);
    }
  }

  return (
    <form className="formulario-registro formulario-registrarse" onSubmit={manejarRegistro}>
      <p className="formulario-etiqueta">Nueva cuenta</p>
      <h2>Registrarse</h2>
      <p className="registro-descripcion">Crea una cuenta para comenzar a usar la aplicación.</p>

      {error && <p className="mensaje-error" role="alert">{error}</p>}

      <div className="campo-formulario">
        <label htmlFor="registro-nombre-usuario">Nombre de usuario</label>
        <input
          id="registro-nombre-usuario"
          name="nombreUsuario"
          type="text"
          autoComplete="username"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
          required
        />
      </div>

      <div className="campo-formulario">
        <label htmlFor="registro-password">Contraseña</label>
        <input
          id="registro-password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="acciones-formulario">
        <button className="boton boton-secundario" type="button" onClick={onCerrar} disabled={cargando}>
          Cancelar
        </button>
        <button className="boton boton-principal" type="submit" disabled={cargando}>
          {cargando ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>
      </div>
    </form>
  );
}

export default FormularioRegistrarse;