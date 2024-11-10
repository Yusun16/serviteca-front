import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ModalExito from './ModalExito';
import CheckReady from '../img/check-ready.png'

function TableAutoPartes() {
    const urlBase = "http://localhost:8080/serviteca/autopartes";

    const [autopartes, setAutopartes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

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

    return (
        <div>
            <div>
                <ul className="icons001">
                    <li className="icons002"><i onClick={exportToPDF} className="fa-solid fa-file-pdf"></i></li>
                    <li className="icons002"><i onClick={exportToExcel} className="fa-solid fa-file-excel"></i></li>
                </ul>
            </div>
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
                                <Link to={`/editar-auto-partes/${autopar.idAupartes}`} className="btn-modal" id='demo-modal16'>
                                    <i className="fa-solid fa-calendar"></i>
                                </Link>
                            </td>
                            <td className='td001'>
                                <a href="#demo-modal22" onClick={() => eliminarAutoPartes(autopar.idAupartes)} className="btn-modal">
                                    <i className="fa-solid fa-trash-can"></i>
                                </a>
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
            <ModalExito
                idmodal="demo-modal22"
                parexito="Registro eliminado"
                className="modal003"
                buttonContent={<img src={CheckReady} alt='eliminar-registro' className='img-ready' />}
            />
        </div>
    )
}

export default TableAutoPartes