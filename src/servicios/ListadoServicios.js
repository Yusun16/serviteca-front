import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ListadoServicios() {

    //{
    // const urlBase = "...................................................................................";

  //  const[servicios, setServicios] = useState([]);

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
        <h3> Serviteca Automotriz </h3>
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
                <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@deed</td>
                </tr>
            ))
               
            }
          
  </tbody>
</table>

    </div>
  
  )
}
