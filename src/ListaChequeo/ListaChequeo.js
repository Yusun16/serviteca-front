import React, { useState } from 'react';


const CheckListComponent = () => {
    const [images, setImages] = useState({
        fotoDerecha: null,
        fotoIzquierda: null,
        fotoFrontal: null,
        fotoPosterior: null,
        indicadorCombustible: null,
    });

    const handleImageChange = (event, key) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages(prevState => ({
                    ...prevState,
                    [key]: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (


        <div className="container">

            <div className='d-flex justify-content-between'>
                <div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/agregarorden"><i className="fa-solid fa-house"></i> Home</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">Orden de Servicio</li>
                            <li className="breadcrumb-item active" aria-current="page">Lista de Chequeo</li>
                        </ol>
                    </nav>
                </div>
                <div className='d-flex flex-row-reverse'>
                    <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#inventario">
                        <i className="fa-solid fa-list"></i> Inventario
                    </button>
                    <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#historia">
                        <i className="fa-solid fa-clock-rotate-left"></i> Historial
                    </button>
                </div>

            </div>

            {/* modal Inventario */}

            <div>
                <div className="modal fade" id="inventario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">First</th>
                                            <th scope="col">Last</th>
                                            <th scope="col">Handle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td colspan="2">Larry the Bird</td>
                                            <td>@twitter</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* modal historial */}

                <div className="modal fade" id="historia" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <table className="table table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">First</th>
                                            <th scope="col">Last</th>
                                            <th scope="col">Handle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td colspan="2">Larry the Bird</td>
                                            <td>@twitter</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className='mb-3 text-center' style={{ width: "296px", height: "34px" }}>Lista de Chequeo</h3>


            {/* Sección de subida de imágenes */}
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="fotoDerecha">Foto Lateral Derecho: *</label>
                        <input
                            type="file"
                            className="form-control-file"
                            id="fotoDerecha"
                            onChange={(event) => handleImageChange(event, 'fotoDerecha')}
                        />
                    </div>
                    <div className="card mt-2" style={{ width: '100%', height: '250px' }}>
                        {images.fotoDerecha && (
                            <img src={images.fotoDerecha} alt="Foto Lateral Derecho" className="card-img-top" style={{ height: '100%', width: 'auto', maxWidth: '100%', objectFit: 'cover' }} />
                        )}
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="observacionDerecha">Observación: *</label>
                        <input type="text" className="form-control" id="observacionDerecha" />
                    </div>
                </div>

                {/* Repetir para otras imágenes */}
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="fotoFrontal">Foto Frontal: *</label>
                        <input
                            type="file"
                            className="form-control-file"
                            id="fotoFrontal"
                            onChange={(event) => handleImageChange(event, 'fotoFrontal')}
                        />
                    </div>
                    <div className="card mt-2" style={{ width: '100%', height: '250px' }}>
                        {images.fotoFrontal && (
                            <img src={images.fotoFrontal} alt="Foto Frontal" className="card-img-top" style={{ height: '100%', width: 'auto', maxWidth: '100%', objectFit: 'cover' }} />
                        )}
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="observacionFrontal">Observación: *</label>
                        <input type="text" className="form-control" id="observacionFrontal" />
                    </div>
                </div>

                {/* Continúa para las demás imágenes */}
                {/* Foto Izquierda */}
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="fotoIzquierda">Foto Lateral Izquierda: *</label>
                        <input
                            type="file"
                            className="form-control-file"
                            id="fotoIzquierda"
                            onChange={(event) => handleImageChange(event, 'fotoIzquierda')}
                        />
                    </div>
                    <div className="card mt-2" style={{ width: '100%', height: '250px' }}>
                        {images.fotoIzquierda && (
                            <img src={images.fotoIzquierda} alt="Foto Lateral Izquierda" className="card-img-top" style={{ height: '100%', width: 'auto', maxWidth: '100%', objectFit: 'cover' }} />
                        )}
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="observacionIzquierda">Observación: *</label>
                        <input type="text" className="form-control" id="observacionIzquierda" />
                    </div>
                </div>

                {/* Foto Posterior */}
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="fotoPosterior">Foto Posterior: *</label>
                        <input
                            type="file"
                            className="form-control-file"
                            id="fotoPosterior"
                            onChange={(event) => handleImageChange(event, 'fotoPosterior')}
                        />
                    </div>
                    <div className="card mt-2" style={{ width: '100%', height: '250px' }}>
                        {images.fotoPosterior && (
                            <img src={images.fotoPosterior} alt="Foto Posterior" className="card-img-top" style={{ height: '100%', width: 'auto', maxWidth: '100%', objectFit: 'cover' }} />
                        )}
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="observacionPosterior">Observación: *</label>
                        <input type="text" className="form-control" id="observacionPosterior" />
                    </div>
                </div>

                {/* Indicador de Combustible */}
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="indicadorCombustible">Indicador de Combustible: *</label>
                        <input
                            type="file"
                            className="form-control-file"
                            id="indicadorCombustible"
                            onChange={(event) => handleImageChange(event, 'indicadorCombustible')}
                        />
                    </div>
                    <div className="card mt-2" style={{ width: '100%', height: '250px' }}>
                        {images.indicadorCombustible && (
                            <img src={images.indicadorCombustible} alt="Indicador de Combustible" className="card-img-top" style={{ height: '100%', width: 'auto', maxWidth: '100%', objectFit: 'cover' }} />
                        )}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="d-flex flex-column">
                        <div className="d-flex align-items-center mb-2">
                            <i className="fa-solid fa-gauge-simple-high" style={{ color: '#d95447', fontSize: '24px', marginRight: '8px' }}></i>
                            <h5>
                                <div className="d-flex">

                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" id="fuelE" name="fuel" />
                                        <label className="form-check-label" htmlFor="fuelE"> E </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" id="fuelHalf" name="fuel" />
                                        <label className="form-check-label" htmlFor="fuelHalf"> 1/2 </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" id="fuelF" name="fuel" />
                                        <label className="form-check-label" htmlFor="fuelF"> F </label>
                                    </div>

                                </div>
                            </h5>
                        </div>
                        <div className="form-group">
                            <label htmlFor="observacionCombustible">Observación: *</label>
                            <input type="text" className="form-control" id="observacionCombustible" />
                        </div>
                    </div>
                </div>
            </div>



            {/* Botón de enviar */}
            <div className="row mt-4">
                <div className="col text-center">
                    <button className="btn btn-success">Ingresar <i className="fa-solid fa-check"></i></button>
                </div>
            </div>
        </div>
    );
}

export default CheckListComponent;
