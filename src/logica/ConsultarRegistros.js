async function ConsultarRegistros() {

    //Recuperamos el token del almacenamiento local del navegador para poderlo enviar en la petición
    const token = localStorage.getItem('token');

    const usuarioId = localStorage.getItem('usuarioId');

    if (!token || !usuarioId) {
        throw new Error('No hay una sesión válida. Inicia sesión nuevamente.');
    }

    const respuesta = await fetch(`http://localhost:4000/usuarios/${usuarioId}/transacciones`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const cuerpo = await respuesta.text();
    let datos = null;

    if (cuerpo.trim()) {
        try {
            datos = JSON.parse(cuerpo);
        } catch {
            throw new Error(
                `El servidor respondió con HTTP ${respuesta.status}, pero el cuerpo no es JSON válido.`
            );
        }
    }

    if (!respuesta.ok) {
        const mensajeServidor = datos?.mensaje || datos?.message || datos?.error;
        throw new Error(
            mensajeServidor
                ? `Error al consultar registros (HTTP ${respuesta.status}): ${mensajeServidor}`
                : `Error al consultar registros (HTTP ${respuesta.status}).`
        );
    }

    if (datos === null) {
        throw new Error(
            `El servidor respondió con HTTP ${respuesta.status} sin contenido; se esperaba una lista de registros.`
        );
    }

    const registros = Array.isArray(datos) ? datos : datos.transacciones;
    if (!Array.isArray(registros)) {
        throw new Error('La respuesta del servidor no contiene una lista de transacciones.');
    }

    return registros;
}

export default ConsultarRegistros;