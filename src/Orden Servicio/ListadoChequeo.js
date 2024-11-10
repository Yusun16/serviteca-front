import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListadoChequeo() {
    const urlBase = "http://localhost:8080/serviteca/revisiones";

    const [revisiones, setRevisiones] = useState([]);

    useEffect(() => {
        cargarRevisiones();
    }, []);

    const cargarRevisiones = async () => {
        const resultado = await axios.get(urlBase);
        console.log("Resultado cargar chequeos");
        console.log(resultado.data);
        setRevisiones(resultado.data);
    }

    return (
        <div className='container'>
            <div className="container text-center" style={{ margin: "30px" }}>
                <h3>Listado de Chequeo</h3>
            </div>

            <div className='container text-center' style={{ margin: "30px" }}>
                <div className='container'></div>
                <Link type="button" className="btn btn-center btn-primary" to="http://localhost:3000/chequeo">Agregar Servicio</Link>
            </div>

            <table class="table table-striped table-hover align-middel">
                <thead className='table'>
                    <tr>
                        <th scope="col colorthead">Observacion Lateral Derecho</th>
                        <th scope="col colorthead">Observacion Lateral Izquierdo</th>
                        <th scope="col colorthead">Observacion Frontal</th>
                        <th scope="col colorthead">Observacion Posterior</th>
                        <th scope="col colorthead">Observacion Indicador</th>
                        <th scope="col colorthead">Imagen Lateral Derecho</th>
                        <th scope="col colorthead">Imagen Lateral Izquierdo</th>
                        <th scope="col colorthead">Imagen Frontal</th>
                        <th scope="col colorthead">Imagen Posterior</th>
                        <th scope="col colorthead">Imagen Indicador</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        revisiones.map((revision, indice) => (
                            <tr key={indice}>
                                <th >{revision.observationsRight}</th>
                                <td>{revision.observationsLeft}</td>
                                <td>{revision.observationsFrontal}</td>
                                <td>{revision.observationsBack}</td>
                                <td>{revision.observationsIndicador}</td>
                                <td><img src={revision.imgRight} alt="Lateral Derecho" style={{ width: '100px', height: 'auto' }} /></td>
                                <td><img src={revision.imgLeft} alt="Lateral Izquierdo" style={{ width: '100px', height: 'auto' }} /></td>
                                <td><img src={revision.imgFrontal} alt="Frontal" style={{ width: '100px', height: 'auto' }} /></td>
                                <td><img src={revision.imgBack} alt="Posterior" style={{ width: '100px', height: 'auto' }} /></td>
                                <td><img src={revision.imgIndicador} alt="Indicador" style={{ width: '100px', height: 'auto' }} /></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default ListadoChequeo