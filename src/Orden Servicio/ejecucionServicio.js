import React, { useState } from 'react'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from 'react-router-dom';
import fotoimage from '../img/fotoup.jpeg';

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
            <div class="container text-center">
                <div class="row align-items-start">
                    <div class="col">
                        Placa: 40H
                    </div>
                    <div class="col">
                        Placa: 28H
                    </div>
                    <div class="col">
                        <button className="fa-sharp fa-solid fa-file-pdf p-2 g-col-6"
                            style={{ listStyle: "none", color: "black", fontSize: "31px", background: "none", border: "none" }}
                            onClick={exportToPDF}>
                        </button>
                    </div>
                </div>
            </div>

            <div class="h4 pb-2 mb-4  border-bottom border-black"></div>

            <form class="container text-center">
                <div class="row align-items-start">
                    <div class="col">

                        <div class="col" style={{ display: "flex", flexDirection: "row" }}>

                            <div className='col-2'>operarios: *</div>
                            <div className='col-6'>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                        </div>

                        <div className='text-start' style={{ margin: "10px" }}>Servicios asignados:</div>

                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Servicio</th>
                                    <th scope="col">Inicio</th>
                                    <th scope="col">Terminado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Cambio de pastillas</td>
                                    <td> <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /></td>
                                    <td> <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /></td>
                                </tr>
                                <tr>
                                    <td>Cambio de aceite</td>
                                    <td> <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /></td>
                                    <td> <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /></td>
                                </tr>
                                <tr>
                                    <td>Lavado</td>
                                    <td> <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /></td>
                                    <td> <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /></td>
                                </tr>
                                <tr>
                                    <td>Cambio filtro de aire</td>
                                    <td> <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /></td>
                                    <td> <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." /></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="h4 pb-2 mb-4  border-bottom border-black"></div>

                        <div class="col" style={{ display: "flex", flexDirection: "row" }}>
                            <div className='col-4'>Productos según servicio:</div>
                            <div className='col-5'>
                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <Link className='col-4'>Agregar</Link>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Referencia</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Terminado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="col">
                        <div class="col" style={{ display: "flex", flexDirection: "row" }}>
                            <div className='col-3'>Fecha Inicio:</div>
                            <div className='col-3'>
                                <input type="date" class="form-control" id="date" />
                            </div>
                            <div className='col-3'>Fecha Final:</div>
                            <div className='col-3'>
                                <input type="date" class="form-control" id="date" />
                            </div>
                        </div>

                        <div>
                            <div class="col">
                                <div class="col" style={{ display: "flex", flexDirection: "row" }}>
                                    <div className='col-3'>Hora Inicio:</div>
                                    <div className='col-3'>
                                        <input type="time" class="form-control" id="start-time" />
                                    </div>
                                    <div className='col-3'>Hora Final:</div>
                                    <div className='col-3'>
                                        <input type="time" class="form-control" id="end-time" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='container'>
                            <div class="container text-center">
                                <div class="row align-items-start">
                                    <div class="col">
                                        Antes
                                    </div>
                                    <div class="col">
                                        Despues
                                    </div>
                                </div>
                            </div>



                            <div class="col" style={{ display: "flex", flexDirection: "row", alignItems:"center", gap:"20px" }}>
                                <div className='col-3'>Foto frontal:</div>
                                <div className='col-3'>
                                    <div className="card" style={{ width: '100px', height: '100px', overflow: "hidden" }}>
                                        {image && <img src={image} className='' alt="Foto-subida" style={{ objectFit: "fill", zIndex: "2", width: "191px", height: "50px", top: "10px", left: "80px", position: "relative" }} />}
                                        <input
                                            type="file"
                                            className="form-control-file d-none"
                                            id="fotoimg"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />

                                        <label htmlFor='fotoimg' style={{ width: "50%", height: "100%", }}>
                                            <div class="h6 mb-4 text-secondary border-bottom border-secondary" style={{ position: "relative", left: "250px", width: "95px", top: "100px" }}>
                                                Examinar
                                            </div>
                                            <img src={fotoimage} alt="foto ejemplo" style={{ width: "90px", zIndex: "1", left: "50px", position: "relative", height: "90px", bottom: "30px", }} />
                                        </label>
                                    </div>
                                </div>
                                <div className='col-3'>
                                    <div className="card" style={{ width: '100px', height: '100px', overflow: "hidden" }}>
                                        {image && <img src={image} className='' alt="Foto-subida" style={{ objectFit: "fill", zIndex: "2", width: "191px", height: "50px", top: "10px", left: "80px", position: "relative" }} />}
                                        <input
                                            type="file"
                                            className="form-control-file d-none"
                                            id="fotoimg"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />

                                        <label htmlFor='fotoimg' style={{ width: "50%", height: "100%", }}>
                                            <div class="h6 mb-4 text-secondary border-bottom border-secondary" style={{ position: "relative", left: "250px", width: "95px", top: "100px" }}>
                                                Examinar
                                            </div>
                                            <img src={fotoimage} alt="foto ejemplo" style={{ width: "90px", zIndex: "1", left: "50px", position: "relative", height: "90px", bottom: "30px", }} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col" style={{ display: "flex", flexDirection: "row", alignItems:"center", gap:"20px" }}>
                                <div className='col-3'>Foto posterior:</div>
                                <div className='col-3'>
                                    <div className="card" style={{ width: '194px', height: '104px', overflow: "hidden" }}>
                                        {image && <img src={image} className='' alt="Foto-subida" style={{ objectFit: "fill", zIndex: "2", width: "191px", height: "50px", top: "10px", left: "80px", position: "relative" }} />}
                                        <input
                                            type="file"
                                            className="form-control-file d-none"
                                            id="fotoimg"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />

                                        <label htmlFor='fotoimg' style={{ width: "50%", height: "100%", }}>
                                            <div class="h6 mb-4 text-secondary border-bottom border-secondary" style={{ position: "relative", left: "250px", width: "95px", top: "100px" }}>
                                                Examinar
                                            </div>
                                            <img src={fotoimage} alt="foto ejemplo" style={{ width: "90px", zIndex: "1", left: "50px", position: "relative", height: "90px", bottom: "30px", }} />
                                        </label>
                                    </div>
                                </div>
                                <div className='col-3'>
                                    <div className="card"style={{ display: "flex", flexDirection: "row", alignItems:"center", gap:"20px" }}>
                                        {image && <img src={image} className='' alt="Foto-subida" style={{ objectFit: "fill", zIndex: "2", width: "191px", height: "50px", top: "10px", left: "80px", position: "relative" }} />}
                                        <input
                                            type="file"
                                            className="form-control-file d-none"
                                            id="fotoimg"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />

                                        <label htmlFor='fotoimg' style={{ width: "50%", height: "100%", }}>
                                            <div class="h6 mb-4 text-secondary border-bottom border-secondary" style={{ position: "relative", left: "250px", width: "95px", top: "100px" }}>
                                                Examinar
                                            </div>
                                            <img src={fotoimage} alt="foto ejemplo" style={{ width: "90px", zIndex: "1", left: "50px", position: "relative", height: "90px", bottom: "30px", }} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col" style={{ display: "flex", flexDirection: "row" }}>

                                <div className='col-4' >Observaciones: </div>
                                <div className='col-6'>
                                    <input type="observaciones" class="form-control" id="observaciones" style={{ width: "300px", height: "100px" }} />
                                </div>
                            </div>

                            <button type="button" class="btn btn-success">Guardar</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    )
}
