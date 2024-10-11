import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import fotoimage from '../img/fotoup.jpeg';
import axios from 'axios';
import ModalEliminar from './modalEliminar';
import ModalGuardar from './modalGuardar';
import Select from 'react-select';

export default function AgregarVehiculo() {

    let navegacion = useNavigate();

    const urlBase = "http://localhost:8080/serviteca/vehiculos";
    const [vehiculos, setVehiculos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [clientes, setClientes] = useState([]);
    const [opcionesClientes, setOpcionesClientes] = useState([]);


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Cálculo de paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = vehiculos.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(vehiculos.length / itemsPerPage);

    const servicios = [
        { cedula: '123456789', nombre: 'Juan Perez', ciudad: 'Bogotá' },
        { cedula: '987654321', nombre: 'Maria Gomez', ciudad: 'Medellín' },

    ];

    const [vehiculo, setVehiculo] = useState({
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

    };

    const lineas = Object.keys(lineasYmarcas);
    const marcas = vehiculo.linea ? lineasYmarcas[vehiculo.linea] : [];

    const handleChange = (e, selectedOption) => {
        console.log(selectedOption, "select"); 
        if (selectedOption) {
            // Lógica para manejar el cambio de cliente
            setVehiculo(prevData => ({
                ...prevData,
                cliente: {
                    id: selectedOption.value,
                },
            }));
        }else {
            // Lógica para manejar cambios en los inputs
            const { name, value } = e.target;
            setVehiculo(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSelectChange = (selectedOption) => {
        if (selectedOption) {
            setVehiculo(prevData => ({
                ...prevData,
                cliente: {
                    id: selectedOption.value,
                },
            }));
        }
    };

    useEffect(() => {
        cargarVehiculos();
        obtenerClientes();
    }, []);

    const cargarVehiculos = async () => {
        const resultado = await axios.get(urlBase);
        console.log("Resultado de cargar Vehiculos");
        console.log(resultado.data);
        setVehiculos(resultado.data);
    }

    const eliminarVehiculo = async (id) => {
        await axios.delete(`${urlBase}/${id}`);
        cargarVehiculos();
    };



    // const onSubmit = async (e) => {
    //     e.preventDefault();
    //     const urlBase = "http://localhost:8080/serviteca/vehiculos";
    //     await axios.post(urlBase, vehiculo);
    //     // Arreglar el redireccionamiento !!!
    //     // navegacion("/agregarvehiculo")
    //     navegacion("/listadoVehiculo")

    // }

    // Función para exportar a Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(vehiculos.map(vehiculo => ({
            "Placa": vehiculo.placa,
            "Observación": vehiculo.observacion,
            "Modelo": vehiculo.modelo,
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
        const tableColumn = ["Placa", "Observación", "Modelo"];
        const tableRows = [];

        vehiculos.forEach(vehiculo => {
            const vehiculoData = [
                vehiculo.placa,
                vehiculo.observacion,
                vehiculo.modelo,

            ];
            tableRows.push(vehiculoData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.text("Listado de vehiculos", 14, 15);
        doc.save("listado_vehiculos.pdf");
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
        console.log(vehiculo.cliente);
        try {
            // Preparar datos del vehículo
            const jSonBody = {
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
            setVehiculo({
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

            <div style={{ height: "450px" }}>
                <form onSubmit={(e) => handleSubmit(e)} className='container' style={{ width: "580px", position: "relative", height: "310px" }} >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                        <div className="col">
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="placa" className="form-label">Placa: *</label>
                                    <input type="text" className="form-control" id="placa" name='placa' style={{ width: "320px" }}
                                        value={vehiculo.placa} required onChange={(e) => handleChange(e)} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="linea" className="form-label">Marca: *</label>
                                    <select className="form-select" id='linea' name='linea' required value={vehiculo.linea} onChange={(e) => handleChange(e)}>
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
                                    <select className="form-select" id='marca' name='marca' required value={vehiculo.marca} onChange={(e) => handleChange(e)} >
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
                                        required value={vehiculo.modelo} onChange={(e) => handleChange(e)} />
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
                            <div className="col">
                                <label htmlFor="fotoimg" className="form-label">Foto: *</label>
                                <div className="col-md-6 d-flex align-items-center">
                                    <div className="w-50">
                                        <div className="card" style={{ width: '329px', height: '130px', overflow: "hidden" }}>
                                            {image && <img src={URL.createObjectURL(image)} className='' alt="Foto-subida" style={{ objectFit: "fill", zIndex: "2", width: "191px", height: "100px", top: "10px", left: "18px", position: "relative" }} />}
                                            <input
                                                type="file"
                                                className="form-control-file d-none"
                                                id="fotoimg"
                                                name='fotoimg'
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
                                            required value={vehiculo.observacion} onChange={(e) => handleChange(e)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='text-center'>
                            <button type="submit" className="btnncolor btn-sm me-3" data-bs-toggle="modal" data-bs-target="#modalagregarvehiculo">
                                <i className="fa-regular fa-floppy-disk"></i> Guardar
                            </button>
                            <ModalGuardar />
                        </div>
                    </div>
                </form>
            </div>


            {/* Contenedor del formulario y la tabla */}
            <div className='d-flex'>
                <div className='container'>
                    {/* Tabla de servicios */}
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
                    <table className="container" style={{ marginTop: "15px" }}>
                        <thead >
                            <tr className='tr-table-tr text-center'>
                                <th className='text-letras colorthead text-center' scope="col">Placa</th>
                                <th className='text-letras colorthead text-center' scope="col">Observación</th>
                                <th className='text-letras colorthead text-center' scope="col">Modelo</th>
                                <th className='text-letras colorthead text-center' scope="col">Editar</th>
                                <th className='text-letras colorthead text-center' scope="col">Borrar</th>
                            </tr>

                        </thead>
                        <tbody>
                            {currentItems.map((vehiculo, indice) => (
                                <tr className='tr-table-tr text-center' key={indice}>
                                    <td>{vehiculo.placa}</td>
                                    <td>{vehiculo.observacion}</td>
                                    <td>{vehiculo.modelo}</td>
                                    <td className='text-center'>
                                        <Link to={`/EditarVehiculo/${vehiculo.id}`} className='btn btn-sm me-3'>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <button data-bs-toggle="modal" data-bs-target="#modaleliminarcliente" onClick={() => eliminarVehiculo(vehiculo.id)} className='btn btn-sm'>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                        <ModalEliminar />
                                    </td>
                                </tr>
                            ))}
                            <tr className='container'>
                                <th className='text-letras colorthead' style={{ padding: "10px 0px" }} scope="col"></th>
                                <th className='text-letras colorthead' scope="col"></th>
                                <th className='text-letras colorthead' scope="col"></th>
                                <th className='text-letras colorthead' scope="col"></th>
                                <th className='text-letras colorthead' scope="col">  </th>

                            </tr>
                        </tbody>

                    </table>
                    {/* Paginación */}
                    <div class="h4 pb-2 mb-4  border-bottom border-black"></div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h6><span>Mostrando {currentPage} de {totalPages}</span></h6>
                        <div className="d-flex justify-content-start  justify-content-end">

                            <button
                                className="btn btn-secondary me-2"
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>
                            <button type="button" class="btn btn-light"><span>{currentPage}</span></button>
                            <button
                                className="btn btn-secondary ms-2"
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
