import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

export default function ListadoServicios() {

    //{
    // const urlBase = "...................................................................................";

   const[servicios, setServicios] = useState([]);

    // useEffect(() => {
      //  cargarServicios();
    // }, []);

   // const cargarServicios = async () => {
        // const resultado = await axios.get(urlBase);
     //   console.log("Resultado carga servicios");
       // console.log(resultado.data);
        // setServicios(resultado.data);
   // }
    

  return (
    <div className='container'>
  <div className='container text-center' style={{margin: "30px"}}>
        <h2> Servicios </h2>
    </div>

    <div className='container text-center' style={{margin: "30px"}}>
        <div className='container'></div>
    <Link type="button" className="btn btn-center btn-primary" to="http://localhost:3000/agregar">Agregar Servicio</Link>
    <button type="button" className="btn btn-center btn-primary" href="/">Buscar Servicio</button>
    </div>
    

    <table className="table table-striped table-hover align-middle">
  <thead className='table-dark'>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Descripción</th>
            <th scope="col">Valor del Servicio</th>
            <th scope="col">Año</th>
            <th scope="col">Porcentaje del Operario</th>

            </tr>
        </thead>
        <tbody>
            {  //iteramos el arreglo de servicios
            servicios.map((servicios, indice) => (
                <tr key={indice}>
                <th scope="row">{servicios.idServicios}</th>
                <td>{servicios.descripcion}</td>
                <td>{servicios.valorDelServicio}</td>
                <td>{servicios.año}</td>
                <td><NumericFormat value={servicios.porcentajeDelOperacio}
                displayType={'text'}
                thousandSeparator="," prefix='%'
                decimalScale={2} fixedDecimalScale/>
                </td>
                </tr>
            ))
               
            }
          
  </tbody>
</table>

    </div>
  
  )
}
