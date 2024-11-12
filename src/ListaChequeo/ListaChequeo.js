import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imglist from "../img/imglist.png";
import LogoGasolina from "../img/LogoGasolina.svg";
import axios from 'axios';

const CheckListComponent = () => {
    const idOrden = localStorage.getItem('idOrden');
    const [images, setImages] = useState([null, null, null, null, null]);
    const [formData, setFormData] = useState({
        orden: {
            idOrden: idOrden
        },
        observationsRight: '',
        observationsLeft: '',
        observationsFrontal: '',
        observationsBack: '',
        observationsIndicador: '',
    });

    const urlBase = "http://localhost:8080/serviteca/servicios";
    const [combustible, setCombustible] = useState('');
    const navigate = useNavigate();
    const [listachequeo, setListachequeo] = useState([]);
    const [historicoData, setHistoricoData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchHistoricoData = async () => {
            try {
                const vehiculoId = localStorage.getItem('idVehiculo');
                const response = await axios.get(`http://localhost:8080/serviteca/historicoVehiculo`, {
                    params: { vehiculoId }
                });
                setHistoricoData(response.data);
            } catch (error) {
                console.error('Error al obtener el historial del vehículo:', error);
            }
        };


        fetchHistoricoData();
        cargarServicios();
    }, []);

    const cargarServicios = async () => {
        const token = localStorage.getItem('token');
        const resultado = await axios.get(urlBase, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setListachequeo(resultado.data);
    };


    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const updatedImages = [...images];
            updatedImages[index] = file;
            setImages(updatedImages);
        }
    };

    const handleObservationChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFuelChange = (event) => {
        setCombustible(event.target.id);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        try {
            // Enviar los datos del formulario para agregar los campos de observacion
            const response = await axios.post('http://localhost:8080/serviteca/revisiones', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const revisionId = response.data.id;
            // Preparar FormData para la solicitud PUT para cargar las imagenes x5
            const formDataWithFiles = new FormData();
            formDataWithFiles.append('id', revisionId);

            images.forEach(image => {
                if (image) {
                    formDataWithFiles.append('files', image);
                }
            });

            Object.keys(formData).forEach(key => {
                formDataWithFiles.append(key, formData[key]);
            });

            // Enviar FormData que incluye las imágenes
            await axios.put('http://localhost:8080/serviteca/revisiones/uploadFotos', formDataWithFiles, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            navigate("/ejecucionservicio");
        } catch (error) {
            console.error('Error al enviar los datos', error);
            alert('Hubo un problema al enviar los datos');
        }
    };

    // Calcular el índice del primer y último elemento de la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Extraer los elementos de la página actual
    const currentItems = listachequeo.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(listachequeo.length / itemsPerPage);

    // Función para cambiar de página
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const currentData = historicoData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="container">
            <div className='d-flex justify-content-between'>
                <div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/ordenservicio"><i className="fa-solid fa-house"></i> Inicio</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Orden de Servicio</li>
                            <li className="breadcrumb-item active" aria-current="page">Lista de Chequeo</li>
                        </ol>
                    </nav>
                </div>
                <div className='d-flex flex-row-reverse  gap-0 column-gap-3'>
                    <button type="button" className="btn text-color-items" data-bs-toggle="modal" data-bs-target="#inventario">
                        <i className="fa-solid fa-list"></i> Inventario
                    </button>
                    <button type="button" className="btn text-color-items" data-bs-toggle="modal" data-bs-target="#historia">
                        <i className="fa-solid fa-clock-rotate-left"></i> Historial
                    </button>
                </div>

                {/* Modal Inventario */}
                <div className="modal fade" id="inventario" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Inventario</h1>
                                <button type="button" className="btnn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className='container'>
                                    <table className="container">
                                        <thead>
                                            <tr className='tr001 text-center'>
                                                <th className='colorthead' scope="col">Descripción</th>
                                                <th className='colorthead' scope="col">Chequeo</th>
                                                <th className='colorthead' scope="col">Observación</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-center'>
                                            <tr className='tr001'>
                                                <td>parlantes</td>
                                                <td>
                                                    <div className="form-check">
                                                        <input className="form-check-input" style={{ marginLeft: "1px", float: "initial" }} type="checkbox" value="" id="flexCheckDefault" />
                                                    </div>
                                                </td>
                                                <td>6 parlantes</td>
                                            </tr>
                                            <tr>
                                                <td>Radio</td>
                                                <td>
                                                    <div className="form-check flex-center">
                                                        <input className="form-check-input" style={{ marginLeft: "1px", float: "initial" }} type="checkbox" value="" id="flexCheckDefault" />
                                                    </div>
                                                </td>
                                                <td>Sony</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Historia */}
                <div className="modal fade" id="historia" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Seleccione el N° de servicio para abrir la ejecución</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <table className="container text-center">
                                    <thead>
                                        <tr className='tr001'>
                                            <th className='colorthead' scope="col">Fecha de Servicio</th>
                                            <th className='colorthead' scope="col">N° Kilometros</th>
                                            <th className='colorthead' scope="col">N° de Servicio</th>
                                            <th className='colorthead' scope="col">Nombre operario</th>
                                            <th className='colorthead' scope="col">Observación</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        {currentData.map((item, index) => (
                                            <tr
                                                className='tr001'
                                                key={index}
                                                onClick={() => handleRowClick(item.idOrden)} // Llama a handleRowClick con idOrden
                                                style={{ cursor: 'pointer' }} // Cambia el cursor para indicar que la fila es clicable
                                            >
                                                <td>{item.fechaOrden}</td>
                                                <td>{item.kilometros} km</td>
                                                <td>{item.idOrden}</td>
                                                <td>{item.nombreOperario}</td>
                                                <td>{item.observacion || "No se observa nada"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="h4 pb-2 mb-4 border-bottom border-black"></div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h6><span>Mostrando {currentPage} de {totalPages}</span></h6>
                                <div className="d-flex justify-content-start justify-content-end">
                                    <button
                                        className="btn btn-secondary me-2"
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        Anterior
                                    </button>
                                    <button type="button" className="btn btn-light"><span>{currentPage}</span></button>
                                    <button
                                        className="btn btn-secondary ms-2"
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className='mb-3 text-center' style={{ width: "353px", height: "62px" }}>Lista de Chequeo</h3>

            <form onSubmit={handleSubmit}>
                <div className="" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "5%", justifyItems: "center" }}>
                    {/* Foto Lateral Derecho */}
                    <div className="listcehk" style={{ display: "flex", alignItems: "center", width: "104%" }}>
                        <label className="" style={{ marginRight: "107px" }} htmlFor="imageRight">Foto Lateral Derecho: *</label>
                        <div className="">
                            <div className="card" style={{ width: '367px', height: '180px' }}>
                                {images[2] ? (
                                    <img src={URL.createObjectURL(images[2])} alt="Foto Lateral Derecho" className="card-img-top" style={{ height: '100%', width: '-webkit-fill-available', maxWidth: '145%', objectFit: 'fill' }} />
                                ) : (
                                    <label htmlFor="imageRight" className="card-body text-center">
                                        <img src={imglist} style={{ width: "117.86px", position: "relative", right: "35px" }}></img>
                                        <div class="h6 mb-4 text-secondary border-bottom border-secondary" style={{ position: "relative", left: "150px", width: "95px" }}>
                                            Examinar
                                        </div>
                                    </label>
                                )}
                                <input
                                    type="file"
                                    className="form-control-file d-none"
                                    id="imageRight"
                                    name="imageRight"
                                    accept="image/*"
                                    required
                                    onChange={(e) => handleImageChange(e, 2)}
                                />
                            </div>
                            <div className="form-group mt-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="observacionDerecha"
                                    placeholder="Observación: *"
                                    required
                                    name="observationsRight"
                                    value={formData.observationsRight}
                                    onChange={handleObservationChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Foto Frontal */}
                    <div className="listcehk" style={{ display: "flex", alignItems: "center", width: "104%" }}>
                        <label className="" style={{ marginRight: "115px" }} htmlFor="imageFrontal">Foto Frontal</label>
                        <div className="">
                            <div className="card" style={{ width: '367px', height: '180px' }}>
                                {images[0] ? (
                                    <img src={URL.createObjectURL(images[0])} alt="Foto Frontal" className="card-img-top" style={{ height: '180px', width: '-webkit-fill-available', maxWidth: '145%', objectFit: 'fill' }} />
                                ) : (
                                    <label htmlFor="imageFrontal" className="card-body text-center">
                                        <img src={imglist} style={{ width: "117.86px", position: "relative", right: "35px" }}></img>
                                        <div class="h6 mb-4 text-secondary border-bottom border-secondary" style={{ position: "relative", left: "150px", width: "95px" }}>
                                            Examinar
                                        </div>
                                    </label>
                                )}
                                <input
                                    type="file"
                                    className="form-control-file d-none"
                                    id="imageFrontal"
                                    accept="image/*"
                                    required
                                    onChange={(e) => handleImageChange(e, 0)}
                                    name="imageFrontal"
                                />
                            </div>
                            <div className="form-group mt-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="observacionFrontal"
                                    placeholder="Observación: *"
                                    required
                                    name="observationsFrontal"
                                    value={formData.observationsFrontal}
                                    onChange={handleObservationChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Foto Lateral Izquierda */}
                    <div className="listcehk" style={{ display: "flex", alignItems: "center", width: "104%" }}>
                        <label className="" style={{ marginRight: "115px" }} htmlFor="imageLeft">Foto Lateral Izquierda</label>
                        <div className="">
                            <div className="card" style={{ width: '367px', height: '180px' }}>
                                {images[3] ? (
                                    <img src={URL.createObjectURL(images[3])} alt="Foto Lateral Izquierda" className="card-img-top" style={{ height: '180px', width: '-webkit-fill-available', maxWidth: '145%', objectFit: 'fill' }} />
                                ) : (
                                    <label htmlFor="imageLeft" className="card-body text-center">
                                        <img src={imglist} style={{ width: "117.86px", position: "relative", right: "35px" }}></img>
                                        <div class="h6 mb-4 text-secondary border-bottom border-secondary" style={{ position: "relative", left: "150px", width: "95px" }}>
                                            Examinar
                                        </div>
                                    </label>
                                )}
                                <input
                                    type="file"
                                    className="form-control-file d-none"
                                    id="imageLeft"
                                    accept="image/*"
                                    required
                                    onChange={(e) => handleImageChange(e, 3)}
                                    name="imageLeft"
                                />
                            </div>
                            <div className="form-group mt-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="observacionIzquierda"
                                    placeholder="Observación: *"
                                    required
                                    name="observationsLeft"
                                    value={formData.observationsLeft}
                                    onChange={handleObservationChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Foto Posterior */}
                    <div className="listcehk" style={{ display: "flex", alignItems: "center", width: "104%" }}>
                        <label className="" style={{ marginRight: "115px" }} htmlFor="imageBack">Foto Posterior</label>
                        <div className="">
                            <div className="card" style={{ width: '367px', height: '180px' }}>
                                {images[1] ? (
                                    <img src={URL.createObjectURL(images[1])} alt="Foto Posterior" className="card-img-top" style={{ height: '180px', width: '-webkit-fill-available', maxWidth: '145%', objectFit: 'fill' }} />
                                ) : (
                                    <label htmlFor="imageBack" className="card-body text-center">
                                        <img src={imglist} style={{ width: "117.86px", position: "relative", right: "35px" }}></img>
                                        <div class="h6 mb-4 text-secondary border-bottom border-secondary" style={{ position: "relative", left: "150px", width: "95px" }}>
                                            Examinar
                                        </div>
                                    </label>
                                )}
                                <input
                                    type="file"
                                    className="form-control-file d-none"
                                    id="imageBack"
                                    accept="image/*"
                                    required
                                    onChange={(e) => handleImageChange(e, 1)}
                                    name="imageBack"
                                />
                            </div>
                            <div className="form-group mt-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="observacionPosterior"
                                    placeholder="Observación: *"
                                    required
                                    name="observationsBack"
                                    value={formData.observationsBack}
                                    onChange={handleObservationChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Indicador de Combustible */}
                    <div className="listcehk" style={{ display: "flex", alignItems: "center", width: "104%" }}>
                        <label className="" style={{ marginRight: "86px" }} htmlFor="indicadorCombustible">Indicador de Combustible</label>
                        <div className="">
                            <div className="card" style={{ width: '367px', height: '180px', left: "2%" }}>
                                {images[4] ? (
                                    <img src={URL.createObjectURL(images[4])} alt="Indicador de Combustible" className="card-img-top" style={{ height: '180px', width: 'auto', maxWidth: '100%', objectFit: 'fill' }} />
                                ) : (
                                    <label htmlFor="indicadorCombustible" className="card-body text-center">
                                        <img src={imglist} style={{ width: "117px", position: "relative", right: "35px" }} alt="Examinar" />
                                        <div className="h6 mb-4 text-secondary border-bottom border-secondary" style={{ position: "relative", left: "150px", width: "95px" }}>
                                            Examinar
                                        </div>
                                    </label>
                                )}
                                <input
                                    type="file"
                                    className="form-control-file d-none"
                                    id="indicadorCombustible"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, 4)}
                                    name="imageIndicador"
                                />
                            </div>
                        </div>
                    </div>

                    {/* formuario  */}
                    <div className="listcehk" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", alignContent: "space-between", width: "80%" }}>
                        <div className=' d-flex align-items-center flex-column'>
                            <div className="form-group mt-2 d-flex flex-column">
                                <div className=" d-flex flex-row" style={{ gap: "25px" }}>
                                    <img src={LogoGasolina} style={{ color: "#ff5733", fontSize: "50px" }} />
                                    <div className="form-check d-flex flex-column align-items-center p-0">
                                        <input
                                            className="form-check-input m-0 tamano-chek"
                                            type="radio"
                                            id="fuelE"
                                            name="fuel"
                                            required
                                            checked={combustible === 'fuelE'}
                                            onChange={handleFuelChange}
                                        />
                                        <label className="form-check-label tamano-chek" htmlFor="fuelE">  E </label>
                                    </div>
                                    <div className="form-check d-flex flex-column align-items-center p-0">
                                        <input
                                            className="form-check-input m-0 tamano-chek"
                                            type="radio"
                                            id="fuelHalf"
                                            name="fuel"
                                            required
                                            checked={combustible === 'fuelHalf'}
                                            onChange={handleFuelChange}
                                        />
                                        <label className="form-check-label tamano-chek" htmlFor="fuelHalf"> 1/2 </label>
                                    </div>
                                    <div className="form-check d-flex flex-column align-items-center p-0">
                                        <input
                                            className="form-check-input m-0 tamano-chek"
                                            type="radio"
                                            id="fuelF"
                                            name="fuel"
                                            required
                                            checked={combustible === 'fuelF'}
                                            onChange={handleFuelChange}
                                        />
                                        <label className="form-check-label tamano-chek" htmlFor="fuelF"> F </label>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='col-md-12'>
                            <div className='d-flex align-items-center flex-row'>
                                <label className="" style={{ marginRight: "125px" }} htmlFor="indicadorCombustible">Observacion</label>
                                <div className="form-group mt-2 ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="observacionCombustible"
                                        placeholder="Observación: *"
                                        required
                                        name="observationsIndicador"
                                        value={formData.observationsIndicador}
                                        onChange={handleObservationChange}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {/* Botón de Enviar */}
                <div className="text-center mt-4">
                    <button type="submit" className="btn btn-success">Enviar <i className="fa-solid fa-check"></i></button>
                </div>
            </form>
        </div>
    );
};

export default CheckListComponent;
