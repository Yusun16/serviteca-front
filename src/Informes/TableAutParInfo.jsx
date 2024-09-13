import React, { useState, useEffect } from 'react'
import Img005 from '../img/icon-idni-1.png';

function TableAutParInfo() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [data, setData] = useState([]);

    // Total de filas
    const totalRows = data.length;
    const totalPages = Math.ceil(totalRows / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    useEffect(() => {
        setData([
            { col1: 'Data 1', col2: 'Data 2', col3: 'Data 3', col4: 'Data4', },
            { col1: 'Data 1', col2: 'Data 2', col3: 'Data 3', col4: 'Data4', },
            { col1: 'Data 1', col2: 'Data 2', col3: 'Data 3', col4: 'Data4', },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3', col4: 'Data4', },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3', col4: 'Data4', },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3', col4: 'Data4', },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3', col4: 'Data4', },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3', col4: 'Data4', },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3', col4: 'Data4', },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3', col4: 'Data4', },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3', col4: 'Data4', },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3', col4: 'Data4', },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3', col4: 'Data4', },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3', col4: 'Data4', },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3', col4: 'Data4', },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3', col4: 'Data4', },
        ]);
    }, []);
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
                        <tr className='tr001'>
                            <td className='td001'>{item.col1}</td>
                            <td className='td001'>{item.col2}</td>
                            <td className='td001'>{item.col3}</td>
                            <td className='td001'>{item.col4}</td>
                            <td className='td001'>
                                <div>
                                    <img src={Img005} className='indi001' alt='img-indicador' />
                                </div>
                            </td>
                        </tr>
                    ))}
                    <tr className='tr001'>
                        <th className='th001'> </th>
                        <th className='th001'> </th>
                        <th className='th001'> </th>
                        <th className='th001'> </th>
                        <th className='th001'> </th>
                    </tr>
                </tbody>
            </table>
            <div className="linea001"></div>
            <div className='container007'>
                <div className="column001">
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
    )
}

export default TableAutParInfo