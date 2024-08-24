import React from 'react'

export default function BuscarServicio() {

    return (
        <>
            <div className='container'>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Inicio</li>
                        <li className="breadcrumb-item active" aria-current="page">Servicios</li>
                        <li className="breadcrumb-item active" aria-current="page">Buscar</li>
                    </ol>
                </nav>
                <div className='container' style={{ margin: "30px" }}>
                    <h3>Buscar Servicio</h3>
                    <div className='text'>
                        <p style={{ position: "relative", left: "250px" }}>Buscar por: </p>
                    </div>
                </div>
                <form className='container' style={{ width: "554px" }}>

                    <div className="mb-3">
                        <label htmlFor="codigo" className="form-label">Codigo: *</label>
                        <input type="number" className="form-control" id="codigo" name='codigo' required={true} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descripcion" className="form-label" style={{ resize: "none" }} >Descripción: *</label>
                        <textarea style={{ resize: "none" }} type="text" className="form-control" rows={5} id="descripcion" name='descripcion' required={true} />
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="btn btn-warning btn-sm me-3">Buscar</button>
                        <a href='/' className='btn btn-primary btn-sm'>Regresar</a>
                    </div>
                </form>
            </div>

            <div className='container text-center' style={{ margin: "30px" }} >
                <table class="table">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Codigo</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Valor del Servicio</th>
                            <th scope="col">Año</th>
                            <th scope="col">Porcentaje del Operario</th>


                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@mdo</td>
                        </tr>

                    </tbody>
                </table>
            </div>

        </>
    )

}
