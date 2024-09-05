import React from 'react';
import { Link } from 'react-router-dom'
import TableOperarios from './TableOperarios';

function IniOperarios() {
    return (
        <div>
            <div className='barra001'>
                <nav aria-label="breadcrumb" className='breadcrumb002'>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item breadcrumb001">
                            <i className="fa-solid fa-house"></i>
                            Inicio
                        </li>
                        <li className="breadcrumb-item active breadcrumb003" aria-current="page">Operarios</li>
                    </ol>
                </nav>
                <h1 className='h1004'>Operarios</h1>
                <div className='container004'>
                    <div className='column002'>
                        <Link className='btn004' to="/agregar-operarios">
                            Agregar operarios
                        </Link>
                    </div>
                    <div className='column002'>
                        <Link className='btn004' to="/buscar-operarios">
                            Buscar operarios
                        </Link>
                    </div>
                </div>
                <div>
                    <TableOperarios />
                </div>
            </div>
        </div>
    )
}

export default IniOperarios