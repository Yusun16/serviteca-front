import React from 'react'

export default function AgregarServicio() {
  return (
    <div className='container'>
        <div className='container text-center' style={{margin: "30px"}}>
            <h2>Agregar Servicio</h2>
        </div>
        <form>
        <div className="mb-3">
            <label for="descripcion" className="form-label">Descripción</label>
            <input type="text" className="form-control" id="descripcion" name='descripcion'/>
        </div>
        <div className="mb-3">
            <label for="valor del servicio" className="form-label">Valor Del Servicio</label>
            <input type="number" step="any" className="form-control" id="valor del servicio" name="valor del servicio"/>
        </div>
        <div className="mb-3">
            <label for="año" className="form-label">Año</label>
            <input type="number" step="any" className="form-control" id="año" name='año'/>
        </div>
        <div className="mb-3">
            <label for="porcenteaje del operario" className="form-label">Porcentaje del Operario</label>
            <input type="number" step="any" className="form-control" id="porcenteaje del operario" name='porcentaje del operario'/>
        </div>

        <div className='text-center'>
        <button type="submit" className="btn btn-warning btn-sm me-3">Agregar</button>
        <a href='/' className='btn btn-danger btn-sm'>Regresar</a>

        </div>
        </form>
            </div>
  )
}
