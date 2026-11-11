function BarraLateral() {
  return (
    <aside>
      {/* Información del usuario */}
      <section>
        <img src="" alt="Foto de perfil del usuario" />
        <h3>Nombre del usuario</h3>
        <p>usuario@correo.com</p>
      </section>

      {/* Navegación */}
      <nav>
        <ul>
          <li>
            <a href="/">Inicio</a>
          </li>
          <li>
            <a href="/perfil">Mi perfil</a>
          </li>
          <li>
            <a href="/configuracion">Configuración</a>
          </li>
          <li>
            <a href="/ayuda">Ayuda</a>
          </li>
          <li>
            <a href="/cerrar-sesion">Cerrar sesión</a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default BarraLateral