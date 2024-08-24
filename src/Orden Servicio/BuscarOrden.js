import axios from 'axios';
import React, { useState } from 'react';

export default function BuscarOrden() {
    const urlBase = "http://localhost:8080/serviteca/ordenservicios";

    const [ordenes, setOrdenes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);

    // Estados para los campos de búsqueda
    const [numeroServicio, setNumeroServicio] = useState('');
    const [cliente, setCliente] = useState('');
    const [fecha, setFecha] = useState('');
    const [placa, setPlaca] = useState('');

    // Manejo del envío del formulario de búsqueda
    const handleBuscar = async (e) => {
        e.preventDefault();
        const filtros = {
            numeroServicio,
            cliente,
            fecha,
            placa
        };
        await cargarOrdenes(filtros);
        console.log(filtros);
        
        setCurrentPage(1); // Reinicia la paginación
    }

    const cargarOrdenes = async (filtros = {}) => {
        try {
            const resultado = await axios.get(urlBase, { params: filtros });
            setOrdenes(resultado.data);
        } catch (error) {
            console.error("Error al cargar las órdenes:", error);
        }
    }

    // Paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ordenes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(ordenes.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const goToPreviousPage = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    const goToNextPage = () => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));

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
                    <h6 className='mb-3 text-center' style={{ width: "296px", height: "34px" }}>Buscar Orden de Servicio</h6>
                    <form onSubmit={handleBuscar}>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <div className="mb-3 row">
                                    <label htmlFor="numeroServicio" className="col-sm-3 col-form-label">N° de servicio:*</label>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control" id="numeroServicio" name='numeroServicio' value={numeroServicio} onChange={(e) => setNumeroServicio(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mb-3">
                                <div className="mb-3 row">
                                    <label htmlFor="cliente" className="col-sm-3 col-form-label">Cliente:*</label>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control" id="cliente" name='cliente' value={cliente} onChange={(e) => setCliente(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mb-3">
                                <div className="mb-3 row">
                                    <label htmlFor="fecha" className="col-sm-3 col-form-label">Fecha de Ingreso:*</label>
                                    <div className="col-sm-6">
                                        <input type="date" className="form-control" id="fecha" name='fecha' value={fecha} onChange={(e) => setFecha(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mb-3">
                                <div className="mb-3 row">
                                    <label htmlFor="placa" className="col-sm-3 col-form-label">Placa:*</label>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control" id="placa" name='placa' value={placa} onChange={(e) => setPlaca(e.target.value)} />
                                    </div>
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
            {ordenes.length > 0 && (
                <div className='container' style={{ margin: "30px" }}>
                    <table className="table table-striped table-hover align-middle">
                        <thead>
                            <tr>
                                <th className='th-tabla !important' scope="col">Orden de servicio</th>
                                <th className='th-tabla !important' scope="col">Cliente</th>
                                <th className='th-tabla !important' scope="col">Tipo de servicio</th>
                                <th className='th-tabla !important' scope="col">Placa del vehículo</th>
                                <th className='th-tabla !important' scope="col">Kilometraje del Vehículo</th>
                                <th className='th-tabla !important' scope="col">Fecha</th>
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
                    <div class="h4 pb-2 mb-4 text-danger border-bottom border-dark"></div>
                </div>
            )}

            {/* Paginación */}
            {ordenes.length > 0 && (
                <div className='container' style={{ margin: "30px" }}>
                    <div className='d-flex justify-content-between align-items-center'>
                        {/* Texto de página actual */}
                        <div>
                            <span>Mostrando página {currentPage} de {totalPages}</span>
                        </div>
                        {/* Botones Anterior y Siguiente */}
                        <div className='d-flex align-items-center'>
                            <button
                                onClick={goToPreviousPage}
                                className="btn btn-secondary"
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>
                            <ul className='pagination mx-3 mb-0'>
                                {[...Array(totalPages)].map((_, index) => (
                                    <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                        <button onClick={() => paginate(index + 1)} className='page-link'>
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={goToNextPage}
                                className="btn btn-secondary"
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