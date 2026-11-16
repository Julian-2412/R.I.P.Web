import { NavLink, useNavigate } from 'react-router-dom';

function BarraLateral() {
  const usuario = localStorage.getItem('usuario') || 'Usuario';
  const navigate = useNavigate();

  function cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('usuario');
    navigate('/', { replace: true });
  }

  return (
    <aside className="barra-lateral">
      {/* Información del usuario */}
      <section className="perfil-usuario">
        <div className="avatar-usuario" aria-hidden="true">
          {usuario.charAt(0).toUpperCase()}
        </div>
        <h3>{usuario}</h3>
       {/*<p>usuario@correo.com</p>*/}
      </section>

      {/* Navegación */}
      <nav className="navegacion-principal">
        <ul>
          <li>
            <NavLink to="/pagina-principal">Inicio</NavLink>
          </li>
          {/* <li>
            <a href="/perfil">Mi perfil</a>
          </li>
          <li>
            <a href="/configuracion">Configuración</a>
          </li>
          <li>
            <a href="/ayuda">Ayuda</a>
          </li> */}
          <li>
            <button
              className="boton-cerrar-sesion"
              type="button"
              onClick={cerrarSesion}
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default BarraLateral