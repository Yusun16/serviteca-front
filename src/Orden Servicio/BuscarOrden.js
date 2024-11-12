import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BuscarOrden() {
    const urlBase = "http://localhost:8080/serviteca";
    const [ordenes, setOrdenes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);
    const navigate = useNavigate();  // Hook para redirigir a otra vista

    // Estados para los campos de búsqueda
    const [codigo, setCodigo] = useState('');
    const [cliente, setCliente] = useState('');
    const [fecha, setFecha] = useState('');
    const [placaVehiculo, setPlacaVehiculo] = useState('');

    const handleBuscar = async (e) => {
        e.preventDefault();

        const filtros = {};
        if (codigo) filtros.codigo = codigo;
        if (cliente) filtros.nombreCliente = cliente;
        if (fecha) filtros.fecha = fecha;
        if (placaVehiculo) filtros.placa = placaVehiculo;

        await cargarOrdenes(filtros);
        setCurrentPage(1); // Reinicia la paginación
    };

    const cargarOrdenes = async (filtros) => {
        const token = localStorage.getItem('token');
        try {
            const resultado = await axios.get(`${urlBase}/buscarorden`, {
                params: filtros,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOrdenes(resultado.data);
        } catch (error) {
            console.error("Error al cargar las órdenes:", error);
        }
    };

    useEffect(() => {
        cargarOrdenes({});
    }, []);

    // Paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ordenes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(ordenes.length / itemsPerPage);

    const goToPreviousPage = () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    const goToNextPage = () => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));

    // Redirigir a la vista de ejecución y almacenar el idOrden en localStorage
    const handleRowClick = (idOrden) => {
        localStorage.setItem('idOrden', idOrden);  // Guarda el idOrden en localStorage
        navigate('/ejecucionservicio');  // Redirige a la vista de ejecución
    };

    return (
        <div>
            <div className='container'>
                {/* Breadcrumb */}
                <nav aria-label="breadcrumb" className='breadcrumb002'>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item breadcrumb001">
                            <i className="fa-solid fa-house"></i>
                            Inicio
                        </li>
                        <li className="breadcrumb-item active breadcrumb003" aria-current="page">Buscar Orden</li>
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
                                        <label htmlFor="codigo" className="col-sm-3 col-form-label">N° de servicio:</label>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control" id="codigo" name='codigo' value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 mb-3">
                                    <div className="mb-3 row">
                                        <label htmlFor="cliente" className="col-sm-3 col-form-label">Cliente:</label>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control" id="cliente" name='cliente' value={cliente} onChange={(e) => setCliente(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 mb-3">
                                    <div className="mb-3 row">
                                        <label htmlFor="fecha" className="col-sm-3 col-form-label">Fecha de Ingreso:</label>
                                        <div className="col-sm-6">
                                            <input type="date" className="form-control" id="fecha" name='fecha' value={fecha} onChange={(e) => setFecha(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 mb-3">
                                    <div className="mb-3 row">
                                        <label htmlFor="placaVehiculo" className="col-sm-3 col-form-label">Placa:</label>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control" id="placaVehiculo" name='placaVehiculo' value={placaVehiculo} onChange={(e) => setPlacaVehiculo(e.target.value)} />
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
            </div>

            {/* Tabla con resultados */}
            {ordenes.length > 0 && (
                <div className="container" style={{ maxWidth: "95%", display: "flex", justifyContent: "center" }}>
                    <div className="container" style={{ margin: "30px 0px" }}>
                        <h5>Seleccione el N° de servicio para abrir la ejecución</h5>
                        <table className="container">
                            <thead>
                                <tr>
                                    <th className='text-letras colorthead text-center' scope="col">Fecha de Servicio</th>
                                    <th className='text-letras colorthead text-center' scope="col">N° Kilometros</th>
                                    <th className='text-letras colorthead text-center' scope="col">N° de Servicio</th>
                                    <th className='text-letras colorthead text-center' scope="col">Nombre Operario</th>
                                    <th className='text-letras colorthead text-center' scope="col">N° Factura</th>
                                    <th className='text-letras colorthead text-center' scope="col">Observación</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((orden, index) => (
                                    <tr
                                        key={index}
                                        className='tr-table-tr text-center'
                                        onClick={() => handleRowClick(orden.idOrden)}  // Evento de clic en la fila
                                        style={{ cursor: 'pointer' }}  // Cambiar el cursor para indicar que es clickeable
                                    >
                                        <td>{orden.fecha}</td>
                                        <td>{orden.kilometraje}</td>
                                        <td>{orden.codigo}</td>
                                        <td>{orden.nombreOperario}</td>
                                        <td>{orden.numeroFactura}</td>
                                        <td>{orden.observacion}</td>
                                    </tr>
                                ))}
                                <tr  >
                                    <th className='text-letras colorthead ' style={{ padding: "10px 0px" }} scope="col"></th>
                                    <th className='text-letras colorthead' scope="col"></th>
                                    <th className='text-letras colorthead' scope="col"></th>
                                    <th className='text-letras colorthead' scope="col"></th>
                                    <th className='text-letras colorthead' scope="col">  </th>
                                    <th className='text-letras colorthead'></th>
                                </tr>
                            </tbody>
                        </table>
                        {/* Paginación */}
                        <div className='container' style={{ margin: "30px 0px" }}>
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
                    </div>
                </div>

            )}
        </div>
    );
}
