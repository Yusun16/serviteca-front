import React from 'react'

export default function () {
    return (

        <div>
            <div className="modal fade " id="modaleditar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel" style={{color: "black"}}>Guardado</h1>
                            <button type="button" className="equis-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center" >
                            Registro editado con exito
                        </div>
                        <div className="botonposicion modal-footer" >
                            <a type="submit" href='/' className="btn btn-success">Ok</a >

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}