import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalExito from '../autopartes/ModalExito';
import { Link } from 'react-router-dom';
import CheckReady from '../img/check-ready.png'

function BuscarOperarios() {
    const urlBase = "http://localhost:8080/serviteca/operarios";

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [showTable, setShowTable] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [operarios, setOperarios] = useState([]);
    const [cedula, setCedula] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');

    const cargarOperarios = async () => {
        const resultado = await axios.get(urlBase);
        setOperarios(resultado.data);
    };

    const eliminarOperarios = async (id) => {
        await axios.delete(`${urlBase}/${id}`);
        cargarOperarios();
    };

    useEffect(() => {
        cargarOperarios();
    }, []);

    // Total de filas
    const totalRows = operarios.length;
    const totalPages = Math.ceil(totalRows / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams();
        if (cedula) queryParams.append('cedula', cedula);
        if (correo) queryParams.append('correo', correo);
        if (telefono) queryParams.append('telefono', telefono);

        try {
            const response = await axios.get(`${urlBase}/buscar?${queryParams.toString()}`);
            if (response.data.length === 0) {
                // Colocar un modal para el aviso de: "Búsqueda no encontrada."
                setErrorMessage('Búsqueda no encontrada.');
            } else {
                setOperarios(response.data);
                setErrorMessage('');
                setShowTable(true); // Mostrar la tabla después de realizar la búsqueda
            }
        } catch (error) {
            console.error('Error al buscar operarios:', error);
            setErrorMessage('Hubo un error en la búsqueda. Por favor, inténtelo de nuevo.');
        }
    };

    return (
        <div>
            <nav aria-label="breadcrumb" className='breadcrumb002'>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item breadcrumb001">
                        <i className="fa-solid fa-house"></i>
                        Inicio
                    </li>
                    <li className="breadcrumb-item active breadcrumb004" aria-current="page">Operarios</li>
                    <li className="breadcrumb-item active breadcrumb003" aria-current="page">Buscar</li>
                </ol>
            </nav>
            <div className='column005'>
                <h6 className='text009 pos-text'>Buscar operarios</h6>
                <ul className="icons001 icons009">
                </ul>
            </div>
            <div>
                <div className=''>
                    <div className='column005'>
                        <h6 className='text009 pos-text003'>Buscar por: </h6>
                        <ul className="icons001 icons009">
                        </ul>
                    </div>
                    <div className='container006'>
                        <div className=''>
                            <form onSubmit={handleSubmit} className='column003'>
                                <div className='div-col002 div-col003'>
                                    <label htmlFor="cedula">Cedula:</label>
                                    <input
                                        className='input009'
                                        id="cedula"
                                        name='cedula'
                                        value={cedula}
                                        onChange={(e) => setCedula(e.target.value)}
                                        required
                                        type="text"
                                    />
                                </div>
                                <div className='div-col002 div-col003'>
                                    <label htmlFor="correo">Correo:</label>
                                    <input
                                        className='input009'
                                        id="correo"
                                        name='correo'
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                        required
                                        type="text" />
                                </div>
                                <div className='div-col002 div-col003'>
                                    <label htmlFor="telefono">Telefono:</label>
                                    <input
                                        className='input009'
                                        id="telefono"
                                        name='telefono'
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                        required
                                        type="text" />
                                </div>
                                <div className='pos-btn008'>
                                    <button className='btn008' type='submit'>
                                        <div className="sub-btn008">
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                            <span className="">Buscar</span>
                                        </div>
                                    </button>
                                </div>
                                {errorMessage && <div className='container'>{errorMessage}</div>}
                            </form>
                        </div>
                    </div>
                    <div>
                    </div>
                    <div>
                        {showTable && (
                            <div>
                                <ul className="icons001">
                                    <li className="icons002"><i className="fa-solid fa-file-pdf"></i></li>
                                    <li className="icons002"><i className="fa-solid fa-file-excel"></i></li>
                                </ul>

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
                                        {operarios.slice(startIndex, endIndex).map((operar, indice) => (
                                            <tr key={indice} className='tr001'>
                                                <td className='td001'>{operar.cedula}</td>
                                                <td className='td001'>{operar.nombre}</td>
                                                <td className='td001'>{operar.telefono}</td>
                                                <td className='td001'>
                                                    <Link to={`/editar-operarios/${operar.id}`} className="btn-modal" id='demo-modal6'>
                                                        <i className="fa-solid fa-calendar"></i>
                                                    </Link>
                                                </td>
                                                <td className='td001'>
                                                    <a href="#demo-modal9" onClick={() => eliminarOperarios(operar.id)} className="btn-modal">
                                                        <i className="fa-solid fa-trash-can"></i>
                                                    </a>
                                                </td>
                                                {/*  */}

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
                        )}
                        <div id="demo-modal6" className="modal001">
                            <div className="modal__content">
                                <h1>Editar Auto-Partes</h1>
                                <div>
                                    <form>
                                        <div className="container005">
                                            <div className='column001'>
                                                <div className='div-col001'>
                                                    <label className='label005' htmlFor="">Referencia:</label>
                                                    <input
                                                        className='input006'
                                                        type="text"
                                                        id=""
                                                        name="input1"
                                                    // value={inputs.input1}
                                                    // onChange={handleInputChange}
                                                    // disabled={!isInputEnabled.input1}
                                                    />
                                                </div>
                                                <div className='div-col001'>
                                                    <label htmlFor="codigoStISO">Código SIISO:</label>
                                                    <input
                                                        className='input006'
                                                        type="text"
                                                        id="codigoStISO"
                                                        name="input2"
                                                    // value={inputs.input2}
                                                    // onChange={handleInputChange}
                                                    // disabled={!isInputEnabled.input2}
                                                    />
                                                </div>
                                                <div className='div-col001'>
                                                    <label htmlFor="descripcion">Descripción:</label>
                                                    <textarea
                                                        className='inputarea001'
                                                        rows={3}
                                                        cols={3}
                                                        type="text"
                                                        id="descripcion"
                                                        name="input3"
                                                    // value={inputs.input3}
                                                    // onChange={handleInputChange}
                                                    // disabled={!isInputEnabled.input3}
                                                    />
                                                </div>
                                                <div className='div-col001'>
                                                    <label htmlFor="linea">Linea:</label>
                                                    <div className="dropdown">
                                                        <select className="dropdown-toggle"
                                                            name="dropdown1"
                                                        // value={inputs.dropdown1}
                                                        // onChange={handleDropdownChange}
                                                        // disabled={!isInputEnabled.dropdown1}
                                                        >
                                                            <option value="" disabled>Selecciona una opción</option>
                                                            <option >No grabado</option>
                                                            <option >Grabado</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='column001'>
                                                <div className='div-col001'>
                                                    <label htmlFor="tipo">Tipo:</label>
                                                    <div className="dropdown">
                                                        <select className="dropdown-toggle"
                                                            name="dropdown2"
                                                        // value={inputs.dropdown2}
                                                        // onChange={handleDropdownChange}
                                                        // disabled={!isInputEnabled.dropdown2}
                                                        >
                                                            <option value="" disabled>Selecciona una opción</option>
                                                            <option>Filtro</option>
                                                            <option>Aceite</option>
                                                            <option>Repuesto</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='div-col001'>
                                                    <label htmlFor="marca">Marca:</label>
                                                    <input
                                                        className='input006'
                                                        type="text"
                                                        id="marca"
                                                        name="input4"
                                                    // value={inputs.input4}
                                                    // onChange={handleInputChange}
                                                    // disabled={!isInputEnabled.input4}
                                                    />
                                                </div>
                                                <div className='div-col001'>
                                                    <label htmlFor="modelo">Modelo:</label>
                                                    <input
                                                        className='input006'
                                                        type="text"
                                                        id="modelo"
                                                        name="input5"
                                                    // value={inputs.input5}
                                                    // onChange={handleInputChange}
                                                    // disabled={!isInputEnabled.input5}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='containerbtn'>
                                            {/* <a href="#demo-modal4" className='btn009' type="submit">
                                    <ul className="icons005">
                                        <li className="icons004"><i className="fa-solid fa-floppy-disk"></i></li>
                                        <li className="">Guardar</li>
                                    </ul>
                                </a> */}
                                            <div className='pos-btn009'>
                                                <a href="#demo-modal8" className='btn009' type="submit">
                                                    <ul className="icons005">
                                                        <li className="icons004"><i className="fa-solid fa-floppy-disk"></i></li>
                                                        <li className="">Guardar</li>
                                                    </ul>
                                                </a>
                                            </div>
                                            <button className='btn007' type="reset">
                                                <ul className="icons005">
                                                    <li className="icons004"><i className="fa-regular fa-circle-xmark"></i></li>
                                                    <li className="">Cancelar</li>
                                                </ul>
                                            </button>

                                        </div>
                                    </form>
                                </div>
                                <a href="#" className="modal__close">&times;</a>
                            </div>
                        </div>
                        {/* <ModalExito
                            idmodal="demo-modal8"
                            titlemodal="Editado"
                            parexito="Registro editado con exito"
                            className="modal003"
                        />*/
                            <ModalExito
                                idmodal="demo-modal9"
                                parexito="Registro eliminado"
                                className="modal003"
                                rutaDir="/operarios"
                                buttonContent={<img src={CheckReady} alt='eliminar-registro' className='img-ready' />}
                            />}
                    </div>


                </div>
            </div>
        </div>
    )
}

export default BuscarOperarios