import BarraLateral from '../componentes/BarraLateral.jsx'
import BarraSuperior from '../componentes/BarraSuperior.jsx'
import PedirRegistros from '../componentes/CuerpoCentral.jsx'
import BarraInferior from '../componentes/BarraInferior.jsx'


function PaginaPrincipal() {
  return (
    <>
        <BarraSuperior />
        <BarraLateral />
        <PedirRegistros />
        <BarraInferior />
    </>        
  )
}
export default PaginaPrincipal;