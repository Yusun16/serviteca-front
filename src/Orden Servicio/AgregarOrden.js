import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';

export default function AgregarServicio() {
    let navegacion = useNavigate();

    const [orden, setOrden] = useState({
        codigo: "",
        clienteId: {
            id: ""
        },
        tipoServicio: "",
        placaVehiculo: "",
        kilometraje: "",
        fecha: ""
    });

    const [isEditing, setIsEditing] = useState(false); // Controla si se puede editar el formulario
    const [clientes, setClientes] = useState([]);
    const { codigo, cliente, tipoServicio, placaVehiculo, kilometraje, fecha } = orden;

    // Esta función obtiene el código solo cuando el usuario presiona "Agregar Nueva Orden de Servicio"
    const obtenerCodigo = async () => {
        try {
            const response = await axios.get('http://localhost:8080/serviteca/generarcodigo');
            setOrden(prevOrden => ({ ...prevOrden, codigo: response.data }));
        } catch (error) {
            console.error("Error al obtener el código", error);
        }
    };

    const obtenerClientes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/serviteca/cliente');  // Ajusta la URL según sea necesario
            setClientes(response.data);  // Guardamos los clientes en el estado
        } catch (error) {
            console.error("Error al obtener los clientes", error);
        }
    };

    useEffect(() => {
        obtenerClientes();
    }, []);

    const onInputChange = (e) => {
        if (e && e.target) {
            // Esto maneja los campos estándar del formulario HTML
            const { name, value } = e.target;
            setOrden(prevOrden => ({
                ...prevOrden,
                [name]: value   // Actualiza el campo en el estado de acuerdo al nombre del input
            }));
        } else {
            // Esto maneja el valor del 'react-select'
            setOrden(prevOrden => ({
                ...prevOrden,
                clienteId: e ? e.value : ""   // Actualiza el clienteId o lo limpia si no hay opción seleccionada
            }));
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "http://localhost:8080/serviteca/ordenservicios";
        const jSonBody={
            codigo:orden.codigo,
            clienteId:{
                id:orden.clienteId
            },
            tipoServicio:orden.tipoServicio,
            placaVehiculo:orden.placaVehiculo,
            kilometraje:orden.kilometraje,
            fecha:orden.fecha
        }
        await axios.post(urlBase, jSonBody);
        setOrden({
            "codigo": "",
            "clienteId": {
                "id": ""
            },
            "tipoServicio": "",
            "placaVehiculo": "",
            "kilometraje": "",
            "fecha": ""
        });
        setIsEditing(false);
        navegacion("/chequeo");
    };

    const handleAgregarOrden = () => {
        obtenerCodigo(); // Llama la función para obtener el código cuando el usuario presiona el botón
        setIsEditing(true); // Habilita la edición del formulario
    };
    const opcionesClientes = clientes.map(cliente => ({
        value: cliente.id,
        label: `${cliente.nombre} ${cliente.apellido}`  // Mostrar nombre completo
    }));

    return (
        <div className="container my-5 ">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">

                    <li className="breadcrumb-item"><i className="fa-solid fa-house"></i><a href="/agregarorden"> Inicio</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Orden de Servicio</li>
                </ol>
            </nav>

            <div className="text-center mb-4">
                <div className="row" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    <div className="col-4">
                        <button type="button" className="btn btncolor w-100" onClick={handleAgregarOrden}>
                            Agregar Nueva Orden de Servicio
                        </button>
                    </div>
                    <div className="col-4">
                        <Link type="button" className="btn btncolor w-100" to="/buscarorden">
                            Buscar Orden de Servicio
                        </Link>
                    </div>
                </div>
            </div>
            <h6 className="mb-3 ">Nueva Orden de Servicio</h6>


            <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", alignContent: "center" }}>
                <div className="row mb-3 text-start" style={{ display: "flex" }}>
                    <label htmlFor="codigo" className="col-4 col-form-label">Código:*</label>
                    <div className="col-8">
                        <input
                            type="text"
                            className="form-control"
                            id="codigo"
                            name="codigo"
                            value={codigo}
                            onChange={onInputChange}
                            disabled
                        />
                    </div>
                </div>

                <div className="row mb-3 text-start" style={{ display: "flex" }}>
                <label htmlFor="clienteId" className="col-4 col-form-label">Cliente:*</label>
                <div className="col-8" style={{ display: "flex", gap: "2px", alignItems: "center" }} >
                    <Select
                        id="clienteId"
                        name="clienteId"
                        value={opcionesClientes.find(option => option.value === orden.clienteId)}  // Muestra el valor seleccionado
                        onChange={onInputChange} 
                        options={opcionesClientes}
                        isDisabled={!isEditing}  
                        isClearable
                        className='selecclientes'  
                        placeholder="Seleccione un cliente"
                    /><button className="btn btn-link" disabled={!isEditing}><Link type="button" class="btn btncolor" to="/agregarcliente"><i class="fa-solid fa-plus" style={{color: "#ffffff;"}}></i></Link></button>
                    
                </div>
            </div>

                <div className="row mb-3 text-start" style={{ display: "flex" }}>
                    <label htmlFor="placaVehiculo" className="col-4 col-form-label">Placa:*</label>
                    <div className="col-8" style={{ display: "flex", gap: "2px", alignItems: "center" }}>
                        <input
                            type="text"
                            className="form-control"
                            id="placaVehiculo"
                            name="placaVehiculo"
                            required
                            value={placaVehiculo}
                            onChange={onInputChange}
                            disabled={!isEditing}
                        /><button className="btn btn-link" disabled={!isEditing}><Link type="button" class="btn btncolor" to="/agregarvehiculo" style={{color: "#ffffff;"}}><i class="fa-solid fa-plus" style={{color: "#ffffff;"}}></i></Link></button>
                    </div>
                </div>

                <div className="row mb-3 text-start" style={{ display: "flex" }}>
                    <label htmlFor="tipoServicio" className="col-4 col-form-label">Servicio:*</label>
                    <div className="col-8">
                        <select
                            className="form-select"
                            id="tipoServicio"
                            name="tipoServicio"
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

                <div className="row mb-3 text-start" style={{ display: "flex" }}>
                    <label htmlFor="kilometraje" className="col-4 col-form-label">Kilometraje Vehículo:*</label>
                    <div className="col-4">
                        <input
                            type="number"
                            className="form-control"
                            id="kilometraje"
                            name="kilometraje"
                            required
                            value={kilometraje}
                            onChange={onInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="col-4" style={{ textAlignLast: "left" }}>
                        <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" disabled={!isEditing}>
                            Cambio de Aceite
                        </button>
                    </div>
                </div>

                <div className="row mb-3 text-start" style={{ display: "flex" }}>
                    <label htmlFor="fecha" className="col-4 col-form-label">Fecha Ingreso:*</label>
                    <div className="col-8">
                        <input
                            type="date"
                            className="form-control"
                            id="fecha"
                            name="fecha"
                            required
                            value={fecha}
                            onChange={onInputChange}
                            disabled={!isEditing}
                        />
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-success" disabled={!isEditing}>
                        Siguiente <i className="fa-solid fa-check" />
                    </button>
                </div>
            </form>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
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
                                    name="kilometros"
                                />
                            </div>
                        </div>
                        <div className="modal-footer" style={{ display: "flex", justifyContent: "space-around" }}>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal">
                                <i className="fa-solid fa-floppy-disk"></i> Guardar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
