import React from 'react'
import { Link } from 'react-router-dom'
import TableAutoPartes from './TableAutoPartes';

const IniAutPar = () => {

    return (
        <div className='barra001'>
            <nav aria-label="breadcrumb" className='breadcrumb002'>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item breadcrumb001">
                        <i className="fa-solid fa-house"></i>
                        Inicio
                    </li>
                    <li className="breadcrumb-item active breadcrumb003" aria-current="page">Autopartes</li>
                </ol>
            </nav>
            <div className='column005'>
                <h6 className='text009 pos-text'>Auto-partes</h6>
                <ul className="icons001 icons009">
                </ul>
            </div>
            <div className='container004'>
                <div className='column002'>
                    <Link className='btn004 pos-btn004' to="/agregar-auto-partes">
                        Agregar auto-partes
                    </Link>
                </div>
                <div className='column002'>
                    <Link className='btn004 pos2-btn004' to="/buscar-auto-partes">
                        Buscar auto-partes
                    </Link>
                </div>
            </div>
            <div>
                <TableAutoPartes />
            </div>
        </div>
    );
};

export default IniAutPar