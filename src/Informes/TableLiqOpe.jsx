import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';

function TableLiqOpe({ data }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    // Total de filas
    const totalRows = data.length;
    const totalPages = Math.ceil(totalRows / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return (
        <div>
            <table className='table001'>
                <thead>
                    <tr className='tr001'>
                        <th className='th001'>Cédula</th>
                        <th className='th001'>Nombre</th>
                        <th className='th001'>N° Servicios Realizados</th>
                        <th className='th001'>Comisión Por Servicios</th>
                        <th className='th001'>Total Comisión</th>
                    </tr>
                </thead>
                <tbody>
                    {data.slice(startIndex, endIndex).map((item, index) => (
                        <tr key={index} className='tr001'>
                            <td className='td001'>{item.cedula}</td>
                            <td className='td001'>{item.nombreCompleto}</td>
                            <td className='td001'>{item.totalServiciosRealizados}</td>
                            <td className='td001'>
                                <span
                                    data-tooltip-id={`tooltip-${index}`}
                                    data-tooltip-content={item.comisionPorServicios.map((comision, i) => (
                                        `Servicio: $${comision.valorServicio.toFixed(2)} - Comisión: ${comision.porcentaje}% ($${comision.valorCalculado.toFixed(2)})`
                                    )).join('\n')}
                                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                >
                                    ${item.maxComisionServicio ? item.maxComisionServicio.valorCalculado.toFixed(2) : '0.00'}
                                </span>
                                <Tooltip
                                    id={`tooltip-${index}`}
                                    place="top"
                                    style={{
                                        whiteSpace: 'pre-line',
                                        backgroundColor: '#333',
                                        color: '#fff',
                                        padding: '8px',
                                        borderRadius: '8px',
                                        fontSize: '0.9rem',
                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)'
                                    }}
                                />
                            </td>
                            <td className='td001'>${item.totalComision.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="linea001"></div>
            <div className='container007'>
                <div className="column010">
                    <h4><span>Mostrando {currentPage} de {totalPages}</span></h4>
                </div>
                <div className="column001">
                    <div className="pagination001">
                        <button className="button006" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
                        <span className='span006'>{currentPage}</span>
                        <button className="button006" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableLiqOpe;
