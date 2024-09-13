import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ListadoOrden() {

    const urlBase="http://localhost:8080/serviteca/ordenservicios";

    const [ordenes, setOrdenes]= useState([]);

    useEffect(() => {
        cargarOrdenes();
    }, []);

    const cargarOrdenes = async () => {
        const resultado =await axios.get(urlBase);
        console.log("Resultado cargar ordenes");
        console.log(resultado.data);
        setOrdenes(resultado.data);
    }

  return (
    <div className='container'>
        <div className="container text-center" style={{margin: "30px"}}>
            <h3>Orden de Servicio</h3>
        </div>

        <div className='container text-center' style={{margin: "30px"}}>
        <div className='container'></div>
        <Link type="button" className="btn btn-center btn-primary" to="http://localhost:3000/agregarorden">Agregar Servicio</Link>
        </div>

        <table class="table table-striped table-hover align-middel">
            <thead className='table'>
                <tr>
                <th scope="col colorthead">Codigo</th>
                <th scope="col colorthead">Cliente</th>
                <th scope="col colorthead">Tipo de servicio</th>
                <th scope="col colorthead">Placa del vehiculo</th>
                <th scope="col colorthead">Kilometraje del Vehiculo</th>
                <th scope="col colorthead">Fecha</th>



                </tr>
            </thead>
            <tbody>
                {
                ordenes.map((orden, indice)=>(
                    <tr key={indice}>
                    <th >{orden.codigo}</th>
                    <td>{orden.cliente}</td>
                    <td>{orden.tipoServicio}</td>
                    <td>{orden.placaVehiculo}</td>
                    <td>{orden.kilometraje}</td>
                    <td>{orden.fecha}</td>


                </tr>

                ))
                
                }
            </tbody>
            </table>

    </div>
  )
}
