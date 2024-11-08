import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';

function TableLiqOpe({ data }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const totalPages = Math.ceil(data.length / itemsPerPage);
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
            <div className="pagination001">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
                <span>{currentPage} de {totalPages}</span>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
            </div>
        </div>
    );
}

export default TableLiqOpe;
