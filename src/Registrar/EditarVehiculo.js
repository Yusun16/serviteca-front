import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import fotoimage from '../img/fotoup.jpeg';

export default function EditarVehiculo() {
    const urlBase = "http://localhost:8080/serviteca/servicios";
    let navegacion = useNavigate();
    const { id } = useParams();

    // Estado para almacenar la información del vehículo
    const [vehiculo, setVehiculos] = useState({
        placa: "",
        marca: "",
        linea: "",
        modelo: "",
        cliente: "",
        foto: "",
        obsevaciones: "",
    });

    // Estado para almacenar la imagen seleccionada
    const [image, setImage] = useState(null);

    const { placa, marca, linea, modelo, cliente, foto, obsevaciones } = vehiculo;

    useEffect(() => {
        cargarVehiculo();
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
    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(urlBase, vehiculo);
        navegacion("/");
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
                <form className='container' style={{ width: "580px", position: "relative", height: "310px" }} onSubmit={onSubmit}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="placa" className="form-label">Placa: *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="placa"
                                    name='placa'
                                    value={placa}
                                    onChange={onInputChange}
                                    style={{ width: "320px" }}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="marca" className="form-label">Marca: *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="marca"
                                    name='marca'
                                    value={marca}
                                    onChange={onInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="linea" className="form-label">Linea: *</label>
                                <select
                                    className="form-select"
                                    name="linea"
                                    value={linea}
                                    onChange={onInputChange}
                                >
                                    <option value="">Selecciona la Linea</option>
                                    <option value="1">Linea 1</option>
                                    <option value="2">Linea 2</option>
                                    <option value="3">Linea 3</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="modelo" className="form-label">Modelo: *</label>
                                <select
                                    className="form-select"
                                    name="modelo"
                                    value={modelo}
                                    onChange={onInputChange}
                                >
                                    <option value="">Selecciona el Modelo</option>
                                    <option value="1">Modelo 1</option>
                                    <option value="2">Modelo 2</option>
                                    <option value="3">Modelo 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="">
                            <div className="mb-3">
                                <label htmlFor="cliente" className="form-label">Cliente: *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cliente"
                                    name='cliente'
                                    value={cliente}
                                    onChange={onInputChange}
                                    style={{ width: "320px" }}
                                    required={true}
                                />
                            </div>
                            <div className="col-md-6 d-flex align-items-center">
                                <div className="w-50">
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
                                            <img src={fotoimage} alt="foto ejemplo" style={{ width: "90px", zIndex: "1", left: "50px", position: "relative", height: "90px", bottom: "30px" }} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descripcion" className="form-label">Descripción: *</label>
                                <textarea
                                    style={{ resize: "none" }}
                                    className="form-control"
                                    rows={5}
                                    id="descripcion"
                                    name='descripcion'
                                    value={obsevaciones}
                                    onChange={onInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="btn btn-success btn-sm me-3">
                            <i className="fa-regular fa-floppy-disk"></i> Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
