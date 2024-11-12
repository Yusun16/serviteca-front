import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalExito from '../autopartes/ModalExito';
import { Link } from 'react-router-dom';
import CheckReady from '../img/check-ready.png'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function TableOperarios() {
    const urlBase = "http://localhost:8080/serviteca/operarios";

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [operarios, setOperarios] = useState([]);

    const exportToPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["Cedula", "Nombre", "Apellido", "Telefono", "Direccion", "Acudiente", "Telefono Acudiente", "Especialidad"];
        const tableRows = [];

        operarios.forEach(operaData => {
            const operariosData = [
                operaData.cedula,
                operaData.nombre,
                operaData.apellido,
                operaData.telefono,
                operaData.direccion,
                operaData.acudiente,
                operaData.telefonoAcudiente,
                operaData.especialidad,

            ];
            tableRows.push(operariosData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.text("Listado de Operarios", 14, 15);
        doc.save("Listado_de_los_operarios.pdf");
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(operarios.map(operaData => ({
            "Cedula": operaData.cedula,
            "Nombre": operaData.nombre,
            "Apellido": operaData.apellido,
            "Telefono": operaData.telefono,
            "Direccion": operaData.direccion,
            "Acudiente": operaData.acudiente,
            "Telefono Acudiente": operaData.telefonoAcudiente,
            "Especialidad": operaData.especialidad,
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Operarios");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "listado_de_operarios.xlsx");
    };

    const cargarOperarios = async () => {
        const token = localStorage.getItem('token');

        try {
            const resultado = await axios.get(urlBase, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOperarios(resultado.data);
        } catch (error) {
            console.error("Error al obtener los operarios", error);
        }
    };

    const eliminarOperarios = async (id) => {
        const token = localStorage.getItem('token');

        try {
            await axios.delete(`${urlBase}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            cargarOperarios();
        } catch (error) {
            console.error("Error al eliminar los operarios", error);
        }
    };

    useEffect(() => {
        cargarOperarios();
    }, []);


    // Total de filas
    const totalRows = operarios.length;
    const totalPages = Math.ceil(totalRows / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

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
                                <Link to={`/editar-operarios/${operar.id}`} className="btn-modal" id='demo-modal11'>
                                    <i className="fa-solid fa-calendar"></i>
                                </Link>
                            </td>
                            <td className='td001'>
                                <a href="#demo-modal13" onClick={() => eliminarOperarios(operar.id)} className="btn-modal">
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
            {/*  */}
            <ModalExito
                idmodal="demo-modal12"
                titlemodal="Editado"
                parexito="Registro editado con exito"
                className="modal003"
            />
            {
                <ModalExito
                    idmodal="demo-modal13"
                    parexito="Registro eliminado"
                    className="modal003 modal003-z-index"
                    buttonContent={<img src={CheckReady} alt='eliminar-registro' className='img-ready' />}
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