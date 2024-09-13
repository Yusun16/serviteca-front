import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from 'axios';

export default function AgregarCliente() {

    
    let navegacion = useNavigate();

    const [cliente, setCliente] = useState({
        cedula: "",
        nombre: "",
        apellido: "",
        correo: "",
        direccion: "",
        telefono: "",
        departamento: "",
        ciudad: "",
        razonSocial: "",
        nit: "",
    });

    const { cedula, nombre, apellido, correo, direccion, telefono, departamento, ciudad } = cliente;

    const onInputChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const [isJuridico, setIsJuridico] = useState(true);

    const handleSwitchChange = () => {
        setIsJuridico(!isJuridico);
    };

    // JSON de departamentos y ciudades de Colombia
    const departamentosYciudades = {
        "Amazonas": ["Leticia", "Puerto Nariño", "El Encanto",],
        "Antioquía": ["Medellín", "Bello", "Envigado"],
        "Arauca": ["Arauca", "Arauquita"],
        "Atlántico": ["Barranquilla", "Soledad"],
        "Bolívar": ["Cartagena", "Magangué"],
        "Boyacá": ["Tunja"],
        "Caldas": ["Manizales"],
        "Caquetá": ["Florencia"],
        "Casanare": ["Yopal"],
        "Cauca": ["Popayán"],
        "Cesar": ["Cesar"],
        "Chocó": ["Quibdó"],
        "Córdoba": ["Montería"],
        "Cundinamarca": ["Bogotá"],
        "Guainía": ["Inírida"],
        "Guaviare": ["San José del Guaviare"],
        "Huila": ["Neiva"],
        "La Guajira": ["Riohacha"],
        "Meta": ["Villavicencio"],
        "Nariño": ["San Juan de Pasto"],
        "Norte de Santander": ["San José de Cúcuta"],
        "Putumayo": ["Mocoa"],
        "Quindío": ["Armenia"],
        "Risaralda": ["Pereira"],
        "San Andrés y Providencia": ["San Andrés"],
        "Santander": ["Bucaramanga"],
        "Sucre": ["Sincelejo"],
        "Tolima": ["Ibagué"],
        "Valle del Cauca": ["Cali"],
        "Vaupés": ["Mitú"],
        "Vichada": ["Puerto Carreño"],


        
        // Agrega más departamentos y ciudades según sea necesario
    };

    const departamentos = Object.keys(departamentosYciudades);
    const ciudades = cliente.departamento ? departamentosYciudades[cliente.departamento] : [];

    const clientes = [
        { cedula: '123456789', nombre: 'Juan Perez', ciudad: 'Bogotá' },
        { cedula: '987654321', nombre: 'Maria Gomez', ciudad: 'Medellín' },
        // Agrega más objetos según sea necesario
    ];

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(clientes.map(cliente => ({
            "Cedula": cliente.cedula,
            "Nombre": cliente.nombre,
            "Ciudad": cliente.ciudad,
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Clientes");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "Clientes Agregados.xlsx");
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Clientes Agregados', 20, 10);
        doc.autoTable({
            head: [['Cedula', 'Nombre', 'Ciudad']],
            body: clientes.map(cliente => [
                cliente.cedula,
                cliente.nombre,
                cliente.ciudad,
            ]),
        });
        doc.save('listado_clientes.pdf');
    };

    const FormularioJuridico = () => (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div className="col">
                <div className="mb-3">
                    <label htmlFor="cedula" className="form-label">NIT: *</label>
                    <input type="number" className="form-control" id="cedula" name='cedula' required style={{ width: "320px" }}  value={cedula} onChange={(e) => onInputChange(e)}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Razón social: *</label>
                    <input type="text" className="form-control" required id="nombre" name='nombre'  value={nombre} onChange={(e) => onInputChange(e)}   />
                </div>
                <div className="mb-3">
                    <label htmlFor="correo" className="form-label">Correo: *</label>
                    <input type="text" className="form-control" id="correo" required name='correo' value={correo} onChange={(e) => onInputChange(e)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Dirección: *</label>
                    <input type="text" className="form-control" id="direccion" required name='direccion' value={direccion} onChange={(e) => onInputChange(e)}/>
                </div>
            </div>
            <div>
                <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">Teléfono: *</label>
                    <input type="number" className="form-control" id="telefono" required name='telefono' value={telefono} onChange={(e) => onInputChange(e)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="departamento" className="form-label">Departamento: *</label>
                    <div>
                        <select className="form-select" id="departamento" name='departamento' value={departamento} onChange={(e) => onInputChange(e)}>
                            <option value=""></option>
                            {departamentos.map((dep, index) => (
                                <option key={index} value={dep}>{dep}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="ciudad" className="form-label">Ciudad: *</label>
                    <div>
                        <select className="form-select" id="ciudad" name='ciudad' value={ciudad} onChange={(e) => onInputChange(e)}>
                            <option value=""></option>
                            {ciudades.map((ciu, index) => (
                                <option key={index} value={ciu}>{ciu}</option>
                            ))}
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
                    <input type="number" className="form-control" id="cedula" name='cedula' required style={{ width: "320px" }} 
                        value={cedula}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre: *</label>
                    <input type="text" className="form-control" required id="nombre" name='nombre' 
                        value={nombre} onChange={(e) => onInputChange(e)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="apellido" className="form-label">Apellido: *</label>
                    <input type="text" className="form-control" id="apellido" required name='apellido' 
                        value={apellido} onChange={(e) => onInputChange(e)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="correo" className="form-label">Correo: *</label>
                    <input type="text" className="form-control" id="correo" required name='correo' 
                        value={correo} onChange={(e) => onInputChange(e)} />
                </div>
            </div>
            <div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Dirección: *</label>
                    <input type="text" className="form-control" id="direccion" name='direccion' style={{ width: "320px" }}
                        required value={direccion} onChange={(e) => onInputChange(e)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">Teléfono: *</label>
                    <input type="number" className="form-control" id="telefono" required name='telefono' 
                        value={telefono} onChange={(e) => onInputChange(e)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="departamento" className="form-label">Departamento: *</label>
                    <div>
                        <select className="form-select" id="departamento" name='departamento' value={departamento} onChange={(e) => onInputChange(e)}>
                            <option value=""></option>
                            {departamentos.map((dep, index) => (
                                <option key={index} value={dep}>{dep}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="ciudad" className="form-label">Ciudad: *</label>
                    <div>
                        <select className="form-select" id="ciudad" name='ciudad' value={ciudad} onChange={(e) => onInputChange(e)}>
                            <option value=""></option>
                            {ciudades.map((ciu, index) => (
                                <option key={index} value={ciu}>{ciu}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "http://localhost:8080/serviteca/cliente";
        await axios.post(urlBase, cliente);
        navegacion("/listadoCliente");
    }

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
                <form onSubmit={(e) => onSubmit(e)} className='container' style={{ width: "580px", position: "relative", height: "310px" }}>
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
