import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import LoginUsuario from '../../logica/LoginUsuario.js';
import Modal from '../../componentes/Modal.jsx';
import FormularioRegistrarse from '../../componentes/FormularioRegistrarse.jsx';

function Login() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const [mensajeRegistro, setMensajeRegistro] = useState('');
    const [cargando, setCargando] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);

    function cerrarModal() {
        setMostrarModal(false);
    }

    function MostrarModal() {
        setMensajeRegistro('');
        setMostrarModal(true);
    }

    function manejarRegistroExitoso(nombreUsuario) {
        setUsuario(nombreUsuario);
        setContrasena('');
        setMensajeRegistro('Cuenta creada. Ya puedes iniciar sesión.');
    }

    // Función para majear el envío del formulario de inicio de sesión    
    const manejarEnvio = async (e) => {
        e.preventDefault(); // Evita que se recarge la página al opimir el botón e envio de credenciales
        setError(''); // Se re inicia la variable que va a contener el posible error que salte
        setCargando(true); // Con esto se bloquea el botón, usando el atributo del mismo "disabled"

        try {
            const sesion = await LoginUsuario(usuario, contrasena);
            localStorage.setItem('token', sesion.token);
            localStorage.setItem('usuarioId', sesion.usuarioId);
            localStorage.setItem('usuario', sesion.usuario);
            navigate('/pagina-principal');
        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
    }


    return (
        <div className="contenedor-login">

            <h2>Iniciar sesión</h2>

            <form onSubmit={manejarEnvio}>

                <div className="campo">
                    <label htmlFor="usuario">Usuario</label>
                    <input 
                        type="text" 
                        id="usuario" 
                        name="usuario"
                        placeholder="Ingrese su usuario" 
                        required 
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <label htmlFor="contrasena">Contraseña</label>
                    <input 
                        type="password" 
                        id="contrasena" 
                        name="contrasena"
                        placeholder="Ingrese su contraseña" 
                        required 
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                </div>

                {error && <p role="alert">{error}</p>}

                <button type="submit" className="boton-login" disabled={cargando}>
                    {cargando ? 'Ingresando...' : 'Ingresar'}
                </button>
            </form>

            {mensajeRegistro && <p className="mensaje-exito" role="status">{mensajeRegistro}</p>}
            <p className="registro-prompt">
                ¿No tienes cuenta?
                <button className="boton-abrir-registro" type="button" onClick={MostrarModal}>
                    Registrarse
                </button>
            </p>


            <Modal estaAbierto={mostrarModal} onCerrar={cerrarModal}>
                <FormularioRegistrarse
                    onCerrar={cerrarModal}
                    onRegistrado={manejarRegistroExitoso}
                />
            </Modal>

        </div>
    );
}

export default Login;