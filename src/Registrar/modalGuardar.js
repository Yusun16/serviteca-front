import React from 'react';

export default function () {
  return (

    <div>
      <div className="modal fade " id="modalagregarvehiculo" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Guardado</h1>
              <button type="button" className="equis-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <h6> Registro guardado con exito</h6>

            <a type="" href='/agregarvehiculo' className="btnn-color-modal">Ok</a >
            </div>
          
          </div>
        </div>
      </div>
    </div>
  )
}