import React from 'react'
import CheckReady from "../img/check-ready.png"

export default function () {
    return (

        <div>
            <div className="modal fade " id="modaleliminarcliente" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content colorr-modal">
                        <div className="modal-header ">
                            <button type="button" className="equis-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center" style={{ color: "black" }} >
                            <h5> Registro eliminado</h5>

                        </div>
                        <div className='container ' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <img src={CheckReady} alt='eliminar-registro' className='img-ready' />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}