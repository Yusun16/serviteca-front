import React, { useEffect, useState } from 'react';

const ModalStack = () => {
    useEffect(() => {
        // Importamos los scripts de Bootstrap
        const script1 = document.createElement('script');
        const script2 = document.createElement('script');

        script1.src = "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js";
        script2.src = "https://stackpath.bootstrapcdn.com/bootstrap/5.3.0/js/bootstrap.min.js";

        document.body.appendChild(script1);
        document.body.appendChild(script2);
    }, []);

    // Función para abrir el primer modal
    const openFirstModal = () => {
        const firstModal = new window.bootstrap.Modal(document.getElementById('firstModal'));
        firstModal.show();
    };

    // Función para abrir el segundo modal y cerrar el primero
    const openSecondModal = () => {
        const secondModal = new window.bootstrap.Modal(document.getElementById('secondModal'));
        const firstModal = window.bootstrap.Modal.getInstance(document.getElementById('firstModal'));
        firstModal.hide();
        secondModal.show();
    };

    return (
        <div className="container mt-5 ">


            {/* Primer Modal */}
            <div className="modal fade" id="firstModal" tabIndex="-1" aria-labelledby="firstModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">

                            <button type="button" className="equis-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            <br></br>
                            <br></br>
                            <div className="modal-body text-center" >
                                <div className="col" style={{ display: "flex", flexDirection: "row" }}>
                                    <div className='col-4'>Agregar Productos:</div>
                                    <div className='col-5'>
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                    <div className=' col-4'>
                                        <button type="button" className="btn btn-center btncolor" onClick={openSecondModal}>
                                            Buscar
                                        </button>
                                    </div>


                                </div>
                                <table className="container" style={{ marginTop: "15px" }}>
                                    <thead >
                                        <tr className='tr-table-tr text-center'>
                                            <th className='text-letras colorthead text-center' scope="col">Referencia</th>
                                            <th className='text-letras colorthead text-center' scope="col">Agregar</th>
                                            <th className='text-letras colorthead text-center' scope="col">Cantidad</th>
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




                            <br />
                        </div>
                        <div>
                            <button type="submit" className="btnncolor btn-sm me-3" data-bs-toggle="modal" data-bs-target="#modalagregar">
                                Agregar <i class="fa-solid fa-check"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Segundo Modal */}
            <div className="modal fade" id="secondModal" tabIndex="-1" aria-labelledby="secondModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            <div className="" id="secondModalLabel">Agregar Productos:</div>
                            <button type="button" className="equis-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h6 className="text-start">Buscar por:</h6>
                            <form>
                                <div >
                                    <div className="col" style={{ display: "flex", flexDirection: "row", margin: "10px 0px" }}>
                                        <div className='col-5'>Referencia: </div>
                                        <div className='col-5'>
                                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>
                                    </div>
                                    <div className="col" style={{ display: "flex", flexDirection: "row", margin: "10px 0px" }}>
                                        <div className='col-5'>Codigo SIIGO: </div>
                                        <div className='col-5'>
                                            <input type="email" class="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" />
                                        </div>
                                    </div>
                                    <div className="col" style={{ display: "flex", flexDirection: "row", margin: "10px 0px" }}>
                                        <div className='col-5'>Descripción: </div>
                                        <div className='col-5'>
                                            <input type="email" class="form-control" id="exampleInputEmail3" aria-describedby="emailHelp" />
                                        </div>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <button type="submit" className="btn btncolor btn-sm me-3" data-bs-toggle="modal" data-bs-target="#modaleditarcliente" >  <i className="fa-solid fa-magnifying-glass"></i> Buscar</button>
                                    <button type="button" className='btn btn-danger btn-sm '><i className="fa-regular fa-circle-xmark"></i> Cancelar</button>

                                </div>

                                <div className="modal-body text-center" >
                                    <div className="col" style={{ display: "flex", flexDirection: "row" }}>
                                    </div>
                                    <table className="container" style={{ marginTop: "15px" }}>
                                        <thead >
                                            <tr className='tr-table-tr text-center'>
                                                <th className='text-letras colorthead text-center' scope="col">Referencia</th>
                                                <th className='text-letras colorthead text-center' scope="col">Agrega</th>
                                                <th className='text-letras colorthead text-center' scope="col">Cantidad</th>
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
                                <div>
                                    <button type="submit" className="btnncolor btn-sm me-3" data-bs-toggle="modal" data-bs-target="#modalagregar">
                                        Agregar <i class="fa-solid fa-check"></i>
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalStack;
