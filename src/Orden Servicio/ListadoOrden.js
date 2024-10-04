import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ListadoOrden() {
    const urlBase = "http://localhost:8080/serviteca/ordenservicios";
    const [ordenes, setOrdenes] = useState([]);
    const [clientes, setClientes] = useState([]);

    const obtenerClientes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/serviteca/cliente');
            setClientes(response.data);
        } catch (error) {
            console.error("Error al obtener los clientes", error);
        }
    };

    useEffect(() => {
        cargarOrdenes();
        obtenerClientes();
    }, []);

    const cargarOrdenes = async () => {
        try {
            const resultado = await axios.get(urlBase);
            console.log("Resultado cargar ordenes");
            console.log(resultado.data);
            setOrdenes(resultado.data);
        } catch (error) {
            console.error("Error al cargar órdenes", error);
        }
    };

    return (
        <div className='container'>
            <div className="container text-center" style={{ margin: "30px" }}>
                <h3>Orden de Servicio</h3>
            </div>

            <div className='container text-center' style={{ margin: "30px" }}>
                <Link type="button" className="btn btn-center btn-primary" to="http://localhost:3000/agregarorden">Agregar Servicio</Link>
            </div>

            <table className="table table-striped table-hover align-middle">
                <thead className='table'>
                    <tr>
                        <th scope="col colorthead">Código</th>
                        <th scope="col colorthead">Cliente</th>
                        <th scope="col colorthead">Tipo de servicio</th>
                        <th scope="col colorthead">Placa del vehículo</th>
                        <th scope="col colorthead">Kilometraje del Vehículo</th>
                        <th scope="col colorthead">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {ordenes.map((orden, indice) => {
                        console.log("Orden:", orden); // Verifica la estructura de la orden
                        const cliente = clientes.find(cliente => cliente.id === orden.cliente_id); // Cambiado a cliente_id
                        console.log("Cliente encontrado:", cliente); // Verifica el cliente encontrado
                        return (
                            <tr key={indice}>
                                <td>{orden.codigo}</td>
                                <td>
                                    {cliente ? `${cliente.nombre} ${cliente.apellido}` : 'Cliente no encontrado'} {/* Mostrar nombre completo del cliente */}
                                </td>
                                <td>{orden.tipoServicio}</td>
                                <td>{orden.placaVehiculo}</td>
                                <td>{orden.kilometraje}</td>
                                <td>{orden.fecha}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
