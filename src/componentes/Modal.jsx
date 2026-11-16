import '../estilos/modal.css';

function Modal({estaAbierto, onCerrar, children}){
    //Si el estado es falso, no se dibuja nada
    if(!estaAbierto) return null;

    return(
        <div className="modal-fondo" onClick={onCerrar}>
            <section
                className="modal-contenido"
                role="dialog"
                aria-modal="true"
                aria-label="Formulario de transacción"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className="modal-cerrar"
                    aria-label="Cerrar formulario"
                    onClick={onCerrar}
                >
                    X
                </button>
                {children}
            </section>
        </div>
    )
}

export default Modal;