import React from 'react';
import { Link } from 'react-router-dom';

export default function () {
  return (
    <div>


<div className="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Guardardo</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        Registro guardado con exito
      </div>
      <div className="botonposicion modal-footer" >
        <button type="submit" className="btn btn-success">Ok</button >
        
      </div>
    </div>
  </div>
</div>
    </div>
  )
}
