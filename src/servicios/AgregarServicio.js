import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AgregarServicio() {
    let navegacion=useNavigate();

    const[servicio, setServicios]=useState({
        codigo:"",
        descripcion:"",
        valorServicio:"",
        año:"",
        porcentajeOperario:""
    })

    const{codigo, descripcion, valorServicio, año, porcentajeOperario }= servicio

    const onInputCahnge=(e) => {
        setServicios({...servicio, [e.target.name]:e.target.value})
    }

    const onSubmit=async (e)=>{
        e.preventDefault();
        const urlBase="http://localhost:8080/serviteca/servicios";
        await axios.post(urlBase, servicio)
        navegacion("/")

    }

  return (
    <div className='container'>
        <div className='container text-center' style={{margin: "px"}}>
            <h2>Agregar Servicio</h2>
        </div>
        <form onSubmit={(e)=> onSubmit(e)}> 
        <div className="mb-3">
<<<<<<< HEAD
            <label for="descripcion" className="form-label">Descripción</label>
            <input type="text" className="form-control" id="descripcion" name='descripcion' required={true}  />
=======
            <label htmlFor="codigo" className="form-label">Codigo</label>
            <input type="text" className="form-control" id="codigo" name='codigo' required={true} value={codigo} onChange={(e)=>onInputCahnge(e)} />
>>>>>>> 3034c19398dffc41032d3f0a8185ce1bfbcd2d51
        </div>
        <div className="mb-3">
            <label htmlfor="descripcion" className="form-label">Descripción</label>
            <input type="text" className="form-control" id="descripcion" name='descripcion' required={true} value={descripcion} onChange={(e)=>onInputCahnge(e)} />
        </div>
        <div className="mb-3">
<<<<<<< HEAD
            <label for="año" className="form-label">Año</label>
            <input type="date" step="any" className="form-control" id="año" name='año'/>
=======
            <label htmlFor="valorServicio" className="form-label">valor Servicio</label>
            <input type="text" className="form-control" id="valorServicio" name='valorServicio' required={true} value={valorServicio} onChange={(e)=>onInputCahnge(e)} />
>>>>>>> 3034c19398dffc41032d3f0a8185ce1bfbcd2d51
        </div>
        <div className="mb-3">
            <label htmlfor="año" className="form-label">Año</label>
            <input type="number" step="any" className="form-control" id="año" name='año' value={año} onChange={(e)=>onInputCahnge(e)} />
        </div>
        <div className="mb-3">
            <label htmlfor="porcentajeOperario" className="form-label">Porcentaje Operario</label>
            <input type="text"  className="form-control" id="porcentajeOperario" name='porcentajeOperario' value={porcentajeOperario} onChange={(e)=>onInputCahnge(e)} />
        </div>

        <div className='text-center'>
        <button type="submit" className="btn btn-warning btn-sm me-3">Agregar</button>
            <a href='/' className='btn btn-danger btn-sm'>Regresar</a>
        </div>
        </form>
            </div>
  )
}
