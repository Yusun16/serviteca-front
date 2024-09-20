import React, { useState } from 'react'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from 'react-router-dom';
import fotoimage from '../img/fotoup.jpeg';
import ModalAgregarEjecucion from '../Orden Servicio/modalAgregarEjecucion';

export default function EjecucionServicio() {

    const exportToPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["Codigo", "Descripción", "Valor del Servicio", "Año", "Porcentaje del Operario"];
        const tableRows = [];

        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.text("Listado de Servicios", 14, 15);
        doc.save("listado_servicios.pdf");
    };

    // Estado para manejar la imagen
    const [image, setImage] = useState(null);

    // Función para manejar el cambio de la imagen
    const handleImageChange = (e) => {
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
                    <div className="col">
                        Placa: 40H
                    </div>
                    <div className="col">
                        Placa: 28H
                    </div>
                    <div className="col">
                        <button className="fa-sharp fa-solid fa-file-pdf p-2 g-col-6"
                            style={{ listStyle: "none", color: "black", fontSize: "31px", background: "none", border: "none" }}
                            onClick={exportToPDF}>
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

                        <table className="container">
                            <thead>
                                <tr>
                                    <th className='text-letras colorthead text-center' scope="col">Servicio</th>
                                    <th className='text-letras colorthead text-center' scope="col">Inicio</th>
                                    <th className='text-letras colorthead text-center' scope="col">Terminado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='tr-table-tr text-center'>
                                    <td>Cambio de pastillas</td>
                                    <td> <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /></td>
                                    <td> <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /></td>
                                </tr>
                                <tr className='tr-table-tr text-center' >
                                    <td>Cambio de aceite</td>
                                    <td> <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /></td>
                                    <td> <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /></td>
                                </tr>
                                <tr className='tr-table-tr text-center'>
                                    <td>Lavado</td>
                                    <td> <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /></td>
                                    <td> <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /></td>
                                </tr>
                                <tr className='tr-table-tr text-center'>
                                    <td>Cambio filtro de aire</td>
                                    <td> <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /></td>
                                    <td> <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /></td>
                                </tr>
                                <tr  >
                                    <th className='text-letras colorthead ' style={{ padding: "10px 0px" }} scope="col"></th>
                                    <th className='text-letras colorthead' scope="col"></th>
                                    <th className='text-letras colorthead' scope="col"></th>

                                </tr>
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
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalagregarejecucion">
                              Agregar
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
                                <input type="date" className="form-control" id="date" />
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
                                        <input type="time" className="form-control" id="start-time" />
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
                                <div className='col-3'>Foto frontal:</div>
                                <div className='col-3'>
                                    <div className="card" style={{ width: '185px', height: '120px', overflow: "hidden" }}>
                                        {image && <img src={image} className='' alt="Foto-subida" style={{ objectFit: "fill", zIndex: "2", width: "191px", height: "50px", top: "10px", left: "80px", position: "relative" }} />}
                                        <input
                                            type="file"
                                            className="form-control-file d-none"
                                            id="fotoimg"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />

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
                                        {image && <img src={image} className='' alt="Foto-subida" style={{ objectFit: "fill", zIndex: "2", width: "191px", height: "50px", top: "10px", left: "80px", position: "relative" }} />}
                                        <input
                                            type="file"
                                            className="form-control-file d-none"
                                            id="fotoimg"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />

                                        <label htmlFor='fotoimg' style={{ width: "50%", height: "100%", }}>
                                            <div className="h6 mb-4 text-secondary border-bottom border-secondary" style={{ position: "relative", left: "100px", width: "85px", top: "90px" }}>
                                                Examinar
                                            </div>
                                            <img src={fotoimage} alt="foto ejemplo" style={{ width: "55px", zIndex: "1", position: "relative", height: "55px", bottom: "20px" }} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col" style={{ display: "flex", flexDirection: "row", alignItems: "center", columnGap: "50px", marginBottom: "15px" }}>
                                <div className='col-3'>Foto posterior:</div>
                                <div className='col-3'>
                                    <div className="card" style={{ width: '185px', height: '120px', overflow: "hidden" }}>
                                        {image && <img src={image} className='' alt="Foto-subida" style={{ objectFit: "fill", zIndex: "2", width: "191px", height: "50px", top: "10px", left: "80px", position: "relative" }} />}
                                        <input
                                            type="file"
                                            className="form-control-file d-none"
                                            id="fotoimg"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />

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
                                        {image && <img src={image} className='' alt="Foto-subida" style={{ objectFit: "fill", zIndex: "2", width: "191px", height: "50px", top: "10px", left: "80px", position: "relative" }} />}
                                        <input
                                            type="file"
                                            className="form-control-file d-none"
                                            id="fotoimg"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />

                                        <label htmlFor='fotoimg' style={{ width: "50%", height: "100%", }}>
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
