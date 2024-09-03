import React from 'react'

export default function buscarCliente() {
  return (


    <div className='container'>
        
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Inicio</li>
                        <li className="breadcrumb-item active" aria-current="page">Cliente</li>
                        <li className="breadcrumb-item active" aria-current="page">Buscar</li>
                    </ol>
                </nav>
                <div className='container' style={{ margin: "30px" }}>
                    <h3>Buscar Cliente</h3>
                    <div className='text'>
                        <p style={{ position: "relative", left: "250px" }}>Buscar por: </p>
                    </div>
                </div>
                <form className='container' style={{ width: "554px" }}>
                    <div className="mb-3">
                        <label htmlFor="celulanit" className="form-label">Cedula/NIT: *</label>
                        <input type="number" className="form-control" id="celulanit" name='celulanit' required  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="correo" className="form-label">Correo: *</label>
                        <input type="text" className="form-control" id="correo" name='correo' required  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="telefono" className="form-label">Teléfono: *</label>
                        <input type="number" className="form-control" id="telefono" name='telefono' required  />
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="btn btn-center btncolor"> <i class="fa-solid fa-magnifying-glass"></i> Buscar</button>
                    </div>
                    


                </form>
            </div>

            
    
  )
}
