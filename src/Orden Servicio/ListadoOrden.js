import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ListadoOrden() {
    const urlBase = "http://localhost:8080/serviteca/ordenservicios";
    const [ordenes, setOrdenes] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7); // Items por página

    // Cargar órdenes y clientes al montar el componente
    useEffect(() => {
        cargarOrdenes();
        obtenerClientes();
    }, []);

    const cargarOrdenes = async () => {
        try {
            const resultado = await axios.get(urlBase);
            setOrdenes(resultado.data);
        } catch (error) {
            console.error("Error al cargar órdenes", error);
        }
    };

    const obtenerClientes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/serviteca/cliente');
            setClientes(response.data);
        } catch (error) {
            console.error("Error al obtener los clientes", error);
        }
    };

    // Paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ordenes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(ordenes.length / itemsPerPage);

    const goToPreviousPage = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    const goToNextPage = () => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));

    return (
        <div className='container'>
            <div className="container text-center" style={{ margin: "30px" }}>
                <h3>Listado de Órdenes de Servicio</h3>
            </div>

            <div className='container text-center' style={{ margin: "30px" }}>
                <Link type="button" className="btn btn-center btn-primary" to="/agregarorden">Agregar Servicio</Link>
            </div>

            <table className="table table-striped table-hover align-middle">
                <thead className='table text-center'>
                    <tr>
                        <th scope="col colorthead">Fecha de Servicio</th>
                        <th scope="col colorthead">N° Kilómetros</th>
                        <th scope="col colorthead">N° de Servicio</th>
                        <th scope="col colorthead">Cliente</th>
                        <th scope="col colorthead">Tipo de Servicio</th>
                        <th scope="col colorthead">Placa del Vehículo</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((orden, indice) => {
                        // Buscar el cliente correspondiente utilizando el cliente_id
                        const clienteEncontrado = clientes.find(c => c.id === orden.clienteId?.id);
                        const nombreCompleto = clienteEncontrado ? `${clienteEncontrado.nombre} ${clienteEncontrado.apellido}` : 'Orden sin cliente';
                        return (
                            <tr className='tr-table-tr text-center' key={indice}>
                                <td>{orden.fecha}</td>
                                <td>{orden.kilometraje}</td>
                                <th>{orden.codigo}</th>
                                <td>{nombreCompleto}</td>
                                <td>{orden.tipoServicio}</td>
                                <td>{orden.placaVehiculo}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Paginación */}
            {ordenes.length > 0 && (
                <div className='container' style={{ margin: "30px" }}>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <span>Mostrando {currentPage} de {totalPages}</span>
                        </div>
                        <div className='pag-num'>
                            <button
                                onClick={goToPreviousPage}
                                className="btn btn-secondary"
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>
                            <div>
                                <button type="button" className="btn btn-light"><span>{currentPage}</span></button>
                            </div>
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
