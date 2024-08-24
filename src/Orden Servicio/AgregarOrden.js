import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AgregarServicio() {
    let navegacion = useNavigate();

    const [orden, setOrden] = useState({
        idOrden:"",
        cliente: "",
        tipoServicio: "",
        placaVehiculo: "",
        kilometraje: "",
        fecha: ""
    });

    const [isEditing, setIsEditing] = useState(false);

    const { idOrden,cliente, tipoServicio, placaVehiculo, kilometraje, fecha } = orden;

    const onInputChange = (e) => {
        setOrden({ ...orden, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "http://localhost:8080/serviteca/ordenservicios";
        await axios.post(urlBase, orden);
        setOrden({
            cliente: "",
            tipoServicio: "",
            placaVehiculo: "",
            kilometraje: "",
            fecha: ""
        });
        setIsEditing(false); // Deshabilita el formulario después de enviar
        navegacion("/ordenservicio");
    };

    const handleAgregarOrden = () => {
        setIsEditing(true); // Habilita el formulario
    };

    return (
        <div className='container'>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/agregarorden"><i className="fa-solid fa-house"></i> Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Orden de Servicio</li>
                </ol>
            </nav>

            <div className='text-center ' style={{ height: '60px', width: "880px", position: "relative", left: "332px", top: "4px" }} >
                <div className='row mb-4'>
                    <div className='col'>
                        <button type="button" className="btn btn-primary"  style={{width:"386px" , height:"60px"}} onClick={handleAgregarOrden}>Agregar Nueva Orden de Servicio</button>
                    </div>
                    <div className='col'>
                        <Link type="button" className="btn btn-primary"  style={{width:"386px" , height:"60px", display:"flex", alignItems:"center", justifyContent:"space-around" }} to="/buscarorden">Buscar Orden de Servicio</Link>
                    </div>
                </div>
            </div>

            <h6 className='mb-3' style={{ textAlign: 'left' }}>Nueva Orden de Servicio</h6>

            <form onSubmit={onSubmit} className="form-horizontal" style={{ height: '60px', width: "880px", position: "relative", left: "332px", top: "40px" }}>

                <div className="mb-3 row">
                    <label htmlFor="idOrden" className="col-sm-3 col-form-label">Codigo:*</label>
                    <div className="col-sm-6">
                        <input
                            type="number"
                            className="form-control"
                            id="idOrden"
                            name='idOrden'
                            required
                            value={idOrden}
                            onChange={onInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="cliente" className="col-sm-3 col-form-label">Cliente:*</label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className="form-control"
                            id="cliente"
                            name='cliente'
                            required
                            value={cliente}
                            onChange={onInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="placaVehiculo" className="col-sm-3 col-form-label">Placa:*</label>
                    <div className="col-sm-6">
                        <input
                            type="text"
                            className="form-control"
                            id="placaVehiculo"
                            name='placaVehiculo'
                            required
                            value={placaVehiculo}
                            onChange={onInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="tipoServicio" className="col-sm-3 col-form-label">Servicio:*</label>
                    <div className="col-sm-6">
                        <select
                            className="form-select"
                            id="tipoServicio"
                            name='tipoServicio'
                            required
                            value={tipoServicio}
                            onChange={onInputChange}
                            disabled={!isEditing}
                        >
                            <option value="">Seleccione un servicio</option>
                            <option value="Mecanico">Mecánico</option>
                            <option value="Lavado">Lavado</option>
                            <option value="Lubricacion">Lubricación</option>
                        </select>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="kilometraje" className="col-sm-3 col-form-label">Kilometraje Vehículo:*</label>
                    <div className="col-sm-3">
                        <input
                            type="number"
                            className="form-control"
                            id="kilometraje"
                            name='kilometraje'
                            required
                            value={kilometraje}
                            onChange={onInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="col-sm-3">
                        <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" disabled={!isEditing}>
                            Cambio de Aceite
                        </button>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="fecha" className="col-sm-3 col-form-label">Fecha Ingreso:*</label>
                    <div className="col-sm-6">
                        <input
                            type="date"
                            className="form-control"
                            id="fecha"
                            name='fecha'
                            required
                            value={fecha}
                            onChange={onInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-success" disabled={!isEditing}><i className="fa-solid fa-check" /> Siguiente</button>
                </div>
            </form>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Cambio de Aceite</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="tipoAceite" className="form-label">Tipo de Aceite:</label>
                            <select className="form-select" id="tipoAceite">
                                <option value="Mineral">Mineral</option>
                                <option value="Sintético">Sintético</option>
                            </select>
                            <div className="mt-3">
                                <label htmlFor="kilometros" className="form-label">Kilómetros Cambio:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="kilometros"
                                    name='kilometros'
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success"><i className="fa-regular fa-floppy-disk"></i> Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
