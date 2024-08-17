import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditarServicio() {
    
    const urlBase="http://localhost:8080/serviteca/servicios";

    let navegacion=useNavigate();

    const{id}=useParams();

    const[servicio, setServicios]=useState({
        codigo:"",
        descripcion:"",
        valorServicio:"",
        año:"",
        porcentajeOperario:""
    })

    const{codigo, descripcion, valorServicio, año, porcentajeOperario }= servicio

    useEffect(()=>{
        cargarServicio();
    },[])

    const cargarServicio= async()=>{
        const resultado=await axios.get(`${urlBase}/${id}`)
        setServicios(resultado.data)
    }

    const onInputCahnge=(e) => {
        setServicios({...servicio, [e.target.name]:e.target.value})
    }

    const onSubmit=async (e)=>{
        e.preventDefault();
        await axios.post(urlBase, servicio)
        navegacion("/")

    }

  return (
    <div className='container'>
        <div className='container text-center' style={{margin: "30px"}}>
            <h2>Editar Servicio</h2>
        </div>
        <form onSubmit={(e)=> onSubmit(e)}> 
        <div className="mb-3">
            <label htmlFor="codigo" className="form-label">Codigo</label>
            <input type="text" className="form-control" id="codigo" name='codigo' required={true} value={codigo} onChange={(e)=>onInputCahnge(e)} />
        </div>
        <div className="mb-3">
            <label htmlfor="descripcion" className="form-label">Descripción</label>
            <input type="text" className="form-control" id="descripcion" name='descripcion' required={true} value={descripcion} onChange={(e)=>onInputCahnge(e)} />
        </div>
        <div className="mb-3">
            <label htmlFor="valorServicio" className="form-label">valor Servicio</label>
            <input type="text" className="form-control" id="valorServicio" name='valorServicio' required={true} value={valorServicio} onChange={(e)=>onInputCahnge(e)} />
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
        <button type="submit" className="btn btn-warning btn-sm me-3">Guardar</button>
            <a href='/' className='btn btn-danger btn-sm'>Regresar</a>
        </div>
        </form>
            </div>
  )
}
