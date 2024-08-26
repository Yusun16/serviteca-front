import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';
import Modal from './modal';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function AgregarServicio() {
    let navegacion = useNavigate();

    const [servicio, setServicio] = useState({
        codigo: "",
        descripcion: "",
        valorServicio: "",
        año: "",
        porcentajeOperario: ""
    });

    const [servicios, setServicios] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const { codigo, descripcion, valorServicio, año, porcentajeOperario } = servicio;

    const onInputChange = (e) => {
        setServicio({ ...servicio, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "http://localhost:8080/serviteca/servicios";
        await axios.post(urlBase, servicio);
        navegacion("/");
    };

    useEffect(() => {
        cargarServicios();
    }, []);

    const cargarServicios = async () => {
        const resultado = await axios.get("http://localhost:8080/serviteca/servicios");
        setServicios(resultado.data);
    };

    const eliminarServicio = async (id) => {
        await axios.delete(`http://localhost:8080/serviteca/servicios/${id}`);
        cargarServicios();
    };

    // Calcular el índice del primer y último elemento de la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Extraer los elementos de la página actual
    const currentItems = servicios.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(servicios.length / itemsPerPage);

    // Función para cambiar de página
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Función para exportar a PDF
    const exportarPDF = () => {
        const doc = new jsPDF();
        doc.text("Listado de Servicios", 20, 10);
        doc.autoTable({
            head: [['Codigo', 'Descripción', 'Valor del Servicio', 'Año', 'Porcentaje del Operario']],
            body: servicios.map(servicio => [
                servicio.idServicio,
                servicio.descripcion,
                `$${servicio.valorServicio.toLocaleString()}`,
                servicio.año,
                `${servicio.porcentajeOperario}%`
            ])
        });
        doc.save("Listado_Servicios.pdf");
    };

    // Función para exportar a Excel
    const exportarExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(servicios.map(servicio => ({
            Codigo: servicio.idServicio,
            Descripción: servicio.descripcion,
            Valor_Servicio: servicio.valorServicio,
            Año: servicio.año,
            Porcentaje_Operario: servicio.porcentajeOperario
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Servicios");
        XLSX.writeFile(workbook, "Listado_Servicios.xlsx");
    };

    return (
        <div className='container'>
            {/* Formulario de agregar servicio */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">Inicio</li>
                    <li className="breadcrumb-item active" aria-current="page">Servicios</li>
                    <li className="breadcrumb-item active" aria-current="page">Agregar</li>
                </ol>
            </nav>
            <div className='container' style={{ margin: "30px" }}>
                <h3>Agregar Servicio</h3>
            </div>

            <form onSubmit={onSubmit} className="container" style={{ width: "580px", position: "relative", height: "310px"}}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <div className="col">
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="codigo" className="form-label">Codigo: *</label>
                                <input type="text" className="form-control" id="codigo" name='codigo' value={codigo} onChange={onInputChange} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="descripcion" className="form-label" style={{ resize: "none" }} >Descripción: *</label>
                                <textarea  style={{resize: "none"}} type="text" className="form-control" rows={5} id="descripcion" name='descripcion' required={true} value={descripcion} onChange={onInputChange} />
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="año" className="form-label">Año: *</label>
                                <input type="date" className="form-control" id="año" name='año' required={true} value={año} onChange={onInputChange} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="porcentajeOperario" className="form-label">Porcentaje Operario: *</label>
                                <input type="number" className="form-control" id="porcentajeOperario" name='porcentajeOperario' required={true} value={porcentajeOperario} onChange={onInputChange} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="valorServicio" className="form-label">Valor del servicio: *</label>
                                <input type="number" step="any" className="form-control" id="valorServicio" name='valorServicio' required={true} value={valorServicio} onChange={onInputChange} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='text-center'>
                    <button type="button" className="btn btn-success btn-sm me-3" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-regular fa-floppy-disk"></i> Guardar</button>
                    <Modal />
                </div>
            </form>

            {/* Contenedor del formulario y la tabla */}
            <div className='d-flex'>
                <div className='container' >
                    {/* Tabla de servicios */}
                    <div className=" nav justify-content-end">
                        <button className="fa-sharp fa-solid fa-file-pdf p-2 g-col-6" onClick={exportarPDF} style={{ listStyle: "none", color: "black", fontSize: "31px", background: "none", border: "none" }}></button>
                        <button className="fa-sharp fa-solid fa-file-excel p-2 g-col-6" onClick={exportarExcel} style={{ listStyle: "none", color: "black", fontSize: "31px", background: "none", border: "none" }}></button>
                    </div>
                    <table className="container" style={{ margin: "30px" }}>
                        <thead className=''>
                            <tr>
                                <th className='text-letras colorthead' scope="col">Codigo</th>
                                <th className='text-letras colorthead' scope="col">Descripción</th>
                                <th className='text-letras colorthead' scope="col">Valor del Servicio</th>
                                <th className='text-letras colorthead' scope="col">Año</th>
                                <th className='text-letras colorthead' scope="col">Porcentaje del Operario</th>
                                <th className='text-letras colorthead'>Editar</th>
                                <th className='text-letras colorthead'>Borrar</th>
                            </tr>
                        </thead>
                        <tbody className='tbbody'>
                            {currentItems.map((servicio, indice) => (
                                <tr className='tr-table-tr' key={indice}>
                                    <th scope="row">{servicio.idServicio}</th>
                                    <td>{servicio.descripcion}</td>
                                    <td>
                                        <NumericFormat
                                            value={servicio.valorServicio}
                                            displayType={'text'}
                                            thousandSeparator=","
                                            prefix='$'
                                            decimalScale={2}
                                        />
                                    </td>
                                    <td>{servicio.año}</td>
                                    <td>
                                        <NumericFormat
                                            value={servicio.porcentajeOperario}
                                            displayType={'text'}
                                            thousandSeparator=","
                                            prefix='%'
                                            decimalScale={2}
                                        />
                                    </td>
                                    <td className='text-center'>
                                        <Link to={`/editar/${servicio.idServicio}`} className='btn btn-sm me-3'>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() => eliminarServicio(servicio.idServicio)} className='btn btn-sm'>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Paginación */}
                    <div className="h4 pb-2 mb-4 border-bottom border-black"></div>
                    <div className='d-flex justify-content-between'>
                        <h6><span>Mostrando {currentPage} de {totalPages}</span></h6>
                        <div className="d-flex justify-content-start mt-4 justify-content-end">
                            <button
                                className="btn btn-secondary me-2"
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>
                            <span className="align-self-center"> {currentPage} de {totalPages}</span>
                            <button
                                className="btn btn-secondary ms-2"
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
