import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ListadoVehiculo() {
    const servicios = [
        { codigo: '001', descripcion: 'Servicio 1', valorServicio: 100, año: 2023, porcentajeOperario: 10 },
        { codigo: '002', descripcion: 'Servicio 2', valorServicio: 200, año: 2024, porcentajeOperario: 15 },
        // Agrega más objetos según sea necesario
    ];

    const urlBase = "http://localhost:8080/serviteca/vehiculos";

    const [vehiculos, setVehiculos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

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
    
      const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(vehiculos.map(vehiculo => ({
          "Placa": vehiculo.placa,
          "Observación": vehiculo.observacion,
          "Modelo": vehiculo.modelo,
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Vehiculos");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "listado_vehiculos.xlsx");
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

    return (
        <div className='container'>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">Inicio</li>
                    <li className="breadcrumb-item active" aria-current="page">Vehiculo</li>
                </ol>
            </nav>

            <div className='container' style={{ margin: "30px" }}>
                <h4>Vehiculo</h4>
            </div>
            <div className='container text-center' style={{ margin: "30px", display: "flex", justifyContent: "center", gap: "84px" }} >
                <Link type="button" className="btn btn-center btncolor" to="/agregarvehiculo" style={{ width: "280px", height: "50px" }}>Agregar Vehiculo</Link>
                <Link type="button" className="btn btn-center btncolor" to="/buscarVehiculo" style={{ width: "280px", height: "50px" }}>Buscar Vehiculo</Link>
            </div>

            <div className="nav justify-content-end">
                <button className="fa-sharp fa-solid fa-file-pdf p-2 g-col-6"
                    style={{ listStyle: "none", color: "black", fontSize: "31px", background: "none", border: "none" }}
                    onClick={exportToPDF}>
                </button>
                <button className="fa-sharp fa-solid fa-file-excel p-2 g-col-6"
                    style={{ listStyle: "none", color: "black", fontSize: "31px", background: "none", border: "none" }}
                    onClick={exportToExcel}>
                </button>
            </div>

            <div>
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
                        {vehiculos.map((vehiculo, indice) => (
                            <tr className='tr-table-tr text-center' key={indice}>
                                <td>{vehiculo.placa}</td>
                                <td>{vehiculo.observacion}</td>
                                <td>{vehiculo.modelo}</td>
                                <td className='text-center'>
                                    <Link to={`/editar/${vehiculo.idVehiculo}`} className='btn btn-sm me-3'>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                </td>
                                <td>
                                    <button data-bs-toggle="modal" data-bs-target="#modaleliminar" onClick={() => eliminarVehiculo(vehiculo.idVehiculo)} className='btn btn-sm'>
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
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
    );
}
