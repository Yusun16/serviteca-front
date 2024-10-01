import React from 'react';

export default function () {
    return (
        <div>
            <div className="modal fade" id="modalbuscarejecucion" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content colorr-modal">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ color: "black" }}></h1>
                            <button type="button" className="equis-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center" >
                            <div className="col" style={{ display: "flex", flexDirection: "row" }}>
                                <div className='col-4'>Productos según servicio:</div>
                                <div className='col-5'>
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected>Open this select menu</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className=' col-4'>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalagregarejecucion">
                                        Buscar
                                    </button>

                                </div>


                            </div>
                            <table className="container" style={{ marginTop: "15px" }}>
                                <thead >
                                    <tr className='tr-table-tr text-center'>
                                        <th className='text-letras colorthead text-center' scope="col">Referencia</th>
                                        <th className='text-letras colorthead text-center' scope="col">Cantidad</th>
                                        <th className='text-letras colorthead text-center' scope="col">Terminado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='tr-table-tr text-center'>
                                        <td>Mark</td>
                                        <td> <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /></td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr className='tr-table-tr text-center'>
                                        <td>Jacob</td>
                                        <td> <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /></td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr className='tr-table-tr text-center'>
                                        <td>Jacob</td>
                                        <td> <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /></td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr className='tr-table-tr text-center'>
                                        <td>Jacob</td>
                                        <td> <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /></td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr  >
                                        <th className='text-letras colorthead ' style={{ padding: "10px 0px" }} scope="col"></th>
                                        <th className='text-letras colorthead' scope="col"></th>
                                        <th className='text-letras colorthead' scope="col"></th>

                                    </tr>
                                </tbody>
                            </table>


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