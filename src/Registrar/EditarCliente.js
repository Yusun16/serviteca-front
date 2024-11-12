import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ModalEditarCliente from './modalEditarCliente';

export default function EditarCliente() {
    const urlBase = "http://localhost:8080/serviteca/cliente";
    let navegacion = useNavigate();
    const { id } = useParams();
    const [isJuridico, setIsJuridico] = useState(false);

    // Inicialización del estado del cliente
    const [cliente, setCliente] = useState({
        cedula: "",
        nombre: "",
        apellido: "",
        correo: "",
        direccion: "",
        telefono: "",
        departamento: "",
        ciudad: "",
    });

    // Declaración de departamentos y ciudades en Colombia
    const departamentosYciudades = {
        // Listado simplificado para el ejemplo
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
    };

    const { cedula, nombre, apellido, correo, direccion, telefono, departamento, ciudad } = cliente;

    const departamentos = Object.keys(departamentosYciudades);
    const ciudades = cliente.departamento ? departamentosYciudades[cliente.departamento] : [];

    useEffect(() => {
        const cargarCliente = async () => {
            const token = localStorage.getItem('token');

            try {
                const resultado = await axios.get(`${urlBase}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // setCliente(resultado.data);

                const clienteData = resultado.data;

                setIsJuridico(!clienteData.apellido);

                setCliente(clienteData);

                // Rellenar los datos del cliente en el formulario
                setCliente(clienteData);
            } catch (error) {
                console.error("Error al cargar los datos del cliente:", error.response ? error.response.data : error.message);
            }
        };
        cargarCliente();
    }, [id]);

    const onInputChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const resultado = await axios.put(`${urlBase}/${id}`, cliente, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCliente(resultado.data);
            // navegacion("/listadoCliente");
            const modal = new window.bootstrap.Modal(document.getElementById("modaleditarcliente"));
            modal.show();
        } catch (error) {
            console.error("Hubo un error al actualizar el cliente:", error.response ? error.response.data : error.message);
            alert("Hubo un problema al actualizar los datos. Por favor, verifica los campos e intenta de nuevo.");
        }
    };

    return (
        <div className='container'>
            <nav aria-label="breadcrumb" className='breadcrumb002'>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item breadcrumb001">
                        <i className="fa-solid fa-house"></i>
                        Inicio
                    </li>
                    <li className="breadcrumb-item active breadcrumb004" aria-current="page">Clientes</li>
                    <li className="breadcrumb-item active breadcrumb003" aria-current="page">Editar</li>
                </ol>
            </nav>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h2>Editar Cliente</h2>
            </div>
            <form onSubmit={onSubmit} className='container' style={{ width: "580px", position: "relative", height: "310px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <div className="col">
                        <div className="mb-3">
                            <label htmlFor="cedula" className="form-label">{isJuridico ? "NIT" : "Cédula"}: *</label>
                            <input type="number" className="form-control" id="cedula" name='cedula' required style={{ width: "320px" }}
                                value={cliente.cedula || ""} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">{isJuridico ? "Razón Social" : "Nombre"}: *</label>
                            <input type="text" className="form-control" required id="nombre" name='nombre'
                                value={cliente.nombre || ""} onChange={(e) => onInputChange(e)} />
                        </div>
                        {!isJuridico && (
                            <div className="mb-3">
                                <label htmlFor="apellido" className="form-label">Apellido: *</label>
                                <input type="text" className="form-control" id="apellido" required name='apellido'
                                    value={cliente.apellido || ""} onChange={(e) => onInputChange(e)} />
                            </div>
                        )}
                        <div className="mb-3">
                            <label htmlFor="correo" className="form-label">Correo: *</label>
                            <input type="text" className="form-control" id="correo" required name='correo'
                                value={cliente.correo || ""} onChange={(e) => onInputChange(e)} />
                        </div>
                    </div>
                    <div>
                        <div className="mb-3">
                            <label htmlFor="direccion" className="form-label">Dirección: *</label>
                            <input type="text" className="form-control" id="direccion" name='direccion' style={{ width: "320px" }}
                                required value={cliente.direccion || ""} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="telefono" className="form-label">Teléfono: *</label>
                            <input type="number" className="form-control" id="telefono" required name='telefono'
                                value={cliente.telefono || ""} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="departamento" className="form-label">Departamento: *</label>
                            <div>
                                <select className="form-select" id="departamento" required name='departamento' value={cliente.departamento || ""} onChange={(e) => onInputChange(e)}>
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
                                <select className="form-select" id="ciudad" name='ciudad' value={cliente.ciudad || ""} onChange={(e) => onInputChange(e)}>
                                    <option value=""></option>
                                    {ciudades.map((ciu, index) => (
                                        <option key={index} value={ciu}>{ciu}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    {/* Input fields and labels */}
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-success btn-sm me-3"><i className="fa-regular fa-floppy-disk"></i> Guardar</button>
                    <button type="button" onClick={() => navegacion('/listadoCliente')} className='btn btn-danger btn-sm me-3'><i className="fa-regular fa-circle-xmark"></i> Cancelar</button>
                    <ModalEditarCliente />
                </div>
            </form>
        </div>
    );
}
