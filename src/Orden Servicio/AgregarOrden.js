import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AgregarServicio() {
    let navegacion = useNavigate();

    const [orden, setOrden] = useState({
        cliente: "",
        tipoServicio: "",
        placaVehiculo: "",
        kilometraje: "",
        fecha: ""
    })

    const { cliente, tipoServicio, placaVehiculo, kilometraje, fecha } = orden

    const onInputCahnge = (e) => {
        setOrden({ ...orden, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "http://localhost:8080/serviteca/ordenservicios";
        await axios.post(urlBase, orden)
        navegacion("/ordenservicio")

    }

    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h2>Agregar Orden de Servicio</h2>
            </div>
            <div class="container text-center">
                <div class="row">
                    <div class="col-5">
                        <div className='container text-center' style={{ margin: "30px" }}>
                            <div className='container'></div>
                            <Link type="button" className="btn btn-center btn-primary" to="http://localhost:3000/agregarorden">Agregar Servicio</Link>
                        </div>
                    </div>
                    <div class="col-5">
                        <div className='container text-center' style={{ margin: "30px" }}>
                            <div className='container'></div>
                            <Link type="button" className="btn btn-center btn-primary" to="http://localhost:3000/buscarorden">Buscar Orden de Servicio</Link>
                        </div>
                    </div>
                </div>
            </div>




            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label for="cliente" className="form-label">cliente</label>
                    <input type="text" className="form-control" id="cliente" name='cliente' required={true} value={cliente} onChange={(e) => onInputCahnge(e)} />
                </div>
                <div className="mb-3">
                    <label for="disabledSelect" class="form-label">Tipo de servicio</label>
                    <select className="form-select" aria-label="Default select example">
                        <option required={true} value={tipoServicio} onChange={(e) => onInputCahnge(e)}>Mecanico</option>
                        <option required={true} value={tipoServicio} onChange={(e) => onInputCahnge(e)}>Lavado</option>
                        <option required={true} value={tipoServicio} onChange={(e) => onInputCahnge(e)}>Lubricacion</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label for="placaVehiculo" className="form-label">Placa del Vehiculo</label>
                    <input type="tex" step="any" className="form-control" id="placaVehiculo" name='placaVehiculo' value={placaVehiculo} onChange={(e) => onInputCahnge(e)} />
                </div>
                <div className="row mb-3 ">
                    <div className='col-8'>
                        <label htmlfor="kilometraje" className="form-label">Kilometraje</label>
                        <input type="number" step="any" className="form-control" id="kilometraje" name='kilometraje' value={kilometraje} onChange={(e) => onInputCahnge(e)} />
                    </div>
                    <div className='col-sm-4 col-6 row container text-center'>
                        <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Cambio de Aceite
                        </button>
                        <div className="modal center" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Cmabio de Aceite</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body container text-center">
                                        <label for="disabledSelect" class="form-label">Tipo de aceite</label>
                                        <select class="form-select" aria-label="Default select example">

                                            <option value="1">Mineral</option>
                                            <option value="2">Sintético</option>
                                        </select>
                                        <label for="kilometros" className="form-label">Kilometros cambio: *</label>
                                        <input type="tex" step="any" className="form-control" id="kilometros" name='Kilometros' />

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-success"><i class="fa-regular fa-floppy-disk"></i> Guardar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="mb-3">
                    <label htmlfor="fecha" className="form-label">Fecha</label>
                    <input type="date" className="form-control" id="fecha" name='fecha' value={fecha} onChange={(e) => onInputCahnge(e)} />
                </div>

                <div className='text-center'>
                    <button type="submit" className="btn btn-warning  me-3" ><i className="fa-solid fa-check" /> Agregar</button>        </div>
            </form>
        </div>
    )
}