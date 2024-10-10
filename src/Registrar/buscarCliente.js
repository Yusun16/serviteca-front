import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ModalEliminar from './modalEliminar';

export default function BuscarCliente() {
    const urlBase = "http://localhost:8080/serviteca/cliente";
    const [clientes, setClientes] = useState([]);
    const [cedula, setCedula] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showTable, setShowTable] = useState(false);
    const itemsPerPage = 8;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams();
        if (cedula) queryParams.append('cedula', cedula);
        if (correo) queryParams.append('correo', correo);
        if (telefono) queryParams.append('telefono', telefono);

        const response = await axios.get(`${urlBase}/buscar?${queryParams.toString()}`);
        setClientes(response.data);
        setShowTable(true);
    };

    useEffect(() => {
        cargarClientes();
    }, []);

    const cargarClientes = async () => {
        const resultado = await axios.get(urlBase);
        console.log("Resultado de cargar Clientes");
        console.log(resultado.data);
        setClientes(resultado.data);
    }

    const eliminarCliente = async (id) => {
        await axios.delete(`${urlBase}/${id}`);
        cargarClientes();
    };

    // Paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = clientes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(clientes.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["Cédula/NIT", "Correo", "Teléfono"];
        const tableRows = [];

        clientes.forEach(cliente => {
            const clienteData = [
                cliente.cedula,
                cliente.correo,
                cliente.telefono,
            ];
            tableRows.push(clienteData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.text("Busqueda de Clientes", 14, 15);
        doc.save("Buscar_Cliente.pdf");
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(clientes.map(cliente => ({
            "Cédula/NIT": cliente.cedula,
            "Correo": cliente.correo,
            "Teléfono": cliente.telefono,
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Clientes");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "listado_clientes.xlsx");
    };

    return (
        <div className='container'>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">Inicio</li>
                    <li className="breadcrumb-item">Cliente</li>
                    <li className="breadcrumb-item active" aria-current="page">Buscar</li>
                </ol>
            </nav>
            <div className='container' style={{ margin: "30px" }}>
                <h3>Buscar Cliente</h3>
                <div className='text'>
                    <p style={{ position: "relative", left: "250px" }}>Buscar por: </p>
                </div>
            </div>
            <form className='container' onSubmit={handleSubmit} style={{ width: "554px" }}>
                <div className="mb-3">
                    <label htmlFor="cedula" className="form-label">Cédula/NIT: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="cedula"
                        name='cedula'
                        required
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="correo" className="form-label">Correo: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="correo"
                        name='correo'
                        required
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">Teléfono: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="telefono"
                        name='telefono'
                        required
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-center btncolor">
                        <i className="fa-solid fa-magnifying-glass"></i> Buscar
                    </button>
                </div>
            </form>

            {showTable && (
                <div className='container'>
                    <div className="container nav justify-content-end">
                        <button className="fa-sharp fa-solid fa-file-pdf p-2 g-col-6"
                            style={{ listStyle: "none", color: "black", fontSize: "31px", background: "none", border: "none" }}
                            onClick={exportToPDF}>
                        </button>
                        <button className="fa-sharp fa-solid fa-file-excel p-2 g-col-6"
                            style={{ listStyle: "none", color: "black", fontSize: "31px", background: "none", border: "none" }}
                            onClick={exportToExcel}>
                        </button>
                    </div>
                    <table className="container" style={{ marginTop: "5px" }}>
                        <thead>
                            <tr>
                                <th className='text-letras colorthead text-center' scope="col">Cédula/NIT</th>
                                <th className='text-letras colorthead text-center' scope="col">Correo</th>
                                <th className='text-letras colorthead text-center' scope="col">Teléfono</th>
                                <th className='text-letras colorthead text-center'>Editar</th>
                                <th className='text-letras colorthead text-center'>Borrar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((cliente, indice) => (
                                <tr className='tr-table-tr text-center' key={indice}>
                                    <td>{cliente.cedula}</td>
                                    <td>{cliente.correo}</td>
                                    <td>{cliente.telefono}</td>
                                    <td className='text-center'>
                                        <Link to={`/EditarCliente/${cliente.id}`} className='btn btn-sm me-3'>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <button data-bs-toggle="modal" data-bs-target="#modaleliminarcliente" onClick={() => eliminarCliente(cliente.id)} className='btn btn-sm'>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                        <ModalEliminar />
                                    </td>
                                </tr>

                            ))}
                            <tr >
                                <th className='text-letras colorthead ' style={{ padding: "10px 0px" }} scope="col"></th>
                                <th className='text-letras colorthead' scope="col"></th>
                                <th className='text-letras colorthead' scope="col"></th>
                                <th className='text-letras colorthead' scope="col"></th>
                                <th className='text-letras colorthead' scope="col">  </th>
                            </tr>
                        </tbody>
                    </table>

                    {/* Paginación */}
                    <div className="h4 pb-2 mb-4 border-bottom border-black"></div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h6><span>Mostrando {currentPage} de {totalPages}</span></h6>
                        <div className="d-flex justify-content-start justify-content-end">
                            <button
                                className="btn btn-secondary me-2"
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>
                            <button type="button" className="btn btn-light"><span>{currentPage}</span></button>
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
            )}
        </div>
    );
}
