import { useEffect, useState } from 'react';

import BarraLateral from '../../componentes/BarraLateral.jsx'
import BarraSuperior from '../../componentes/BarraSuperior.jsx'
import CajaCentral from '../../componentes/CajaCentral.jsx'
import BarraInferior from '../../componentes/BarraInferior.jsx'
import Modal from '../../componentes/Modal.jsx';
import FormularioEditar from '../../componentes/FormularioEditar.jsx'
import FormularioAgregar from '../../componentes/FormularioAgregar.jsx'

import ConsultarRegistros from '../../logica/ConsultarRegistros.js';
import '../../estilos/pagina-principal.css';



function PaginaPrincipal() {

  const [registros, setRegistros] = useState([]);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [queFormulario, setFormulario] = useState(null);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);

  function cerrarModal() {
    setMostrarModal(false);
    setFormulario(null);
    setRegistroSeleccionado(null);
  }

  function abrirFormularioEditar(registro) {
    setRegistroSeleccionado(registro);
    setFormulario('editar');
    setMostrarModal(true);
  }

  function abrirFormularioAgregar() {
    setFormulario('agregar');
    setRegistroSeleccionado(null);
    setMostrarModal(true);
  }

  async function recargarRegistros() {
    try {
      const datos = await ConsultarRegistros();
      setRegistros(datos);
      setError('');
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    let activa = true;

    async function cargarRegistros() {
      try {
        const datos = await ConsultarRegistros();

        if(activa) setRegistros(datos);
      }catch (e){
        if (activa) setError(e.message);
      }
      finally{
        if (activa) setCargando(false);
      }
    }

    cargarRegistros();

    return () => {
      activa = false;
    }
  }, [])

  return (
    <div className="pagina-principal">
        <BarraSuperior />
        <BarraLateral />
        {cargando
          ? <p className="estado-cargando" role="status">Cargando registros...</p>
          : <CajaCentral 
             registros={registros}
             error={error}
             onEditarRegistro={abrirFormularioEditar}
             onAgregarRegistro={abrirFormularioAgregar}/>}
        <Modal estaAbierto={mostrarModal} onCerrar={cerrarModal}>
          {queFormulario === 'agregar' && (
            <FormularioAgregar
              onCerrar={cerrarModal}
              onRegistroGuardado={recargarRegistros}
            />
          )}

          {queFormulario === 'editar' && registroSeleccionado && (
            <FormularioEditar
              registro={registroSeleccionado}
              onCerrar={cerrarModal}
              onRegistroActualizado={recargarRegistros}
            />
          )}
        </Modal>
        <BarraInferior />
    </div>
  )
}
export default PaginaPrincipal;