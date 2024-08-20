import React from 'react'

export default function AgregarOrden() {
  return (
    <div className='container'>
        <div className='container text-center' style={{margin: "30px"}}>
            <h3>Agregar orden</h3>
        </div>

        <form>
            <div className="mb-3">
                <label htmlFor="codigoOrden" className="form-label">Codigo Orden</label>
                <input type="text" className="form-control" id="codigoOrden" name='codigo' />
            </div>
            <div className="mb-3">
                <label htmlFor="cliente" className="form-label">Cliente</label>
                <input type="text" className="form-control" id="cliente" name='cliente'/>
            </div>
            <div className='mb-3'>
            <label htmlFor="servicio" className="form-label">tipo de servicio</label>
            <select class="form-select" aria-label="Default select example">
            <option value="1">Mecanica</option>
            <option value="2">Lavado</option>
            <option value="3">Lubricacion</option>
            </select>
            <input type="text" className="form-control" id="Servicio" name='Servicio'/>
            </div>
            <div className="mb-3">
                <label htmlFor="placa" className="form-label">Placa del Vehiculo</label>
                <input type="text" className="form-control" id="placa" name="placa"/>
            </div>
            <div className="mb-3">
                <label htmlFor="fehca" className="form-label">Fecha de ingreso</label>
                <input type="date" className="form-control" id="fehca" name='fecha'/>
            </div>
            
            <div>
            <button type="submit" className="btn btn-warning btn-sm me-3">agregar</button>
            <a href='/' className='btn btn-danger btn-sm'>Regresar</a>
            </div>
            </form>

    </div>
  )
}
