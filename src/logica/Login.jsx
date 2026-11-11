import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import FormularioLogin from '../componentes/FormularioLogin.jsx';

function Login(){
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const manejarLogin = async (e) => {
        e.preventDefault(); //Hace que la página no se recargue al enviar el formulario

        const i = 1;
        if(i == 1){
            navigate('/pagina-principal');
            return;
        }

        setError(''); //Reinicializa el estado de error antes de intentar iniciar sesión

        try {
            // Aquí va la lógica para verificar las credenciales, usando POST
            const respuesta = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json', //Se especifica que el contenido del cuerpo de la solicitud es JSON
                },
                body: JSON.stringify({ correo, contrasena }),//Se convierte el objeto con las credenciales a una cadena JSON para enviarlo al servidor
            });

            const datos = await respuesta.json(); //Se espera la respuesta del servidor y se convierte a JSON

            if (!respuesta.ok) {
                // Si la respuesta no es correcta, se muestra el mensaje de error
                setError(datos.mensaje || 'Error al iniciar sesión');
                return;
            }

            //Se guarda el token en el almacenamiento local del navegador para mantener la sesión iniciada
            localStorage.setItem('token', datos.token);

            //Redirección a la página principal después de un inicio de sesión exitoso
            navigate('/pagina-principal');
        }
        catch (error) {
            setError('Error al iniciar sesión. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <FormularioLogin
            correo={correo}
            contrasena={contrasena}
            error={error}
            onCorreoChange={setCorreo}
            onContrasenaChange={setContrasena}
            onSubmit={manejarLogin}
        />
    );
}
export default Login;