import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ModalEliminar from './modalEliminar';

export default function BuscarVehiculo() {
    const urlBase = "http://localhost:8080/serviteca/vehiculos";
    const [vehiculos, setVehiculos] = useState([]);
    const [placa, setPlaca] = useState('');
    const [marca, setMarca] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showTable, setShowTable] = useState(false);
    const itemsPerPage = 8;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams();
        if (placa) queryParams.append('placa', placa);
        if (marca) queryParams.append('marca', marca);

        const response = await axios.get(`${urlBase}/buscar?${queryParams.toString()}`);
        setVehiculos(response.data);
        setShowTable(true);
    };

    useEffect(() => {
        cargarVehiculos();
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

    // Paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = vehiculos.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(vehiculos.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["Placa", "Marca", "Modelo"];
        const tableRows = [];

        vehiculos.forEach(vehiculo => {
            const vehiculoData = [
                vehiculo.placa,
                vehiculo.marca,
                vehiculo.modelo,
            ];
            tableRows.push(vehiculoData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.text("Busqueda de Vehiculos", 14, 15);
        doc.save("Buscar_Vehiculo.pdf");
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(vehiculos.map(vehiculo => ({
            "Placa": vehiculo.placa,
            "Marca": vehiculo.marca,
            "Modelo": vehiculo.modelo,
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Vehiculos");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "listado_vehiculos.xlsx");
    };

    return (
        <div className='container'>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">Inicio</li>
                    <li className="breadcrumb-item">Vehículo</li>
                    <li className="breadcrumb-item active" aria-current="page">Buscar</li>
                </ol>
            </nav>
            <div className='container' style={{ margin: "30px" }}>
                <h3>Buscar Vehículo</h3>
                <div className='text'>
                    <p style={{ position: "relative", left: "250px" }}>Buscar por: </p>
                </div>
            </div>
            <form className='container' onSubmit={handleSubmit} style={{ width: "554px" }}>
                <div className="mb-3">
                    <label htmlFor="placa" className="form-label">Placa: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="placa"
                        name='placa'
                        required
                        value={placa}
                        onChange={(e) => setPlaca(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="marca" className="form-label">Marca: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="marca"
                        name='marca'
                        required
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
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
                                <th className='text-letras colorthead text-center' scope="col">Placa</th>
                                <th className='text-letras colorthead text-center' scope="col">Marca</th>
                                <th className='text-letras colorthead text-center' scope="col">Modelo</th>
                                <th className='text-letras colorthead text-center'>Editar</th>
                                <th className='text-letras colorthead text-center'>Borrar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((vehiculo, indice) => (
                                <tr className='tr-table-tr text-center' key={indice}>
                                    <td>{vehiculo.placa}</td>
                                    <td>{vehiculo.marca}</td>
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
                            <tr  >
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
