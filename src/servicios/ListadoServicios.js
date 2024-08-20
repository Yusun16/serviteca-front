import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

export default function ListadoServicios() {

    const urlBase = "http://localhost:8080/serviteca/servicios";

   const[servicios, setServicios] = useState([]);

     useEffect(() => {
        cargarServicios();
    }, []);

    const cargarServicios = async () => {
        const resultado = await axios.get(urlBase);
        console.log("Resultado carga servicios");
        console.log(resultado.data);
        setServicios(resultado.data);
    }

    const eliminarServicio=async(id)=>{
      await axios.delete(`${urlBase}/${id}`)
      cargarServicios();
    }
    

  return (
    <div className='container'>
  <div className='container text-center' style={{margin: "30px"}}>
        <h2> Servicios </h2>
    </div>

    <div className='container text-center' style={{margin: "30px"}}>
        <div className='container'></div>
    <Link type="button" className="btn btn-center btn-primary" to="http://localhost:3000/agregar">Agregar Servicio</Link>
   
    </div>
    

    <table className="table table-striped table-hover align-middle">
  <thead className='table-dark'>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">codigo</th>
            <th scope="col">descripcion</th>
            <th scope="col">Valor del Servicio</th>
            <th scope="col">Año</th>
            <th scope="col">Porcentaje del Operario</th>
            <th></th>

            </tr>
        </thead>

        
        <tbody>
            {  //iteramos el arreglo de servicios
            servicios.map((servicios, indice) => (
                <tr key={indice}>
                <th scope="row">{servicios.idServicio}</th>
                <td>{servicios.codigo}</td>
                <td>{servicios.descripcion}</td>
                <td><NumericFormat value={servicios.valorServicio}
                displayType={'text'}
                thousandSeparator="," prefix='$'
                decimalScale={2} fixedDecimalScale/></td>
                <td>{servicios.año}</td>
                <td><NumericFormat value={servicios.porcentajeOperario}
                displayType={'text'}
                thousandSeparator="," prefix='%'
                decimalScale={2} fixedDecimalScale/>
                </td>
                <td className='text-center'>
                  <Link to={`/editar/${servicios.idServicio}`} className='btn btn-warning btn-sm me-3'>Editar</Link>
                  <button onClick={()=> eliminarServicio(servicios.idServicio)} className='btn btn-danger btn-sm'>Eliminar</button>
                </td>
                </tr>
            ))
               
            }
          
  </tbody>
</table>

    </div>
  
  )
}
