import {useState, useEffect} from 'react';

import CuerpoCentral from '../componentes/CuerpoCentral.jsx';

function PedirRegistros() {
    //Variable dónde se van a almacenar los registros obtenidos de la API
    const [registros, setRegistros] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const obtenerRegistros = async () => {
            //Recuperamos el token del almacenamiento local del navegador para poderlo enviar en la petición
            const token = localStorage.getItem('token');

            try{ 
                const respuesta = await fetch('http://localhost:3000/api/registros', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, //Se envía el token en la cabecera, junto con su firma, de la solicitud para autenticar al usuario
                    },
                });
                const datos = await respuesta.jason(); //Se atrapa la respuesta del servidor y se convierte a JSON

                if(!respuesta.ok){
                    setError(datos.mensaje || 'Sin autarización o sesión expirada');
                    return;
                }

                //Almacenamos los registros obtenidos de la API en el estado de la variable registros
                setRegistros(datos);
            } catch (error) {
                setError('Error al obtener los registros. Inténtalo de nuevo más tarde.');
            } 
        };
        obtenerRegistros();
    }, []); //El efecto se ejecuta una sola vez al montar el componente

    return(
        <CuerpoCentral registros={registros} error={error} />
    );
} 

export default PedirRegistros;