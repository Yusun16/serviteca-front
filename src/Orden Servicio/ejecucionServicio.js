import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import Select from 'react-select';
import ModalAgregarEjecucion from '../Orden Servicio/modalAgregarEjecucion';
import fotoimage from '../img/fotoup.jpeg';

export default function EjecucionServicio() {
    const [image, setImage] = useState(null);
    const [backImage, setBackImage] = useState(null);
    const [imageBackAfter, setImageBackAfter] = useState(null);
    const [imageFrontAfter, setImageFrontAfter] = useState(null);
    const [datosOrden, setDatosOrden] = useState([]);
    const [error, setError] = useState(null);
    const [fechaInicio, setFechaInicio] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [operarios, setOperarios] = useState([]);
    const [selectedOperario, setSelectedOperario] = useState(null);
    const [autopartes, setAutopartes] = useState([]);
    const [autopartesSeleccionadas, setAutopartesSeleccionadas] = useState([]);
    const [autopartesSeleccionadasIds, setAutopartesSeleccionadasIds] = useState([]);
    const [checkboxState, setCheckboxState] = useState([]);
    const [idRevision, setIdRevision] = useState([]);

    const exportToPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["Código", "Descripción", "Valor del Servicio", "Año", "Porcentaje del Operario"];
        const tableRows = [];

        const segundaTablaColumn = ["Referencia", "Cantidad", "Terminado"];
        const segundaTablaRows = [];

        const placa = datosOrden.length > 0 ? datosOrden[0].placaVehiculo : '';
        const codigo = datosOrden.length > 0 ? datosOrden[0].codigoOrden : '';

        const operarioSeleccionado = document.getElementById('operario-select');
        const productoSeleccionado = document.querySelector('select[aria-label="productos según servicio"]');

        const operarioValue = operarioSeleccionado?.value || 'No seleccionado';
        const productoValue = productoSeleccionado ? productoSeleccionado.value : 'No seleccionado';

        datosOrden.forEach(orden => {
            const serviceData = [
                orden.nombreServicio,
                orden.horaInicio || "No definido",
                orden.horaTerminado || "No definido"
            ];
            tableRows.push(serviceData);
        });

        const datosSegundaTabla = [
            { referencia: "Mark", cantidad: "Otto", terminado: "@mdo" },
            { referencia: "Jacob", cantidad: "Thornton", terminado: "@fat" },
        ];

        datosSegundaTabla.forEach(item => {
            const segundaTablaData = [
                item.referencia,
                item.cantidad,
                item.terminado
            ];
            segundaTablaRows.push(segundaTablaData);
        });

        doc.text("Ejecución del Servicio", 14, 20);
        const fechaFinal = document.getElementById('dateFinal').value || 'No definido';
        const horaFinal = document.getElementById('end-time').value || 'No definido';

        doc.text(`Placa: ${placa}`, 14, 30);
        doc.text(`Código: ${codigo}`, 14, 35);
        doc.text(`Operario: ${operarioValue}`, 14, 40);
        doc.text(`Producto Seleccionado: ${productoValue}`, 14, 45);
        doc.text(`Fecha Inicio: ${fechaInicio}`, 14, 50);
        doc.text(`Fecha Final: ${fechaFinal}`, 14, 55);
        doc.text(`Hora Inicio: ${horaInicio}`, 14, 60);
        doc.text(`Hora Final: ${horaFinal}`, 14, 65);

        doc.autoTable(tableColumn, tableRows, { startY: 70 });
        const segundaTablaStartY = doc.lastAutoTable.finalY + 10;
        doc.autoTable(segundaTablaColumn, segundaTablaRows, { startY: segundaTablaStartY });

        if (image) {
            doc.addImage(image, 'JPEG', 14, doc.lastAutoTable.finalY + 10, 40, 30);
        }
        if (imageFrontAfter) {
            doc.addImage(imageFrontAfter, 'JPEG', 60, doc.lastAutoTable.finalY + 10, 40, 30);
        }
        if (imageBackAfter) {
            doc.addImage(imageBackAfter, 'JPEG', 106, doc.lastAutoTable.finalY + 10, 40, 30);
        }

        doc.save("ejecucion_servicio.pdf");
    };

    useEffect(() => {
        const idOrden = localStorage.getItem('idOrden');

        const fetchEjecucionServicio = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/serviteca/ejecucion?idOrden=${idOrden}`);
                setDatosOrden(response.data);

                if (response.data.length > 0) {
                    setFechaInicio(response.data[0].fechaOrden);
                    setHoraInicio(response.data[0].horaOrden);
                    setImage(response.data[0].imgFrontalRevision);
                    setBackImage(response.data[0].imgBackRevision);
                    setIdRevision(response.data[0].idRevision);
                }

                setCheckboxState(response.data.map(() => ({ inicio: false, terminado: false })));
            } catch (err) {
                setError(err);
            }
        };

        const fetchOperarios = async () => {
            try {
                const response = await axios.get('http://localhost:8080/serviteca/operarios');
                setOperarios(response.data.map(operario => ({
                    value: operario.id,
                    label: `${operario.nombre} ${operario.apellido}`
                })));
            } catch (err) {
                console.error("Error al obtener operarios:", err);
            }
        };

        const fetchAutopartes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/serviteca/autopartes');
                setAutopartes(response.data);
            } catch (error) {
                console.error("Error fetching autopartes:", error);
            }
        };

        fetchEjecucionServicio();
        fetchOperarios();
        fetchAutopartes();
    }, []);

    const handleCheckboxChange = (index, type) => {
        setCheckboxState(prevState =>
            prevState.map((item, idx) => {
                if (idx === index) {
                    return {
                        inicio: type === 'inicio' ? true : false,
                        terminado: type === 'terminado' ? true : false
                    };
                }
                return item;
            })
        );
    };

    const handleFechaChange = (e) => {
        setFechaInicio(e.target.value);
    };

    const handleHoraChange = (e) => {
        setHoraInicio(e.target.value);
    };

    const enviarDatos = async () => {
        const idOrden = localStorage.getItem('idOrden');
        try {
            const response = await axios.get(`/ejecucion?idOrden=${idOrden}`, {
                params: { fechaInicio }
            });
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    const handleImageChange = (e, setter) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setter(imageUrl);  // Establecer la URL de la imagen
        }
    };

    const handleSubmit = async () => {
        try {
            const operarioId = selectedOperario?.value;
            const fechaFinal = document.getElementById('dateFinal').value;
            const horaFinal = document.getElementById('end-time').value;
            const observaciones = document.getElementById('observaciones').value;
            const horaFinalDate = new Date(`${fechaFinal} ${horaFinal}`);
            const checkboxData = checkboxState.map((state, index) => ({
                servicio: datosOrden[index].nombreServicio,
                inicio: state.inicio,
                terminado: state.terminado
            }));

            const idOrden = localStorage.getItem('idOrden');

            const formattedHoraFin = horaFinalDate.toLocaleTimeString('it-IT', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            const payload = {
                idOrden: idOrden,
                estado: !checkboxData.some(item => item.terminado),
                fechaFin: fechaFinal,
                horaFin: formattedHoraFin,
                observaciones,
                operario: {
                    id: operarioId
                }
            };

            const response = await axios.put(`http://localhost:8080/serviteca/orden/${idOrden}`, payload);
            console.log('Datos de la orden enviados con éxito:', response.data);

            const revisionPayload = {
                id: idRevision,
                imgFrontalDespues: imageFrontAfter,
                imgBackDespues: imageBackAfter
            };

            const responseRevision = await axios.put(`http://localhost:8080/serviteca/revisiones/${idRevision}`, revisionPayload);
            console.log('Imágenes de revisión enviadas con éxito:', responseRevision.data);

            for (const autoparte of autopartesSeleccionadas) {
                const autopartePayload = {
                    autoparte: { idAupartes: autoparte.idAupartes },
                    orden: { idOrden: idOrden }
                };

                try {
                    const responseAutoparte = await axios.post(
                        "http://localhost:8080/api/orden-autoparte",
                        autopartePayload
                    );
                    console.log(`Autoparte con ID ${autoparte.idAupartes} vinculada a la orden con éxito:`, responseAutoparte.data);
                } catch (error) {
                    console.error(`Error al vincular autoparte con ID ${autoparte.idAupartes}:`, error);
                }
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };

    const handleAutopartesSeleccionadas = (seleccionadas) => {
        setAutopartesSeleccionadas(seleccionadas);
    };

    const handleEliminarAutoparte = (e, referencia) => {
        e.preventDefault();

        const nuevasAutopartes = autopartesSeleccionadas.filter(
            (autoparte) => autoparte.referencia !== referencia
        );
        setAutopartesSeleccionadas(nuevasAutopartes);

        const autoparteEliminada = autopartesSeleccionadas.find(
            (autoparte) => autoparte.referencia === referencia
        );
        if (autoparteEliminada) {
            setAutopartesSeleccionadasIds((prevIds) =>
                prevIds.filter((id) => id !== autoparteEliminada.idAupartes)
            );
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

                        <div className="row" style={{ display: "flex", alignItems: "center" }}>
                            <div className="col-2">
                                <label>Operario: *</label>
                            </div>
                            <div className="col-6">
                                <Select
                                    id="operario-select"
                                    options={operarios}
                                    value={selectedOperario}
                                    onChange={setSelectedOperario}
                                    placeholder="Selecciona un operario"
                                    isClearable
                                />
                            </div>
                            {error && (
                                <div className="col-4 text-danger">
                                    Error al obtener datos: {error.message}
                                </div>
                            )}
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
                                {datosOrden.map((orden, index) => (
                                    <tr key={index} className='tr-table-tr text-center'>
                                        <td>{orden.nombreServicio}</td>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={checkboxState[index]?.inicio || false}
                                                onChange={() => handleCheckboxChange(index, 'inicio')}
                                                id={`inicio-${index}`}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={checkboxState[index]?.terminado || false}
                                                onChange={() => handleCheckboxChange(index, 'terminado')}
                                                id={`terminado-${index}`}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                        <div className="h4 pb-2 mb-4  border-bottom border-black"></div>

                        <div className="col" style={{ display: "flex", flexDirection: "row" }}>
                            <div className='col-4'>Productos según servicio:</div>
                            <div className='col-5'>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={datosOrden.map((orden) => orden.nombreServicio).join(', ')}
                                    readOnly
                                />
                            </div>
                            <div className=' col-4'>
                                <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#firstModal">
                                    <i class="fas fa-align-left fas fa-plus"></i>  Agregar
                                </button>
                                {/* Instancia única de ModalAgregarEjecucion */}
                                <ModalAgregarEjecucion
                                    onAutopartesSeleccionadas={handleAutopartesSeleccionadas}
                                    datosOrden={datosOrden}
                                    autopartesSeleccionadas={autopartesSeleccionadas}
                                    setAutopartesSeleccionadas={setAutopartesSeleccionadas}
                                    autopartesSeleccionadasIds={autopartesSeleccionadasIds}
                                    setAutopartesSeleccionadasIds={setAutopartesSeleccionadasIds}
                                />
                            </div>
                        </div>

                        {/* Tabla para autopartes */}
                        <table className="container" style={{ marginTop: "15px", marginBottom: "20px" }}>
                            <thead>
                                <tr className='tr-table-tr text-center'>
                                    <th className='text-letras colorthead text-center' scope="col">Referencia</th>
                                    <th className='text-letras colorthead text-center' scope="col">Cantidad</th>
                                    <th className='text-letras colorthead text-center' scope="col">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {autopartesSeleccionadas.map((autoparte, index) => (
                                    <tr key={index} className='tr-table-tr text-center'>
                                        <td>{autoparte.referencia}</td>
                                        <td>{autoparte.cantidad}</td>
                                        <td>
                                            <button
                                                onClick={(e) => handleEliminarAutoparte(e, autoparte.referencia)}
                                                className="btn btn-danger btn-sm"
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
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
                                <input type="date" className="form-control" id="dateFinal" />
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
                                        {imageFrontAfter && (
                                            <img
                                                src={imageFrontAfter}
                                                className=''
                                                alt="Foto-Foto Posterior Después"
                                                style={{
                                                    objectFit: "fill",
                                                    zIndex: "2",
                                                    width: "155px",
                                                    height: "120px",
                                                    top: "15px",
                                                    left: "15px",
                                                    position: "relative"
                                                }}
                                            />
                                        )}
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

                                {/* Foto Posterior */}
                                <div className='col-3'>Foto posterior:</div>
                                <div className='col-3'>
                                    <div className="card" style={{ width: '185px', height: '120px', overflow: "hidden" }}>
                                        {backImage ? (
                                            <img
                                                src={backImage}
                                                alt="Foto posterior"
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
                                        ) : (
                                            <div>Cargando imagen posterior...</div>
                                        )}
                                    </div>
                                </div>
                                <div className='col-3'>
                                    <div className="card" style={{ width: '185px', height: '120px', overflow: "hidden" }}>
                                        {/* Mostrar la imagen solo si existe una URL */}
                                        {imageBackAfter && (
                                            <img
                                                src={imageBackAfter}
                                                className=''
                                                alt="Foto-Foto Posterior Después"
                                                style={{
                                                    objectFit: "fill",
                                                    zIndex: "2",
                                                    width: "155px",
                                                    height: "120px",
                                                    top: "15px",
                                                    left: "15px",
                                                    position: "relative"
                                                }}
                                            />
                                        )}
                                        {/* Input para seleccionar la imagen */}
                                        <input
                                            type="file"
                                            className="form-control-file d-none"
                                            id="fotoBackAfter"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, setImageBackAfter)} // Actualiza la imagen
                                        />
                                        <label htmlFor='fotoBackAfter' style={{ width: "50%", height: "100%" }}>
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

                            <button type="button" className="btn btn-success" onClick={handleSubmit}>Guardar</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    )
}
