import axios from 'axios';
import React, { useEffect, useState } from 'react'


export default function BuscarOrden() {

    
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

        <div className='container' style={{margin: "30px"}}>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h2>Buscar Orden de Servicio</h2>
            </div>

            <form>
                <div className='container center'>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">N° de servicio</label>
                    <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="cliente" class="form-label">cliente</label>
                    <input type="text" class="form-control" id="cleinte" name="cliente"/>
                </div>
                <div class="mb-3">
                    <label for="fecha" class="form-label">Fecha de ingreso</label>
                    <input type="date" class="form-control" id="fecha" name='fecha'/>
                </div>
                <div class="mb-3">
                    <label for="placa" class="form-label">Placa</label>
                    <input type="text" class="form-control" id="placa" name='placa' />
                </div>
                <div className='container text-center' style={{ margin: "30px" }}>
                <button type="submit" class="btn btn-success"><i class="fa-solid fa-magnifying-glass"></i> Buscar</button>
                </div>
                </div>
            </form>


            <div className='container' style={{margin: "30px"}}>
        <table class="table table-striped table-hover align-middel">
            <thead className='table-dark'>
                <tr>
                <th scope="col">Orden de servicio</th>
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

        </div>



    )
}
