import React from 'react';

export default function () {
  return (

    <div>
      <div className="modal fade " id="modalagregar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Guardado</h1>
              <button type="button" className="equis-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Registro guardado con exito
            </div>
            <div className="botonposicion modal-footer" >
              <a type="" href='/agregarservicio' className="btn btn-success">Ok</a >

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}