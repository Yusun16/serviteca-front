import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import fotoimage from '../img/fotoup.jpeg';
import axios from 'axios';

export default function AgregarVehiculo() {

    let navegacion = useNavigate();

    const servicios = [
        { cedula: '123456789', nombre: 'Juan Perez', ciudad: 'Bogotá' },
        { cedula: '987654321', nombre: 'Maria Gomez', ciudad: 'Medellín' },

    ];

    const [vehiculo, setVehiculo] = useState({
        placa: "",
        marca: "",
        linea: "",
        modelo: "",
        cliente: "",
        observacion: "",
    })


    // const { placa, marca, linea, modelo, cliente, foto, Observacion } = vehiculo


    // JSON de departamentos y ciudades de Colombia
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



        // Agrega más departamentos y ciudades según sea necesario
    };

    const lineas = Object.keys(lineasYmarcas);
    const marcas = vehiculo.linea ? lineasYmarcas[vehiculo.linea] : [];

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setVehiculo(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }



    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "http://localhost:8080/serviteca/vehiculos";
        await axios.post(urlBase, vehiculo);
        // Arreglar el redireccionamiento !!!
        // navegacion("/agregarvehiculo")
        navegacion("/listadoVehiculo")

    }

    // Función para exportar a Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(servicios.map(servicio => ({
            "Cedula": servicio.cedula,
            "Nombre": servicio.nombre,
            "Ciudad": servicio.ciudad,
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Agregar Vehiculo");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "Vehiculos Agregados.xlsx");
    };

    // Función para exportar a PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Vehiculos Agregados', 20, 10);
        doc.autoTable({
            head: [['Cedula', 'Nombre', 'Ciudad']],
            body: servicios.map(servicio => [
                servicio.cedula,
                servicio.nombre,
                servicio.ciudad,
            ]),
        });
        doc.save('Vehiculos Agregados.pdf');
    };

    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Guardando datos del Formulario
        try {
            const response = await axios.post('http://localhost:8080/serviteca/vehiculos', vehiculo, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // Response para conectar el id
            const vehiculoId = response.data.id;
            // Formulario guardado. Guardar imagen.
            // Condicional para subir la imagen
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
        } catch (error) {
            console.error('Error al enviar los datos', error);
            alert('Hubo un problema al enviar los datos');
        }
    };







    return (
        <div className='container'>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">Inicio</li>
                    <li className="breadcrumb-item">Vehiculo</li>
                    <li className="breadcrumb-item active" aria-current="page">Agregar</li>
                </ol>
            </nav>
            <div className='container' style={{ margin: "30px" }}>
                <h3> Agregar Vehiculo</h3>
            </div>

            <div style={{ height: "350px" }}>
                <form onSubmit={(e) => handleSubmit(e)} className='container' style={{ width: "580px", position: "relative", height: "310px" }} >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                        <div className="col">
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="placa" className="form-label">Placa: *</label>
                                    <input type="text" className="form-control" id="placa" name='placa' style={{ width: "320px" }}
                                        value={vehiculo.placa} required onChange={(e) => onInputChange(e)} />
                                </div>
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
                                <div className="mb-3">
                                    <label htmlFor="cliente" className="form-label">Cliente: *</label>
                                    <input type="text" className="form-control" id="cliente" name='cliente' style={{ width: "320px" }}
                                        required={true} value={vehiculo.cliente} onChange={(e) => onInputChange(e)} />
                                </div>
                            </div>
                            <div className="col">
                                <label htmlFor="clente" className="form-label">Foto: *</label>
                                <div className="col-md-6 d-flex align-items-center">
                                    <div className="w-50">
                                        <div className="card" style={{ width: '329px', height: '130px', overflow: "hidden" }}>
                                            {image && <img src={image} className='' alt="Foto-subida" style={{ objectFit: "fill", zIndex: "2", width: "191px", height: "100px", top: "10px", left: "18px", position: "relative" }} />}
                                            <input
                                                type="file"
                                                className="form-control-file d-none"
                                                id="fotoimg"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            // value={foto}
                                            />

                                            <label htmlFor='fotoimg' style={{ width: "100%", height: "100%", }}>
                                                <div class="h6 mb-4 text-secondary border-bottom border-secondary" style={{ position: "relative", left: "250px", width: "95px", top: "100px" }}>
                                                    Examinar
                                                </div>
                                                <img src={fotoimage} alt="foto ejemplo" style={{ width: "90px", zIndex: "1", left: "50px", position: "relative", height: "90px", bottom: "30px", }} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mb-3">
                                        <label htmlFor="observacion" className="form-label" style={{ resize: "none" }} >Observaciones: *</label>
                                        <textarea style={{ resize: "none" }} className="form-control" rows={5} id="observacion" name='observacion'
                                            required value={vehiculo.observacion} onChange={(e) => onInputChange(e)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='text-center'>
                            <button type="submit" className="btn btn-success btn-sm me-3"><i class="fa-regular fa-floppy-disk"></i> Guardar</button>
                        </div>
                    </div>
                </form>
            </div>

            <div className='d-flex'>
                <div className='container'>
                    <div className="nav justify-content-end">
                        <button
                            className="fa-sharp fa-solid fa-file-pdf p-2 g-col-6"
                            onClick={exportToPDF}
                            style={{ listStyle: "none", color: "black", fontSize: "31px", background: "none", border: "none" }}
                        ></button>
                        <button
                            className="fa-sharp fa-solid fa-file-excel p-2 g-col-6"
                            onClick={exportToExcel}
                            style={{ listStyle: "none", color: "black", fontSize: "31px", background: "none", border: "none" }}
                        ></button>
                    </div>

                </div>
            </div>
        </div>
    )
}
