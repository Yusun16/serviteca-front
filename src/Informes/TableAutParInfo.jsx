import React, { useState } from 'react';
import ImgRoja from '../img/icon-idni-1.png';
import ImgVerde from '../img/icon-idni-2.png';

function TableAutParInfo({ data }) {
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
                        <th className='th001'>Codigo Producto</th>
                        <th className='th001'>Descripcion</th>
                        <th className='th001'>Cantidad Existencias</th>
                        <th className='th001'>Saldo</th>
                        <th className='th001'>Indicador</th>
                    </tr>
                </thead>
                <tbody>
                    {data.slice(startIndex, endIndex).map((item, index) => (
                        <tr key={index} className='tr001'>
                            <td className='td001'>{item.codigo}</td>
                            <td className='td001'>{item.descripcion}</td>
                            <td className='td001'>{item.cantidadExistente}</td>
                            <td className='td001'>{item.saldo}</td>
                            <td className='td001'>
                                <div>
                                    <img
                                        src={item.cantidadExistente > 5 ? ImgVerde : ImgRoja}
                                        className='indi001'
                                        alt='img-indicador'
                                    />
                                </div>
                            </td>
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

export default TableAutParInfo;
