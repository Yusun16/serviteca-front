import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ModalEditar from './modalEditar';
import Select from 'react-select';

export default function EditarVehiculo() {
    const urlBase = "http://localhost:8080/serviteca/vehiculos";
    let navegacion = useNavigate();
    const { id } = useParams();
    const [clientes, setClientes] = useState([]);
    const [opcionesClientes, setOpcionesClientes] = useState([]);

    // Estado para almacenar la información del vehículo
    const [vehiculo, setVehiculos] = useState({
        placa: "",
        marca: "",
        linea: "",
        modelo: "",
        cliente: {
            id: ""
        },
        observacion: "",
    })

    const obtenerClientes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/serviteca/cliente');
            setClientes(response.data);
            const opciones = response.data.map((cliente) => ({
                value: cliente.id,
                label: `${cliente.nombre} ${cliente.apellido}`,
            }));
            setOpcionesClientes(opciones);
        } catch (error) {
            console.error("Error al obtener los clientes", error);
        }
    };

    // Estado para almacenar la imagen seleccionada
    const [image, setImage] = useState(null);

    // const { placa, marca, linea, modelo, cliente, foto, observacion } = vehiculo;

    const lineasYmarcas = {
        "Toyota": ["Corolla", "Camry ", "Hilux", "RAV4", "Land Cruiser"],
        "Ford": ["Fiesta", "Focus", "Mustang", "Explorer", "F-150"],
        "Chevrolet": ["Spark", "Onix", "Tracker", "Equinox", "Camaro", ""],
        "Honda": ["Civic", "Accord", "CR-V", "HR-V", "Fit"],
        "Nissan": ["Versa", "Sentra", "Altima", "Rogue", "Frontier"],
        "Hyundai": ["Accent", "Elantra", "Tucson", "Santa Fe", "Palisade"],
        "Kia": ["Rio", "Forte", "Sportage", "Sorento", "Telluride",],
        "Volkswagen": ["Polo", "Golf", "Jetta", "Tiguan", "Passat",],
        "BMW": ["Serie 1", "Serie 3", "Serie 5", "X3", "X5"],
        "Mercedes-Benz": ["Clase A", "Clase C", "Clase E", "GLA", "GLC"],
        "Subaru": ["Impreza", "Legacy", "Outback", "Forester", "Crosstrek", "",],
        "Mazda": ["Mazda2", "Mazda3", "CX-3", "CX-5", "MX-5 Miata",],




    };
    const lineas = Object.keys(lineasYmarcas);
    const marcas = vehiculo.linea ? lineasYmarcas[vehiculo.linea] : [];

    useEffect(() => {
        cargarVehiculo();
        obtenerClientes();
    }, []);

    // Cargar los datos del vehículo desde el backend
    const cargarVehiculo = async () => {
        const resultado = await axios.get(`${urlBase}/${id}`);
        setVehiculos(resultado.data);
    };

    // Manejo de cambios en los campos del formulario
    const onInputChange = (e) => {
        setVehiculos({ ...vehiculo, [e.target.name]: e.target.value });
    };

    // Envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(vehiculo.cliente);
        try {
            // Preparar datos del vehículo
            const jSonBody = {
                // Incluir el ID del vehículo para indicar que es una edición
                // COnfigurar aqui el id porque sin el, no edita!!!
                id: vehiculo.id,
                placa: vehiculo.placa,
                marca: vehiculo.marca,
                linea: vehiculo.linea,
                modelo: vehiculo.modelo,
                cliente: {
                    id: vehiculo.cliente.id
                },
                observacion: vehiculo.observacion
            };
    
            // Enviar vehículo
            const response = await axios.post('http://localhost:8080/serviteca/vehiculos', jSonBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const vehiculoId = response.data.id;
    
            // Subir imagen si existe
            if (image) {
                const imageFormData = new FormData();
                imageFormData.append('id', vehiculoId);
                imageFormData.append('file', image);
    
                await axios.put('http://localhost:8080/serviteca/vehiculos/photo', imageFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
    
            // Limpiar el estado del vehículo
            setVehiculos({
                placa: "",
                marca: "",
                linea: "",
                modelo: "",
                cliente: { id: "" },
                observacion: "",
            });
    
            
            // navegacion("/agregarvehiculo");
        } catch (error) {
            console.error('Error al enviar los datos', error);
            alert('Hubo un problema al enviar los datos');
        }
    };

    const handleSelectChange = (selectedOption) => {
        if (selectedOption) {
            setVehiculos(prevData => ({
                ...prevData,
                cliente: {
                    id: selectedOption.value,
                },
            }));
        }
    };


    // Manejar el cambio de la imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(URL.createObjectURL(file)); // Muestra la imagen seleccionada
    };

    return (
        <div className='container'>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">Inicio</li>
                    <li className="breadcrumb-item">Vehiculo</li>
                    <li className="breadcrumb-item active" aria-current="page">Editar</li>
                </ol>
            </nav>
            <div className='container' style={{ margin: "30px" }}>
                <h3> Editar Vehículo</h3>
            </div>

            <div style={{ height: "350px" }}>
                <form onSubmit={(e) => handleSubmit(e)} className='container' style={{ width: "580px", position: "relative", height: "310px" }} >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="placa" className="form-label">Placa: *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="placa"
                                    name='placa'
                                    value={vehiculo.placa}
                                    onChange={onInputChange}
                                    style={{ width: "320px" }}
                                />
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="linea" className="form-label">Marca: *</label>
                                    <select className="form-select" id='linea' name='linea' required value={vehiculo.linea} onChange={(e) => onInputChange(e)}>
                                        <option value="">Selecciona la Línea</option>
                                        {lineas.map((linea, index) => (
                                            <option key={index} value={linea}>{linea}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="marca" className="form-label">Linea: *</label>
                                    <select className="form-select" id='marca' name='marca' required value={vehiculo.marca} onChange={(e) => onInputChange(e)} >
                                        <option value="">Selecciona el Modelo</option>
                                        {marcas.map((marca, index) => (
                                            <option key={index} value={marca}>{marca}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="modelo" className="form-label">modelo: *</label>
                                    <input type="text" className="form-control" id="modelo" name='modelo'
                                        required value={vehiculo.modelo} onChange={(e) => onInputChange(e)} />
                                </div>
                            </div>
                        </div>
                        <div className="">
                        <div className="col">
                                <label htmlFor="cliente" className="col-4 col-form-label">Cliente:*</label>
                                <div className="col-12">
                                    <Select
                                        id="cliente"
                                        name="cliente"
                                        value={opcionesClientes.find(option => option.value === vehiculo.cliente.id)}
                                        onChange={handleSelectChange}
                                        options={opcionesClientes}
                                        isClearable
                                        className='selecclientes'
                                        placeholder="Seleccione un cliente"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 d-flex align-items-center">
                                <div className="w-50">
                                <label htmlFor="cliente" className="col-4 col-form-label">Foto:*</label>
                                    <div className="card" style={{ width: '329px', height: '130px', overflow: "hidden" }}>
                                        {image && <img src={image} className='' alt="Foto-subida" style={{ objectFit: "fill", zIndex: "2", width: "191px", height: "100px", top: "10px", left: "18px", position: "relative" }} />}
                                        <input
                                            type="file"
                                            className="form-control-file d-none"
                                            id="fotoimg"
                                            accept="image/*"
                                            onChange={handleImageChange} // Maneja la selección de imagen
                                        />
                                        <label htmlFor='fotoimg' style={{ width: "100%", height: "100%" }}>
                                            <div className="h6 mb-4 text-secondary border-bottom border-secondary" style={{ position: "relative", left: "250px", width: "95px", top: "100px" }}>
                                                Examinar
                                            </div>
                                            <img src={vehiculo.foto} alt="foto ejemplo" style={{ width: "120px", zIndex: "1", left: "50px", position: "relative", height: "90px", bottom: "30px" }} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="observacion" className="form-label">Observaciones: *</label>
                                <textarea
                                    style={{ resize: "none" }}
                                    className="form-control"
                                    rows={5}
                                    id="observacion"
                                    name='observacion'
                                    value={vehiculo.observacion}
                                    onChange={onInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className='text-center'>
                    <button type="submit" className="btnncolor btn-sm me-3" data-bs-toggle="modal" data-bs-target="#modaleditarvehiculo">
                        <i className="fa-regular fa-floppy-disk"></i> Guardar
                    </button>
                    <ModalEditar />
                    </div>
                </form>
            </div>
        </div>
    );
}
