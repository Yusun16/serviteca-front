import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ModalEliminar from './modalEliminar';

export default function BuscarServicio() {
    const urlBase = "http://localhost:8080/serviteca/servicios";
    const [servicios, setServicios] = useState([]);
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showTable, setShowTable] = useState(false); // Estado para controlar la visibilidad de la tabla
    const itemsPerPage = 8;

    useEffect(() => {
        cargarServicios();
    }, []);

    const cargarServicios = async () => {
        const resultado = await axios.get(urlBase);
        setServicios(resultado.data);
    };

    const eliminarServicio = async (id) => {
        await axios.delete(`${urlBase}/${id}`);
        cargarServicios();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams();
        if (codigo) queryParams.append('codigo', codigo);
        if (descripcion) queryParams.append('descripcion', descripcion);

        const response = await axios.get(`${urlBase}/buscar?${queryParams.toString()}`);
        setServicios(response.data);
        setShowTable(true); // Mostrar la tabla después de realizar la búsqueda
    };

    // Calcular el índice del primer y último elemento de la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Extraer los elementos de la página actual
    const currentItems = servicios.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(servicios.length / itemsPerPage);

    // Función para cambiar de página
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["Codigo", "Descripción", "Valor del Servicio", "Año", "Porcentaje del Operario"];
        const tableRows = [];

        servicios.forEach(servicio => {
            const servicioData = [
                servicio.codigo,
                servicio.descripcion,
                `$${servicio.valorServicio.toLocaleString()}`,
                servicio.ano,
                `${servicio.porcentajeOperario}%`
            ];
            tableRows.push(servicioData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.text("Busqueda de Servicio", 14, 15);
        doc.save("Buscar_Servicio.pdf");
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(servicios.map(servicio => ({
            "Codigo": servicio.codigo,
            "Descripción": servicio.descripcion,
            "Valor del Servicio": servicio.valorServicio,
            "Año": servicio.ano,
            "Porcentaje del Operario": servicio.porcentajeOperario
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Servicios");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "listado_servicios.xlsx");
    };

    return (
        <>
            <div className='container'>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Inicio</li>
                        <li className="breadcrumb-item active" aria-current="page">Servicios</li>
                        <li className="breadcrumb-item active" aria-current="page">Buscar</li>
                    </ol>
                </nav>
                <div className='container' style={{ margin: "30px" }}>
                    <h3>Buscar Servicio</h3>
                    <div className='text'>
                        <p style={{ position: "relative", left: "250px" }}>Buscar por: </p>
                    </div>
                </div>
                <form className='container' onSubmit={handleSubmit} style={{ width: "554px" }}>
                    <div className="mb-3">
                        <label htmlFor="codigo" className="form-label">Codigo: *</label>
                        <input type="number" className="form-control" id="codigo" name='codigo' required value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descripcion" className="form-label" style={{ resize: "none" }} >Descripción: *</label>
                        <textarea style={{ resize: "none" }} className="form-control" rows={5} id="descripcion" required name='descripcion' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="btn btn-center btncolor"> <i class="fa-solid fa-magnifying-glass"></i> Buscar</button>
                    </div>


                </form>
            </div>


            {showTable && ( // Mostrar tabla solo si showTable es true
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
                        <thead className=''>
                            <tr>
                                <th className='text-letras colorthead text-center' scope="col">Codigo Servicio</th>
                                <th className='text-letras colorthead text-center' scope="col">Descripción Servicio</th>
                                <th className='text-letras colorthead text-center' scope="col">Porcentaje</th>
                                <th className='text-letras colorthead text-center' scope="col">Valor del Servicio</th>

                                <th className='text-letras colorthead text-center'>Editar</th>
                                <th className='text-letras colorthead text-center'>Borrar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((servicio, indice) => (
                                <tr className='tr-table-tr text-center' key={indice}>
                                    <td>{servicio.codigo}</td>
                                    <td>{servicio.descripcion}</td>
                                    <td>
                                        <NumericFormat
                                            value={servicio.porcentajeOperario}
                                            displayType={'text'}
                                            thousandSeparator=","
                                            decimalScale={2}
                                            renderText={(value) => `${value}%`}
                                        />
                                    </td>
                                    <td>
                                        <NumericFormat
                                            value={servicio.valorServicio}
                                            displayType={'text'}
                                            thousandSeparator=","
                                            prefix='$'
                                            decimalScale={2}
                                        />
                                    </td>

                                    <td className='text-center'>
                                        <Link to={`/editar/${servicio.idServicio}`} className='btn btn-sm me-3'>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <button data-bs-toggle="modal" data-bs-target="#modaleliminar" onClick={() => eliminarServicio(servicio.idServicio)} className='btn btn-sm'>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                        <ModalEliminar />
                                    </td>
                                </tr>
                            ))}
                            <tr  >
                                <th className='text-letras colorthead' style={{ padding: "10px 0px" }} scope="col"></th>
                                <th className='text-letras colorthead' scope="col"></th>
                                <th className='text-letras colorthead' scope="col"></th>
                                <th className='text-letras colorthead' scope="col"></th>
                                <th className='text-letras colorthead' scope="col">  </th>
                                <th className='text-letras colorthead'></th>
                                <th className='text-letras colorthead'> </th>
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
            )}
        </>
    );
}
