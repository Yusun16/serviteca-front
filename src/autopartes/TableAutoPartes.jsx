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
        const resultado = await axios.get(urlBase);
        setAutopartes(resultado.data);
    };

    const eliminarAutoPartes = async (id) => {
        await axios.delete(`${urlBase}/${id}`);
        cargarAutoPartes();
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
                                    {/* <button type='submit' className="btn-modal" id='demo-modal16'> */}
                                    <i className="fa-solid fa-calendar"></i>
                                </Link>
                                {/* <Link href="#demo-modal16" className="btn-modal" >
                                    <i className="fa-solid fa-calendar"></i>
                                </Link> */}
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
            {/*  */}
            {/* <ModalEdit
                nameText="Ha sido editado con éxito"
            /> */}
            <ModalExito
                idmodal="demo-modal22"
                parexito="Registro eliminado"
                className="modal003"
                buttonContent={<img src={CheckReady} alt='eliminar-registro' className='img-ready' />}
            />
            {/* <ModalExito
                idmodal="demo-modal4"
                titlemodal="Editado"
                parexito="Registro editado con exito"
                className="modal003"
            />
            <ModalExito
                idmodal="demo-modal2"
                titlemodal="Eliminado"
                parexito="Registro eliminado con exito"
                className="modal003"
            /> */}
        </div>
    )
}

export default TableAutoPartes

//     const columns = (handleEdit, handleDelete) => [
//         { name: "Codigo", selector: row => row.Codigo },
//         { name: "Descripcion", selector: row => row.Descripcion },
//         { name: "Tipo", selector: row => row.Tipo },
//         { name: "Editar", cell: row => <a href="#demo-modal" className="btn-modal" onClick={() => handleEdit(row)} >Editar</a> },
//         { name: "Eliminar", cell: row => <button onClick={() => handleDelete(row)}>Eliminar</button> },
//     ]

//     const data = [
//         {
//             Codigo: "456546",
//             Descripcion: "gas",
//             Tipo: "Renault",
//         },
//         {
//             Codigo: "456546",
//             Descripcion: "gas",
//             Tipo: "Renault",
//         }
//     ]

//     const [records, setRecords] = useState(data);

//     function handleFilter(event) {
//         const newData = data.filter(row => {
//             return row.name.toLowerCase().includes(event.target.value.toLowerCase())
//             // https://www.youtube.com/watch?v=3oHUtG0cjfY
//         })
//         setRecords(newData)
//     }

//     const handleEdit = (row) => {
//         console.log("Editar", row);
//         // Lógica de edición
//     }

//     const handleDelete = (row) => {
//         console.log("Eliminar", row);
//         // Lógica de eliminación
//     }

{/* <div className='text-end'>
//                 <input type="text" onChange={handleFilter} />
//             </div> */}
//             <DataTable
//                 pagination
//                 columns={columns(handleEdit, handleDelete)}
//                 data={records}
//             />

//             <div id="demo-modal" className="modal001">
//                 <div className="modal__content">
//                     <h1>Modificando datos</h1>
//                     <p>
//                         ¡Cambia o actualiza tus datos!
//                     </p>
//                     <form action="" method='' className="form009">
//                         <div className="form0010">
//                             <div className="input005">
//                                 <input type="text" name="" id="" placeholder='Nombre de la empresa' className='input006' />
//                                 <span className="span007"></span>
//                             </div>
//                             <div className="input005">
//                                 <input type="text" name="" id="" placeholder='Nombre del usuario' className='input006' />
//                                 <span className="span007"></span>
//                             </div>
//                             <div className="input005">
//                                 <input type="number" name="" id="" placeholder='Telefono' className='input006' />
//                                 <span className="span007"></span>
//                             </div>
//                             <div className="input005">
//                                 <input type="email" name="" id="" placeholder='Correo' className='input006' />
//                                 <span className="span007"></span>
//                             </div>
//                             <div className="input005">
//                                 <input type="text" name="" id="" placeholder='Lugar' className='input006' />
//                                 <span className="span007"></span>
//                             </div>
//                             <div className="input005">
//                                 <input type="text" name="" id="" placeholder='Dirección' className='input006' />
//                                 <span className="span007"></span>
//                             </div>
//                             <button type="submit" className="view001">Modificar</button>
//                         </div>
//                     </form>
//                     <a href="#" className="modal__close">&times;</a>
//                 </div>
//             </div>