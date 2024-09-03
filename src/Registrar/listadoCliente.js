import React from 'react'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';

export default function listadoCliente() {

    const servicios = [
        { codigo: '001', descripcion: 'Servicio 1', valorServicio: 100, año: 2023, porcentajeOperario: 10 },
        { codigo: '002', descripcion: 'Servicio 2', valorServicio: 200, año: 2024, porcentajeOperario: 15 },
        // Agrega más objetos según sea necesario
    ];

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(servicios.map(servicio => ({
            "Cedula": servicio.cedula,
            "Nombre": servicio.nombren,
            "Ciudad": servicio.ciudad,
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Cliente");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "listado_servicios.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Listado de Clientes', 20, 10);
        doc.autoTable({
            head: [['Cedula', 'Nombre', 'Ciudad']],
            body: servicios.map(servicio => [
                servicio.cedula,
                servicio.nombre,
                servicio.ciudad,
            ]),
        });
        doc.save('listado_clientes.pdf');
    };


    return (
        <div className='container'>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">Inicio</li>
                    <li className="breadcrumb-item active" aria-current="page">Cliente</li>
                </ol>
            </nav>

            <div className='container' style={{ margin: "30px" }}>
                <h4>Clientes</h4>
            </div>
            <div className='container text-center ' style={{ margin: "30px", display: "flex", justifyContent: "center", gap: "84px" }} >

                <Link type="button" className="btn btn-center btncolor" to="/agregarcliente" style={{ width: "280px", height: "50px" }}>Agregar Cliente</Link>
                <Link type="button" className="btn btn-center btncolor " to="/buscarCliente" style={{ width: "280px", height: "50px" }}>Buscar Cliente</Link>


            </div>


            <div className="nav justify-content-end">
                <button className="fa-sharp fa-solid fa-file-pdf p-2 g-col-6"
                    style={{ listStyle: "none", color: "black", fontSize: "31px", background: "none", border: "none" }}
                    onClick={exportToPDF}>
                </button>
                <button className="fa-sharp fa-solid fa-file-excel p-2 g-col-6"
                    style={{ listStyle: "none", color: "black", fontSize: "31px", background: "none", border: "none" }}
                    onClick={exportToExcel}>
                </button>
            </div>


        </div>
    )
}
