import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function AgregarCliente() {

    const [isJuridico, setIsJuridico] = useState(true);

    const handleSwitchChange = () => {
        setIsJuridico(!isJuridico);
    };

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
        XLSX.utils.book_append_sheet(wb, ws, "Clientes");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "Clientes Agregados.xlsx");
    };

    // Función para exportar a PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Clientes Agregados', 20, 10);
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

    const FormularioJuridico = () => (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div className="col">
                <div className="mb-3">
                    <label htmlFor="nit" className="form-label">NIT: *</label>
                    <input type="number" className="form-control" id="nit" name='nit' required style={{ width: "320px" }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="razonSocial" className="form-label">Razón social: *</label>
                    <input type="text" className="form-control" required id="razonSocial" name='razonSocial' />
                </div>
                <div className="mb-3">
                    <label htmlFor="correo" className="form-label">Correo: *</label>
                    <input type="text" className="form-control" id="correo" required name='correo' />
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Dirección: *</label>
                    <input type="text" className="form-control" id="direccion" required name='direccion' />
                </div>
            </div>
            <div className="">
                <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">Teléfono: *</label>
                    <input type="number" className="form-control" id="telefono" name='telefono' style={{ width: "320px" }}
                        required={true} />
                </div>
                <div className="mb-3">
                    <label htmlFor="departamento" className="form-label">Departamento: *</label>
                    <div >
                        <select class="form-select" id="departamento" name='departamento' aria-label="Floating label select example">
                            <option value></option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="ciudad" className="form-label">Ciudad: *</label>
                    <div >
                        <select class="form-select" id="ciudad" name='ciudad' aria-label="Floating label select example">
                            <option value></option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );

    const FormularioNatural = () => (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div className="col">
                <div className="mb-3">
                    <label htmlFor="cedula" className="form-label">Cédula: *</label>
                    <input type="number" className="form-control" id="cedula" name='cedula' required style={{ width: "320px" }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre: *</label>
                    <input type="text" className="form-control" required id="nombre" name='nombre' />
                </div>
                <div className="mb-3">
                    <label htmlFor="apellido" className="form-label">Apellido: *</label>
                    <input type="text" className="form-control" id="apellido" required name='apellido' />
                </div>
                <div className="mb-3">
                    <label htmlFor="correo" className="form-label">Correo: *</label>
                    <input type="text" className="form-control" id="correo" required name='correo' />
                </div>
            </div>
            <div className="">
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Dirección: *</label>
                    <input type="text" className="form-control" id="direccion" name='direccion' style={{ width: "320px" }}
                        required={true} />
                </div>
                <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">Teléfono: *</label>
                    <input type="number" className="form-control" id="telefono" required name='telefono' />
                </div>
                <div className="mb-3">
                    <label htmlFor="departamento" className="form-label">Departamento: *</label>
                    <div >
                        <select class="form-select" id="departamento" name='departamento' aria-label="Floating label select example">
                            <option value></option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="ciudad" className="form-label">Ciudad: *</label>
                    <div >
                        <select class="form-select" id="ciudad" name='ciudad' aria-label="Floating label select example">
                            <option value></option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className='container'>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">Inicio</li>
                    <li className="breadcrumb-item">Cliente</li>
                    <li className="breadcrumb-item active" aria-current="page">Agregar</li>
                </ol>
            </nav>
            <div className='container' style={{ margin: "30px" }}>
                <h3> Agregar Cliente</h3>
            </div>

            <div className="col">
                <div className="mb-3">
                    <div className="form-check form-switch form-check-reverse">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckReverse"
                            style={{ position: "relative", right: "790px", height: "30px", width: "50px" }}
                            onChange={handleSwitchChange} checked={isJuridico} />
                        <label className="form-check-label" htmlFor="flexSwitchCheckReverse"
                            style={{ position: "relative", right: "807px", height: "30px", textAlign: "center" }}>
                            {isJuridico ? 'Jurídico: *' : 'Natural: *'}
                        </label>
                    </div>
                </div>
            </div>

            <div style={{ height: "350px" }}>
                <form className='container' style={{ width: "580px", position: "relative", height: "310px" }}>
                    {isJuridico ? <FormularioJuridico /> : <FormularioNatural />}

                    <div className='text-center'>
                        <button type="submit" className="btn btn-success btn-sm me-3"><i className="fa-regular fa-floppy-disk"></i> Guardar</button>
                        <a href='/listadoCliente' className='btn btn-danger btn-sm me-3 '><i className="fa-regular fa-circle-xmark"></i> Cancelar</a>
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
    );
}
