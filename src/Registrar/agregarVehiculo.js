import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import fotoimage from '../img/fotoup.jpeg';

export default function AgregarVehiculo() { // Cambia la primera letra a mayúscula

    // Simulación de datos de clientes
    const servicios = [
        { cedula: '123456789', nombre: 'Juan Perez', ciudad: 'Bogotá' },
        { cedula: '987654321', nombre: 'Maria Gomez', ciudad: 'Medellín' },
        // Agrega más objetos según sea necesario
    ];

    // Función para exportar a Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(servicios.map(servicio => ({
            "Cedula": servicio.cedula,
            "Nombre": servicio.nombre,
            "Ciudad": servicio.ciudad,
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Agregar Vehiculo");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "Vehiculos Agregados.xlsx");
    };

    // Función para exportar a PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Vehiculos Agregados', 20, 10);
        doc.autoTable({
            head: [['Cedula', 'Nombre', 'Ciudad']],
            body: servicios.map(servicio => [
                servicio.cedula,
                servicio.nombre,
                servicio.ciudad,
            ]),
        });
        doc.save('Vehiculos Agregados.pdf');
    };

    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='container'>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">Inicio</li>
                    <li className="breadcrumb-item">Vehiculo</li>
                    <li className="breadcrumb-item active" aria-current="page">Agregar</li>
                </ol>
            </nav>
            <div className='container' style={{ margin: "30px" }}>
                <h3> Agregar Vehiculo</h3>
            </div>

            <div style={{ height: "350px" }}>
                <form className='container' style={{ width: "580px", position: "relative", height: "310px" }} >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                        <div className="col">
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="placa" className="form-label">Placa: *</label>
                                    <input type="text" className="form-control" id="placa" name='placa' style={{ width: "320px" }} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="marca" className="form-label">Marca: *</label>
                                    <input type="text" className="form-control" id="marca" name='marca' />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="linea" className="form-label">Linea: *</label>
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>Selecciona la Linea</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="direccion" className="form-label">Modelo: *</label>
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>Selecciona el Modelo</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="cliente" className="form-label">Cliente: *</label>
                                    <input type="text" className="form-control" id="cliente" name='cliente' style={{ width: "320px" }}
                                        required={true} />
                                </div>
                            </div>
                            <div className="col">
                            <label htmlFor="clente" className="form-label">Cliente: *</label>
                                <div className="col-md-6 d-flex align-items-center">
                                    <div className="w-50">
                                        <div className="card" style={{ width: '329px', height: '130px', overflow: "hidden" }}>
                                        {image && <img src={image} className='' alt="Foto-subida" style={{objectFit: "fill", zIndex:"2", width:"191px", height:"100px", top: "10px", left: "18px", position: "relative" }} />}
                                        <input
                                                type="file"
                                                className="form-control-file d-none"
                                                id="fotoimg"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        
                                        <label htmlFor='fotoimg' style={{width: "100%", height: "100%",}}>
                                        <div class="h6 mb-4 text-secondary border-bottom border-secondary" style={{ position: "relative", left: "250px", width:"95px", top: "100px" }}>
                                            Examinar
                                        </div>  
                                        <img src={fotoimage} alt="foto ejemplo" style={{ width: "90px", zIndex:"1", left: "50px", position: "relative", height: "90px", bottom: "30px",}} />
                                        </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mb-3">
                                        <label htmlFor="descripcion" className="form-label" style={{ resize: "none" }} >Descripción: *</label>
                                        <textarea style={{ resize: "none" }} className="form-control" rows={5} id="descripcion" required name='descripcion' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='text-center'>
                            <button type="submit" className="btn btn-success btn-sm me-3"><i class="fa-regular fa-floppy-disk"></i> Guardar</button>
                        </div>
                    </div>
                </form>
            </div>

            <div>
                <div className="nav justify-content-end" style={{ margin: "40px 0px" }}>
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
        </div>
    )
}
