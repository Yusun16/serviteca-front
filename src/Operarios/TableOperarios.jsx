import React, { useState, useEffect } from 'react';
import ModalEditOpe from './ModalEditOpe';
import ModalExito from '../autopartes/ModalExito';

// import ModalExito from './ModalExito';

function TableOperarios() {
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
            { col1: 'Data 1', col2: 'Data 2', col3: 'Data 3' },
            { col1: 'Data 1', col2: 'Data 2', col3: 'Data 3' },
            { col1: 'Data 1', col2: 'Data 2', col3: 'Data 3' },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3' },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3' },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3' },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3' },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3' },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3' },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3' },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3' },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3' },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3' },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3' },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3' },
            { col1: 'Data 1', col2: 'Data 4', col3: 'Data 3' },
        ]);
    }, []);

    return (
        <div>
            <div>
                <ul className="icons001">
                    <li className="icons002"><i className="fa-solid fa-file-pdf"></i></li>
                    <li className="icons002"><i className="fa-solid fa-file-excel"></i></li>
                </ul>
            </div>
            <table className='table001'>
                <thead>
                    <tr className='tr001'>
                        <th className='th001'>Cedula</th>
                        <th className='th001'>Nombre</th>
                        <th className='th001'>Telefono</th>
                        <th className='th001'>Editar</th>
                        <th className='th001'>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {data.slice(startIndex, endIndex).map((item, index) => (
                        <tr className='tr001'>
                            <td className='td001'>{item.col1}</td>
                            <td className='td001'>{item.col2}</td>
                            <td className='td001'>{item.col3}</td>
                            <td className='td001'><a href="#demo-modal11" className="btn-modal" >
                                <i className="fa-solid fa-calendar"></i>
                            </a></td>
                            <td className='td001'><a href="#demo-modal13" className="btn-modal">
                                <i className="fa-solid fa-trash-can"></i>
                            </a></td>
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
            {/*  */}
            <ModalEditOpe />
            <ModalExito
                idmodal="demo-modal12"
                titlemodal="Editado"
                parexito="Registro editado con exito"
                className="modal003"
            />
            {
                <ModalExito
                    idmodal="demo-modal13"
                    titlemodal="Eliminar"
                    parexito="Registro eliminado"
                    className="modal003"
                />
            /*<ModalExito
                idmodal="demo-modal2"
                titlemodal="Eliminado"
                parexito="Registro eliminado con exito"
                className="modal003"
            /> */}
        </div>
    )
}

export default TableOperarios