function BarraInferior() {
  return (
    <footer className="barra-inferior">
      <nav aria-label="Navegación inferior">
        <ul>
          <li>
            <a
              className="enlace-instagram"
              href="https://www.instagram.com/juli4n_unu/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visitar Instagram de Julián"
            >
              <svg
                className="icono-instagram"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle className="icono-instagram-punto" cx="17.5" cy="6.5" r="1" />
              </svg>
              <span>Instagram</span>
            </a>
          </li>
          <li>
            <a>Julian Prada Ortega</a>
          </li>

          <li>
            <a>Estudiante de Ingeniería en Sistemas</a>
          </li>

          <li>
            <a>Universidad Industrial de Santander</a>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default BarraInferior