import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from 'react-router-dom';
import fotoimage from '../img/fotoup.jpeg';
import ModalAgregarEjecucion from '../Orden Servicio/modalAgregarEjecucion';
import axios from 'axios';

export default function EjecucionServicio() {
    const [image, setImage] = useState(null);
    const [imageBackAfter, setImageBackAfter] = useState(null);
    const [imageFrontAfter, setImageFrontAfter] = useState(null);
    const [datosOrden, setDatosOrden] = useState([]);
    const [error, setError] = useState(null);
    const [fechaInicio, setFechaInicio] = useState('');  // Estado para la fecha
    const [horaInicio, setHoraInicio] = useState('');    // Estado para la hora

    const exportToPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["Código", "Descripción", "Valor del Servicio", "Año", "Porcentaje del Operario"];
        const tableRows = [];

        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.text("Listado de Servicios", 14, 15);
        doc.save("listado_servicios.pdf");
    };

    useEffect(() => {
        const idOrden = localStorage.getItem('idOrden');

        const fetchEjecucionServicio = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/serviteca/ejecucion?idOrden=${idOrden}`);
                setDatosOrden(response.data);
                // Aquí guardamos la fecha de la orden en el estado `fechaInicio`
                if (response.data.length > 0) {
                    setFechaInicio(response.data[0].fechaOrden);  // Asumiendo que la fecha está en el primer objeto de la lista
                    setHoraInicio(response.data[0].horaOrden);
                    setImage(response.data[0].imgFrontalRevision);    // Hora de la orden
                }
            } catch (err) {
                setError(err);
            }
        };

        fetchEjecucionServicio();
    }, []);

    const handleFechaChange = (e) => {
        setFechaInicio(e.target.value);
    };

    const handleHoraChange = (e) => {
        setHoraInicio(e.target.value);
    };

    const enviarDatos = async () => {
        const idOrden = localStorage.getItem('idOrden'); // Aseguramos que tenemos el idOrden aquí también
        try {
            const response = await axios.get(`/ejecucion?idOrden=${idOrden}`, {
                params: { fechaInicio }  // Enviamos la fecha de inicio como parámetro
            });
            // manejar la respuesta
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    const handleImageChange = (e, setImage) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='container'>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">Inicio</li>
                    <li className="breadcrumb-item">Orden Servicio</li>
                    <li className="breadcrumb-item active" aria-current="page">Ejecución del servicio</li>
                </ol>
            </nav>
            <div className="container text-center">
                <div className="row align-items-start">
                    {datosOrden.length > 0 ? (
                        <>
                            <div className="col">
                                Placa: {datosOrden[0].placaVehiculo} {/* Mostrar la placa del primer elemento */}
                            </div>
                            <div className="col">
                                Código: {datosOrden[0].codigoOrden} {/* Mostrar el código del primer elemento */}
                            </div>
                        </>
                    ) : (
                        <div className="col">
                            <p>No hay datos disponibles</p>
                        </div>
                    )}
                    <div className="col">
                        <button
                            className="fa-sharp fa-solid fa-file-pdf p-2 g-col-6"
                            style={{ listStyle: "none", color: "black", fontSize: "31px", background: "none", border: "none" }}
                            onClick={exportToPDF}
                        >
                        </button>
                    </div>
                </div>
            </div>

            <div className="h4 pb-2 mb-4  border-bottom border-black"></div>

            <form className="container text-center">
                <div className="row align-items-start">
                    <div className="col">

                        <div className="col" style={{ display: "flex", flexDirection: "row" }}>

                            <div className='col-2'>operario: *</div>
                            <div className='col-6'>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                        </div>

                        <div className='text-start' style={{ margin: "10px" }}>Servicios asignados:</div>

                        {/* Tabla de servicios */}
                        <table className="container">
                            <thead>
                                <tr>
                                    <th className='text-letras colorthead text-center' scope="col">Servicio</th>
                                    <th className='text-letras colorthead text-center' scope="col">Inicio</th>
                                    <th className='text-letras colorthead text-center' scope="col">Terminado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Iterar sobre los datos de la orden para mostrar los servicios dinámicamente */}
                                {datosOrden.map((orden, index) => (
                                    <tr key={index} className='tr-table-tr text-center'>
                                        <td>{orden.nombreServicio}</td> {/* Mostrar el nombre del servicio */}
                                        <td>
                                            <input className="form-check-input" type="checkbox" id={`inicio-${index}`} />
                                        </td>
                                        <td>
                                            <input className="form-check-input" type="checkbox" id={`terminado-${index}`} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="h4 pb-2 mb-4  border-bottom border-black"></div>

                        <div className="col" style={{ display: "flex", flexDirection: "row" }}>
                            <div className='col-4'>Productos según servicio:</div>
                            <div className='col-5'>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className=' col-4'>
                                <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#firstModal">
                                    <i class="fas fa-align-left fas fa-plus"></i>  Agregar
                                </button>
                                <ModalAgregarEjecucion />
                            </div>
                        </div>
                        <table className="container" style={{ marginTop: "15px" }}>
                            <thead >
                                <tr className='tr-table-tr text-center'>
                                    <th className='text-letras colorthead text-center' scope="col">Referencia</th>
                                    <th className='text-letras colorthead text-center' scope="col">Cantidad</th>
                                    <th className='text-letras colorthead text-center' scope="col">Terminado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='tr-table-tr text-center'>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr className='tr-table-tr text-center'>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr className='tr-table-tr text-center'>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr className='tr-table-tr text-center'>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr  >
                                    <th className='text-letras colorthead ' style={{ padding: "10px 0px" }} scope="col"></th>
                                    <th className='text-letras colorthead' scope="col"></th>
                                    <th className='text-letras colorthead' scope="col"></th>

                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="col">
                        <div className="col" style={{ display: "flex", flexDirection: "row" }}>
                            <div className='col-3'>Fecha Inicio:</div>
                            <div className='col-3'>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    value={fechaInicio}
                                    onChange={handleFechaChange}
                                    disabled
                                />
                            </div>
                            <div className='col-3'>Fecha Final:</div>
                            <div className='col-3'>
                                <input type="date" className="form-control" id="date" />
                            </div>
                        </div>

                        <div>
                            <div className="col">
                                <div className="col" style={{ display: "flex", flexDirection: "row" }}>
                                    <div className='col-3'>Hora Inicio:</div>
                                    <div className='col-3'>
                                        <input
                                            type="time"
                                            className="form-control"
                                            id="start-time"
                                            value={horaInicio}  // Utilizamos la hora almacenada en el estado
                                            onChange={handleHoraChange}
                                            disabled
                                        />
                                    </div>
                                    <div className='col-3'>Hora Final:</div>
                                    <div className='col-3'>
                                        <input type="time" className="form-control" id="end-time" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='container' style={{ marginTop: "25px" }}>
                            <div className="container text-center">
                                <div className="row align-items-start">
                                    <div className="col">
                                        Antes
                                    </div>
                                    <div className="col" >
                                        Despues
                                    </div>
                                </div>
                            </div>

                            <div className="col" style={{ display: "flex", flexDirection: "row", alignItems: "center", columnGap: "50px", marginBottom: "15px" }}>
                                {/* Sección de la imagen frontal */}
                                <div className='col-3'>Foto frontal:</div>
                                <div className='col-3'>
                                    <div className="card" style={{ width: '185px', height: '120px', overflow: "hidden" }}>
                                        {image && (
                                            <img
                                                src={image}
                                                alt="Foto-subida"
                                                style={{
                                                    objectFit: "fill",
                                                    zIndex: "2",
                                                    width: "191px",
                                                    height: "120px",
                                                    top: "10px",
                                                    left: "0px",
                                                    position: "relative"
                                                }}
                                            />
                                        )}
                                        <label htmlFor='fotoimg' style={{ width: "50%", height: "100%", }}>
                                            <div className="h6 mb-4 text-secondary border-bottom border-secondary" style={{ position: "relative", left: "100px", width: "85px", top: "90px" }}>
                                                Examinar
                                            </div>
                                            <img src={image} alt="foto ejemplo" style={{ width: "55px", zIndex: "1", position: "relative", height: "55px", bottom: "20px" }} />
                                        </label>
                                    </div>
                                </div>
                                <div className='container'>
                                    <div className='col-3'>
                                        <div className="card" style={{ width: '185px', height: '120px', overflow: "hidden" }}>
                                            {imageFrontAfter && (<img src={imageFrontAfter} className='' alt="Foto Frontal Después" style={{ objectFit: "fill", zIndex: "2", width: "155px", height: "120px", top: "15px", left: "15px", position: "relative" }} />)}
                                            <input
                                                type="file"
                                                className="form-control-file d-none"
                                                id="fotoFrontAfter"
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(e, setImageFrontAfter)}
                                            />
                                            <label htmlFor='fotoFrontAfter' style={{ width: "50%", height: "100%", }}>
                                                <div className="h6 mb-4 text-secondary border-bottom border-secondary" style={{ position: "relative", left: "100px", width: "85px", top: "90px" }}>
                                                    Examinar
                                                </div>
                                                <img src={fotoimage} alt="foto ejemplo" style={{ width: "55px", zIndex: "1", position: "relative", height: "55px", bottom: "20px" }} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col" style={{ display: "flex", flexDirection: "row", alignItems: "center", columnGap: "50px", marginBottom: "15px" }}>
                                <div className='col-3'>Foto posterior:</div>
                                <div className='col-3'>
                                    <div className="card" style={{ width: '185px', height: '120px', overflow: "hidden" }}>
                                        {image && 
                                        <img 
                                        src={image} 
                                        className='' 
                                        alt="Foto-subida" 
                                        style={{ 
                                            objectFit: "fill", 
                                            zIndex: "2", 
                                            width: "191px", 
                                            height: "120px", 
                                            top: "10px", 
                                            left: "0px", 
                                            position: "relative" 
                                            }} />}
                                        {/* <input
                                            type="file"
                                            className="form-control-file d-none"
                                            id="fotoimg"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        /> */}

                                        <label htmlFor='fotoimg' style={{ width: "50%", height: "100%", }}>
                                            <div className="h6 mb-4 text-secondary border-bottom border-secondary" style={{ position: "relative", left: "100px", width: "85px", top: "90px" }}>
                                                Examinar
                                            </div>
                                            <img src={fotoimage} alt="foto ejemplo" style={{ width: "55px", zIndex: "1", position: "relative", height: "55px", bottom: "20px" }} />
                                        </label>
                                    </div>
                                </div>
                                <div className='col-3'>
                                    <div className="card" style={{ width: '185px', height: '120px', overflow: "hidden" }}>
                                        {imageBackAfter && <img src={imageBackAfter} className='' alt="Foto-Foto Posterior Después" style={{ objectFit: "fill", zIndex: "2", width: "155px", height: "120px", top: "15px", left: "15px", position: "relative" }} />}
                                        <input
                                            type="file"
                                            className="form-control-file d-none"
                                            id="fotoBackAfter"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, setImageBackAfter)}
                                        />

                                        <label htmlFor='fotoBackAfter' style={{ width: "50%", height: "100%", }}>
                                            <div className="h6 mb-4 text-secondary border-bottom border-secondary" style={{ position: "relative", left: "100px", width: "85px", top: "90px" }}>
                                                Examinar
                                            </div>
                                            <img src={fotoimage} alt="foto ejemplo" style={{ width: "55px", zIndex: "1", position: "relative", height: "55px", bottom: "20px" }} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col" style={{ display: "flex", flexDirection: "row", columnGap: "50px", marginBottom: "15px" }}>

                                <div className='col-3' >Observaciones: </div>
                                <div className='col-9'>
                                    <input type="observaciones" className="form-control" id="observaciones" style={{ width: "300px", height: "100px" }} />
                                </div>
                            </div>

                            <button type="button" className="btn btn-success">Guardar</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    )
}
