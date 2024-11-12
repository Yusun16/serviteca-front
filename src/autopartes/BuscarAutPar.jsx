import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ModalExito from './ModalExito'
import CheckReady from '../img/check-ready.png'
import CheckSearch from '../img/check-search.png'

function BuscarAutPar() {
    const urlBase = "http://localhost:8080/serviteca/autopartes";

    const [referencia, setReferencia] = useState('');
    const [siigo, setSiigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [showTable, setShowTable] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [autopartes, setAutopartes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const cargarAutoPartes = async () => {
        const token = localStorage.getItem('token');

        try {
            const resultado = await axios.get(urlBase, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAutopartes(resultado.data);
        } catch (error) {
            console.error("Error al cargar las autopartes:", error);
        }
    };

    const eliminarAutoPartes = async (id) => {
        const token = localStorage.getItem('token');

        try {
            await axios.delete(`${urlBase}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            cargarAutoPartes();
        } catch (error) {
            console.error("Error al eliminar la autoparte:", error);
        }
    };

    useEffect(() => {
        cargarAutoPartes();
    }, []);

    // Total de filas
    const totalRows = autopartes.length;
    const totalPages = Math.ceil(totalRows / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams();
        if (referencia) queryParams.append('referencia', referencia);
        if (siigo) queryParams.append('siigo', siigo);
        if (descripcion) queryParams.append('descripcion', descripcion);

        const token = localStorage.getItem('token');

        try {
            const response = await axios.get(`${urlBase}/buscar?${queryParams.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            if (response.data.length === 0) {
                // Colocar un modal para el aviso de: "Búsqueda no encontrada."
                setIsModalOpen(true);
            } else {
                setAutopartes(response.data);
                setErrorMessage('');
                // Mostrar la tabla después de realizar la búsqueda
                setShowTable(true);
            }
        } catch (error) {
            console.error('Error al buscar autopartes:', error);
            setErrorMessage('Hubo un error en la búsqueda. Por favor, inténtelo de nuevo.');
        }
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["Referencia", "Codigo SIIGO", "Descripcion", "Linea", "Tipo", "Marca", "Modelo"];
        const tableRows = [];

        autopartes.forEach(autopart => {
            const autopartData = [
                autopart.referencia,
                autopart.siigo,
                autopart.descripcion,
                autopart.linea,
                autopart.tipo,
                autopart.marca,
                autopart.modelo,

            ];
            tableRows.push(autopartData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.text("Listado de Auto-partes", 14, 15);
        doc.save("Listado_de_auto-partes.pdf");
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(autopartes.map(autopart => ({
            "Referencia": autopart.referencia,
            "Codigo SIIGO": autopart.siigo,
            "Descripción": autopart.descripcion,
            "Linea": autopart.linea,
            "Tipo": autopart.tipo,
            "Marca": autopart.marca,
            "Modelo": autopart.modelo,
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Auto-partes");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "listado_de_auto-partes.xlsx");
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <nav aria-label="breadcrumb" className='breadcrumb002'>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item breadcrumb001">
                        <i className="fa-solid fa-house"></i>
                        Inicio
                    </li>
                    <li className="breadcrumb-item active breadcrumb004" aria-current="page">Autopartes</li>
                    <li className="breadcrumb-item active breadcrumb003" aria-current="page">Buscar</li>
                </ol>
            </nav>
            <div className='column005'>
                <h6 className='text009 pos-text'>Buscar Auto-partes</h6>
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
                                    <label className='label-input009' htmlFor="referencia">Referencia:</label>
                                    <input
                                        className='input009'
                                        id="referencia"
                                        name="referencia"
                                        required
                                        value={referencia}
                                        onChange={(e) => setReferencia(e.target.value)}
                                        type="text" />
                                </div>
                                <div className='div-col002 div-col003'>
                                    <label className='label-input009' htmlFor="siigo">Codigo SIIGO:</label>
                                    <input
                                        className='input009'
                                        id="siigo"
                                        name="siigo"
                                        required
                                        value={siigo}
                                        onChange={(e) => setSiigo(e.target.value)}
                                        type="text" />
                                </div>
                                <div className='div-col002 div-col003'>
                                    <label className='label-input009' htmlFor="descripcion">Descripcion:</label>
                                    <input
                                        className='input009'
                                        id="descripcion"
                                        name="descripcion"
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
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
                                {isModalOpen &&
                                    <ModalExito
                                        idmodal="demo-modal39"
                                        titlemodal="Busqueda"
                                        lineado="linea002"
                                        parexito="¡Parametros no encontrados!"
                                        className="modal__message003"
                                        onClose={handleCloseModal}
                                        buttonContent={<img src={CheckSearch} alt="busqueda-fallida" className='img-ready' />}
                                    />
                                }
                            </form>
                        </div>
                    </div>
                    <div>
                        {showTable && (
                            <div>
                                <ul className="icons001">
                                    <li className="icons002"><i onClick={exportToPDF} className="fa-solid fa-file-pdf"></i></li>
                                    <li className="icons002"><i onClick={exportToExcel} className="fa-solid fa-file-excel"></i></li>
                                </ul>
                                <table className='table001'>
                                    <thead>
                                        <tr className='tr001'>
                                            <th className='th001'>Codigo</th>
                                            <th className='th001'>Descripcion</th>
                                            <th className='th001'>Tipo</th>
                                            <th className='th001'>Editar</th>
                                            <th className='th001'>Borrar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {autopartes.slice(startIndex, endIndex).map((autopar, indice) => (

                                            <tr key={indice} className='tr001'>
                                                <td className='td001'>{autopar.siigo}</td>
                                                <td className='td001'>{autopar.descripcion}</td>
                                                <td className='td001'>{autopar.tipo}</td>
                                                <td className='td001'>
                                                    {/* <a href="#demo-modal6" className="btn-modal" >
                                                        <i className="fa-solid fa-calendar"></i>
                                                    </a> */}
                                                    <Link to={`/editar-auto-partes/${autopar.idAupartes}`} className="btn-modal" id='demo-modal6'>
                                                        <i className="fa-solid fa-calendar"></i>
                                                    </Link>
                                                </td>
                                                <td className='td001'>
                                                    <a href="#demo-modal9" onClick={() => eliminarAutoPartes(autopar.idAupartes)} className="btn-modal">
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
                        {/* <div id="demo-modal6" className="modal001">
                            <div className="modal__content modal__shadow">
                                <div className='modal__title'>
                                    <h1>Editar Auto-Partes</h1>
                                    <div className="linea002"></div>
                                </div>
                                <div>
                                    <form>
                                        <div className="container005">
                                            <div className='column001'>
                                                <div className='div-col002'>
                                                    <label className='label006' htmlFor="referencia">Referencia:</label>
                                                    <input
                                                        className='input004'
                                                        type="text"
                                                        id="referencia"
                                                        name="input1"
                                                    // value={inputs.input1}
                                                    // onChange={handleInputChange}
                                                    // disabled={!isInputEnabled.input1}
                                                    />
                                                </div>
                                                <div className='div-col002'>
                                                    <label className='label006' htmlFor="codigoStISO">Código SIISO:</label>
                                                    <input
                                                        className='input004'
                                                        type="text"
                                                        id="codigoStISO"
                                                        name="input2"
                                                    // value={inputs.input2}
                                                    // onChange={handleInputChange}
                                                    // disabled={!isInputEnabled.input2}
                                                    />
                                                </div>
                                                <div className='div-col002'>
                                                    <label className='label006' htmlFor="descripcion">Descripción:</label>
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
                                                <div className='div-col002'>
                                                    <label className='label006' htmlFor="linea">Linea:</label>
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
                                                <div className='div-col002'>
                                                    <label className='label006' htmlFor="tipo">Tipo:</label>
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
                                                <div className='div-col002'>
                                                    <label className='label006' htmlFor="marca">Marca:</label>
                                                    <input
                                                        className='input004'
                                                        type="text"
                                                        id="marca"
                                                        name="input4"
                                                    // value={inputs.input4}
                                                    // onChange={handleInputChange}
                                                    // disabled={!isInputEnabled.input4}
                                                    />
                                                </div>
                                                <div className='div-col002'>
                                                    <label className='label006' htmlFor="modelo">Modelo:</label>
                                                    <input
                                                        className='input004'
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
                                </a> 
                                            <div className='pos-btn009 div-btn009'>
                                                <a href="#demo-modal8" className='btn009' type="submit">
                                                    <div className="sub-btn009">
                                                        <i className="fa-solid fa-floppy-disk"></i>
                                                        <span className="">Guardar</span>
                                                    </div>
                                                </a>
                                            </div>

                                            <a className='btn007' href='#'>
                                                <ul className="icons005">
                                                    <li className="icons004"><i className="fa-regular fa-circle-xmark"></i></li>
                                                    <li className="">Cancelar</li>
                                                </ul>
                                            </a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div> */}
                        <ModalExito
                            idmodal="demo-modal9"
                            parexito="Registro eliminado"
                            className="modal003"
                            rutaDir="/auto-partes"
                            buttonContent={<img src={CheckReady} alt='eliminar-registro' className='img-ready' />}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BuscarAutPar