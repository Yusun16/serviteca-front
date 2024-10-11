import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from 'axios';
import ModalEliminarCliente from './modalEliminarCliente';
import ModalGuardarCliente from './modalGuardarCliente';

export default function AgregarCliente() {


    let navegacion = useNavigate();

    const urlBase = "http://localhost:8080/serviteca/cliente";
    const [vehiculos, setClientes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Cálculo de paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = vehiculos.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(vehiculos.length / itemsPerPage);

    const [cliente, setCliente] = useState({
        cedula: "",
        nombre: "",
        apellido: "",
        correo: "",
        direccion: "",
        telefono: "",
        departamento: "",
        ciudad: "",
        razonSocial: "",
        nit: "",
       
    });

    const { cedula, nombre, apellido, correo, direccion, telefono, departamento, ciudad } = cliente;

    const onInputChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const [isJuridico, setIsJuridico] = useState(true);

    const handleSwitchChange = () => {
        setIsJuridico(!isJuridico);
    };

    // JSON de departamentos y ciudades de Colombia
    const departamentosYciudades = {
        "Amazonas": ["Leticia", "Puerto Nariño", "El Encanto",],
        "Antioquía": ["Medellín", "Bello", "Envigado"],
        "Arauca": ["Arauca", "Arauquita"],
        "Atlántico": ["Barranquilla", "Soledad"],
        "Bolívar": ["Cartagena", "Magangué"],
        "Boyacá": ["Tunja"],
        "Caldas": ["Manizales"],
        "Caquetá": ["Florencia"],
        "Casanare": ["Yopal"],
        "Cauca": ["Popayán"],
        "Cesar": ["Cesar"],
        "Chocó": ["Quibdó"],
        "Córdoba": ["Montería"],
        "Cundinamarca": ["Bogotá"],
        "Guainía": ["Inírida"],
        "Guaviare": ["San José del Guaviare"],
        "Huila": ["Neiva"],
        "La Guajira": ["Riohacha"],
        "Meta": ["Villavicencio"],
        "Nariño": ["San Juan de Pasto"],
        "Norte de Santander": ["San José de Cúcuta"],
        "Putumayo": ["Mocoa"],
        "Quindío": ["Armenia"],
        "Risaralda": ["Pereira"],
        "San Andrés y Providencia": ["San Andrés"],
        "Santander": ["Bucaramanga"],
        "Sucre": ["Sincelejo"],
        "Tolima": ["Ibagué"],
        "Valle del Cauca": ["Cali"],
        "Vaupés": ["Mitú"],
        "Vichada": ["Puerto Carreño"],



        // Agrega más departamentos y ciudades según sea necesario
    };

    const departamentos = Object.keys(departamentosYciudades);
    const ciudades = cliente.departamento ? departamentosYciudades[cliente.departamento] : [];

    const clientes = [
        { cedula: '123456789', nombre: 'Juan Perez', ciudad: 'Bogotá' },
        { cedula: '987654321', nombre: 'Maria Gomez', ciudad: 'Medellín' },
        // Agrega más objetos según sea necesario
    ];

    useEffect(() => {
        cargarClientes();
    }, []);

    const cargarClientes = async () => {
        const resultado = await axios.get(urlBase);
        console.log("Resultado de cargar Vehiculos");
        console.log(resultado.data);
        setClientes(resultado.data);
    }

    const eliminarCliente = async (id) => {
        await axios.delete(`${urlBase}/${id}`);
        cargarClientes();
    };

    

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(clientes.map(cliente => ({
            "Cedula": cliente.cedula,
            "Nombre": cliente.nombre,
            "Ciudad": cliente.ciudad,
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Clientes");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "Clientes Agregados.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Clientes Agregados', 20, 10);
        doc.autoTable({
            head: [['Cedula', 'Nombre', 'Ciudad']],
            body: clientes.map(cliente => [
                cliente.cedula,
                cliente.nombre,
                cliente.ciudad,
            ]),
        });
        doc.save('listado_clientes.pdf');
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "http://localhost:8080/serviteca/cliente";
        await axios.post(urlBase, cliente);
        // navegacion("/listadoCliente");
    }

    return (
        <div className='container'>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">Inicio</li>
                    <li className="breadcrumb-item">Cliente</li>
                    <li className="breadcrumb-item active" aria-current="page">Agregar</li>
                </ol>
            </nav>
            <div className='container' style={{ margin: "30px" }}>
                <h3> Agregar Cliente</h3>
            </div>

            <div className="col">
                <div className="mb-3">
                    <div className="form-check form-switch form-check-reverse">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckReverse"
                            style={{ position: "relative", right: "790px", height: "30px", width: "50px" }}
                            onChange={handleSwitchChange} checked={isJuridico} />
                        <label className="form-check-label" htmlFor="flexSwitchCheckReverse"
                            style={{ position: "relative", right: "807px", height: "30px", textAlign: "center" }}>
                            {isJuridico ? 'Jurídico: *' : 'Natural: *'}
                        </label>
                    </div>
                </div>
            </div>

            <div style={{ height: "350px" }}>
                <form onSubmit={(e) => onSubmit(e)} className='container' style={{ width: "580px", position: "relative", height: "310px" }}>
                    {(isJuridico) && (
                        <>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                                <div className="col">
                                    <div className="mb-3">
                                        <label htmlFor="cedula" className="form-label">NIT: *</label>
                                        <input type="number" className="form-control" id="cedula" name='cedula' required style={{ width: "320px" }} value={cedula} onChange={(e) => onInputChange(e)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Razón social: *</label>
                                        <input type="text" className="form-control" required id="nombre" name='nombre' value={nombre} onChange={(e) => onInputChange(e)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="correo" className="form-label">Correo: *</label>
                                        <input type="text" className="form-control" id="correo" required name='correo' value={correo} onChange={(e) => onInputChange(e)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="direccion" className="form-label">Dirección: *</label>
                                        <input type="text" className="form-control" id="direccion" required name='direccion' value={direccion} onChange={onInputChange} />
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-3">
                                        <label htmlFor="telefono" className="form-label">Teléfono: *</label>
                                        <input type="number" className="form-control" id="telefono" required name='telefono' value={telefono} onChange={(e) => onInputChange(e)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="departamento" className="form-label">Departamento: *</label>
                                        <div>
                                            <select className="form-select" id="departamento" name='departamento' value={departamento} onChange={(e) => onInputChange(e)}>
                                                <option value=""></option>
                                                {departamentos.map((dep, index) => (
                                                    <option key={index} value={dep}>{dep}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="ciudad" className="form-label">Ciudad: *</label>
                                        <div>
                                            <select className="form-select" id="ciudad" name='ciudad' value={ciudad} onChange={(e) => onInputChange(e)}>
                                                <option value=""></option>
                                                {ciudades.map((ciu, index) => (
                                                    <option key={index} value={ciu}>{ciu}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>
                    )}
                    {(!isJuridico) && (
                        <>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                                <div className="col">
                                    <div className="mb-3">
                                        <label htmlFor="cedula" className="form-label">Cedula: *</label>
                                        <input type="number" className="form-control" id="cedula" name='cedula' required style={{ width: "320px" }}
                                            value={cedula} onChange={(e) => onInputChange(e)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Nombre: *</label>
                                        <input type="text" className="form-control" required id="nombre" name='nombre'
                                            value={nombre} onChange={(e) => onInputChange(e)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="apellido" className="form-label">Apellido: *</label>
                                        <input type="text" className="form-control" id="apellido" required name='apellido'
                                            value={apellido} onChange={(e) => onInputChange(e)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="correo" className="form-label">Correo: *</label>
                                        <input type="text" className="form-control" id="correo" required name='correo'
                                            value={correo} onChange={(e) => onInputChange(e)} />
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-3">
                                        <label htmlFor="direccion" className="form-label">Dirección: *</label>
                                        <input type="text" className="form-control" id="direccion" name='direccion' style={{ width: "320px" }}
                                            required value={direccion} onChange={(e) => onInputChange(e)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="telefono" className="form-label">Teléfono: *</label>
                                        <input type="number" className="form-control" id="telefono" required name='telefono'
                                            value={telefono} onChange={(e) => onInputChange(e)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="departamento" className="form-label">Departamento: *</label>
                                        <div>
                                            <select className="form-select" id="departamento" name='departamento' value={departamento} onChange={(e) => onInputChange(e)}>
                                                <option value=""></option>
                                                {departamentos.map((dep, index) => (
                                                    <option key={index} value={dep}>{dep}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="ciudad" className="form-label">Ciudad: *</label>
                                        <div>
                                            <select className="form-select" id="ciudad" name='ciudad' value={ciudad} onChange={(e) => onInputChange(e)}>
                                                <option value=""></option>
                                                {ciudades.map((ciu, index) => (
                                                    <option key={index} value={ciu}>{ciu}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <div className='text-center'>
                        <button type="submit" className="btn btn-success btn-sm me-3"  data-bs-toggle="modal" data-bs-target="#modalagregarcliente">
                            <i className="fa-regular fa-floppy-disk" >
                            </i> Guardar</button>
                       <ModalGuardarCliente />
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
                                <th className='text-letras colorthead text-center' scope="col">Cedula</th>
                                <th className='text-letras colorthead text-center' scope="col">Nombre</th>
                                <th className='text-letras colorthead text-center' scope="col">Ciudad</th>
                                <th className='text-letras colorthead text-center' scope="col">Editar</th>
                                <th className='text-letras colorthead text-center' scope="col">Borrar</th>
                            </tr>

                        </thead>
                        <tbody>
                            {currentItems.map((cliente, indice) => (
                                <tr className='tr-table-tr text-center' key={indice}>
                                    <td>{cliente.cedula}</td>
                                    <td>{cliente.nombre}</td>
                                    <td>{cliente.ciudad}</td>
                                    <td className='text-center'>
                                        <Link to={`/EditarCliente/${cliente.id}`} className='btn btn-sm me-3'>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <button data-bs-toggle="modal" data-bs-target="#modaleliminarcliente" onClick={() => eliminarCliente(cliente.id)} className='btn btn-sm'>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                        <ModalEliminarCliente />
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