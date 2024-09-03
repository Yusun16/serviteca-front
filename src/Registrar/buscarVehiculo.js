import React from 'react'

export default function buscarVehiculo() {
  return (
   
    <div className='container'>
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">Inicio</li>
                    <li className="breadcrumb-item">Vehiculo</li>
                    <li className="breadcrumb-item active" aria-current="page">Buscar</li>
                </ol>
            </nav>
                <div className='container' style={{ margin: "30px" }}>
                    <h3>Buscar Vehiculo</h3>
                    <div className='text'>
                        <p style={{ position: "relative", left: "250px" }}>Buscar por: </p>
                    </div>
                </div>
                <form className='container'  style={{ width: "554px" }}>
                    <div className="mb-3">
                        <label htmlFor="codigo" className="form-label">Placa: *</label>
                        <input type="number" className="form-control" id="codigo" name='codigo' required  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descripcion" className="form-label" style={{ resize: "none" }} >Marca: *</label>
                        <textarea style={{ resize: "none" }} className="form-control" rows={5} id="descripcion" required name='descripcion' />
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="btn btn-center btncolor"> <i class="fa-solid fa-magnifying-glass"></i> Buscar</button>
                    </div>


                </form>
            </div>

  )
}
