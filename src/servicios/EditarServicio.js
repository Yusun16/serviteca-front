import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ModalEditar from './modalEditar';
import { useNavigate, useParams } from 'react-router-dom'

export default function EditarServicio() {

    const urlBase = "http://localhost:8080/serviteca/servicios";

    let navegacion = useNavigate();

    const { id } = useParams();
    const [servicio, setServicios] = useState({
        codigo: "",
        descripcion: "",
        valorServicio: "",
        nombre: "",
        ano: "",
        porcentajeOperario: ""
    })

    const { codigo, descripcion, valorServicio, nombre, ano, porcentajeOperario } = servicio

    useEffect(() => {
        cargarServicio();
    }, [])

    const cargarServicio = async () => {
        const resultado = await axios.get(`${urlBase}/${id}`)
        setServicios(resultado.data)
    }

    const onInputCahnge = (e) => {
        setServicios({ ...servicio, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(urlBase, servicio)
        navegacion("/")


    }

    return (
        <div className='container'>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">Inicio</li>
                    <li class="breadcrumb-item active" aria-current="page">Servicios</li>
                    <li class="breadcrumb-item active" aria-current="page">Editar</li>
                </ol>
            </nav>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h2>Editar Servicio</h2>
            </div>
            <form onSubmit={(e) => onSubmit(e)} className='container' style={{ width: "580px", position: "relative", height: "310px" }} >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <div className="col">
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="codigo" className="form-label">Código: *</label>
                                <input type="number" className="form-control" id="codigo" name='codigo' value={codigo} readOnly onChange={(e) => onInputCahnge(e)} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre del servicio: *</label>
                            <input
                                type="text"
                                step="any"
                                className="form-control"
                                id="nombre"
                                name='nombre'
                                required
                                value={servicio.nombre}
                                onChange={onInputCahnge}
                            />
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="descripcion" className="form-label" style={{ resize: "none" }} >Descripción: *</label>
                                <textarea type="text" className="form-control" rows={5} id="descripcion" name='descripcion' required={true} value={descripcion} onChange={(e) => onInputCahnge(e)} />
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="ano" className="form-label">Año: *</label>
                                <input type="date" className="form-control" id="ano" name='ano' required value={ano} onChange={(e) => onInputCahnge(e)} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="porcentajeOperario" className="form-label">Porcentaje Operario: *</label>
                                <input type="number" className="form-control" id="porcentajeOperario" name='porcentajeOperario' required={true} value={porcentajeOperario} onChange={(e) => onInputCahnge(e)} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <label htmlFor="valorServicio" className="form-label">Valor del servicio: *</label>
                                <input type="number" step="any" className="form-control" id="valorServicio" name='valorServicio' required={true} value={valorServicio} onChange={(e) => onInputCahnge(e)} />
                            </div>
                        </div>
                    </div>
                </div>
                


                <div className='text-center'>
                    <button type="submit" className="btn btn-success btn-sm me-3" data-bs-toggle="modal" data-bs-target="#modaleditar" ><i class="fa-regular fa-floppy-disk"></i> Guardar</button>
                    <button type="submit" href='/' className='btn btn-danger btn-sm me-3 '><i class="fa-regular fa-circle-xmark"></i> Cancelar</button>
                    <ModalEditar />
                </div>
                
            </form>
        </div>
    )
}
