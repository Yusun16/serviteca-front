import React from 'react'

export default function () {
    return (

        <div>
            <div className="modal fade " id="modaleliminar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btnn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center" style={{color: "black"}} >
                            Registro eliminado
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