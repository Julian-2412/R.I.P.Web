function FormularioLogin({
    correo, 
    contrasena, 
    error, 
    onCorreoChange, 
    onContrasenaChange, 
    onSubmit 
  }) {
  
  return ( 
    <form onSubmit={onSubmit}>
        <h2>Iniciar sesión</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div>
            <label htmlFor="correo">Correo electrónico:</label>
            <input
                type="email"
                id="correo"
                value={correo}
                onChange={(e) => onCorreoChange(e.target.value)} 
                required
            />
        </div>

        <div>
            <label htmlFor="contrasena">Contraseña:</label>
            <input
                type="password"
                id="contrasena"
                value={contrasena}
                onChange={(e) => onContrasenaChange(e.target.value)}
                required
            />
        </div>
            
        <button type="submit">Iniciar sesión</button>

    </form>
    );
}
export default FormularioLogin;