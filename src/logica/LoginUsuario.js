const URL_LOGIN = 'http://localhost:4000/login';

async function LoginUsuario(usuario, contrasena) {
    const respuesta = await fetch(URL_LOGIN, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ 
            nombreUsuario: usuario,
            password: contrasena
         }),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(datos.mensaje || 'Usuario o contraseña incorrectos.');
    }

    const usuarioId = datos.Usuario?.id;
    const nombreUsuario = datos.Usuario?.nombreUsuario || usuario;

    if (!datos.token || usuarioId === undefined || usuarioId === null) {
        throw new Error('El servidor no devolvió el token y el ID del usuario.');
    }

    return { token: datos.token, usuarioId, usuario: nombreUsuario };
}

export default LoginUsuario;