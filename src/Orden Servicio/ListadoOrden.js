import axios from 'axios';
import React, { useEffect, useState } from 'react'

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

        <table class="table table-striped table-hover align-middel">
            <thead className='table-dark'>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Codigo Orden de servicio</th>
                <th scope="col">Cliente</th>
                <th scope="col">Tipo de servicio</th>
                <th scope="col">Placa del vehiculo</th>
                <th scope="col">Kilometraje del Vehiculo</th>
                <th scope="col">Fecha</th>



                </tr>
            </thead>
            <tbody>
                {
                ordenes.map((orden, indice)=>(
                    <tr key={indice}>
                    <th scope="row">{orden.idOrden}</th>
                    <td>{orden.codigoOrden}</td>
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
