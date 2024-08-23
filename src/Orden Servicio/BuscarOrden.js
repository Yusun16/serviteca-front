import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function BuscarOrden() {
    const urlBase = "http://localhost:8080/serviteca/ordenservicios";

    const [ordenes, setOrdenes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);

    useEffect(() => {
        cargarOrdenes();
    }, []);

    const cargarOrdenes = async () => {
        const resultado = await axios.get(urlBase);
        setOrdenes(resultado.data);
    }

    // Paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ordenes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(ordenes.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='container'>
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="/agregarorden"><i className="fa-solid fa-house"></i> Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Buscar Orden</li>
                </ol>
            </nav>

            {/* Formulario de búsqueda */}
            <div className='d-flex justify-content-center' style={{ margin: "30px" }}>
                <div className='w-100' style={{ maxWidth: "600px" }}>
                    <h6 className='mb-3 text-center'>Buscar Orden de Servicio</h6>
                    <form>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <div className="d-flex align-items-center">
                                    <label htmlFor="numeroServicio" className="form-label me-3">N° de servicio:</label>
                                    <input type="number" className="form-control form-control-sm" id="numeroServicio" />
                                </div>
                            </div>
                            <div className="col-12 mb-3">
                                <div className="d-flex align-items-center">
                                    <label htmlFor="cliente" className="form-label me-3">Cliente:</label>
                                    <input type="text" className="form-control form-control-sm" id="cliente" name="cliente" />
                                </div>
                            </div>
                            <div className="col-12 mb-3">
                                <div className="d-flex align-items-center">
                                    <label htmlFor="fecha" className="form-label me-3">Fecha de ingreso:</label>
                                    <input type="date" className="form-control form-control-sm" id="fecha" name='fecha' />
                                </div>
                            </div>
                            <div className="col-12 mb-3">
                                <div className="d-flex align-items-center">
                                    <label htmlFor="placa" className="form-label me-3">Placa:</label>
                                    <input type="text" className="form-control form-control-sm" id="placa" name='placa' />
                                </div>
                            </div>
                            <div className="col-12 text-center">
                                <button type="submit" className="btn btn-success">
                                    <i className="fa-solid fa-magnifying-glass"></i> Buscar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Tabla con resultados */}
            <div className='container' style={{ margin: "30px" }}>
                <table className="table table-striped table-hover align-middle">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Orden de servicio</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Tipo de servicio</th>
                            <th scope="col">Placa del vehículo</th>
                            <th scope="col">Kilometraje del Vehículo</th>
                            <th scope="col">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((orden, indice) => (
                            <tr key={indice}>
                                <th scope="row">{orden.idOrden}</th>
                                <td>{orden.cliente}</td>
                                <td>{orden.tipoServicio}</td>
                                <td>{orden.placaVehiculo}</td>
                                <td>{orden.kilometraje}</td>
                                <td>{orden.fecha}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className='container' style={{ margin: "30px" }}>
                <div className='d-flex justify-content-between'>
                    <h6>Mostrando {currentPage} de {totalPages}</h6>
                    <ul className='pagination'>
                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                <button onClick={() => paginate(index + 1)} className='page-link'>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
