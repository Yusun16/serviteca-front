import React from 'react';
import jsPDF from 'jspdf';  
import 'jspdf-autotable';
import * as XLSX from 'xlsx'; 
import { saveAs } from 'file-saver';  
import { Link } from 'react-router-dom';  

export default function listadoVehiculo() {
    const servicios = [
        { codigo: '001', descripcion: 'Servicio 1', valorServicio: 100, año: 2023, porcentajeOperario: 10 },
        { codigo: '002', descripcion: 'Servicio 2', valorServicio: 200, año: 2024, porcentajeOperario: 15 },
        // Agrega más objetos según sea necesario
    ];

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(servicios.map(servicio => ({
            "Cedula": servicio.cedula,
            "Nombre": servicio.Nombre,
            "Ciudad": servicio.Ciudad,
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Vehiculo");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "listado_vehiculo.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Listado de Vehiculo', 20, 10);
        doc.autoTable({
            head: [['Cedula', 'Nombre', 'Ciudad']],
            body: servicios.map(servicio => [
                servicio.cedula,
                servicio.Nombre,
                servicio.Ciudad,
            ]),
        });
        doc.save('listado_vehiculo.pdf');
    };

    return (
        <div className='container'>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">Inicio</li>
                    <li className="breadcrumb-item active" aria-current="page">Vehiculo</li>
                </ol>
            </nav>

            <div className='container' style={{ margin: "30px" }}>
                <h4>Vehiculo</h4>
            </div>
            <div className='container text-center' style={{ margin: "30px", display: "flex", justifyContent: "center", gap: "84px" }} >
                <Link type="button" className="btn btn-center btncolor" to="/agregarvehiculo" style={{ width: "280px", height: "50px" }}>Agregar Vehiculo</Link>
                <Link type="button" className="btn btn-center btncolor" to="/buscarVehiculo" style={{ width: "280px", height: "50px" }}>Buscar Vehiculo</Link>
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
