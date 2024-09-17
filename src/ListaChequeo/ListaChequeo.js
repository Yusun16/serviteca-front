import React, { useState } from 'react';
import imglist from "../img/imglist.png";
import "../ListaChequeo/ListaChequeo.css";
import LogoGasolina from "../img/LogoGasolina.svg";
import axios from 'axios';

const CheckListComponent = () => {
    const [images, setImages] = useState({
        fotoDerecha: null,
        fotoIzquierda: null,
        fotoFrontal: null,
        fotoPosterior: null,
        indicadorCombustible: null,
    });

    const [formData, setFormData] = useState({
        observacionDerecha: '',
        observacionIzquierda: '',
        observacionFrontal: '',
        observacionPosterior: '',
        observacionCombustible: '',
    });

    const [combustible, setCombustible] = useState('');

    const handleImageChange = (event, fieldName) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImages(prevImages => ({
                ...prevImages,
                [fieldName]: imageUrl
            }));
            // No olvides liberar el objeto URL cuando ya no lo necesites
            return () => URL.revokeObjectURL(imageUrl);
        }
    };

    const handleObservationChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFuelChange = (event) => {
        setCombustible(event.target.id);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Crear un objeto FormData para enviar archivos y datos de formulario
        try {
            // Realizar la solicitud POST al backend
            const response = await axios.post('http://localhost:8080/serviteca/revisiones', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const listacheckId = response.data.id;
            if (images) {
                const imagesFormData = new FormData();
                imagesFormData.append("id", listacheckId);
                imagesFormData.append("files", images);
                await axios.put('http://localhost:8080/serviteca/revisiones/uploadFotos', imagesFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            formData.append('combustible', combustible);
            console.log(response.data); // Maneja la respuesta del servidor
            // Aquí podrías manejar la respuesta del servidor, mostrar un mensaje de éxito, etc.
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            // Aquí podrías manejar el error, mostrar un mensaje de error, etc.
        }
    };

    return (
        <div className="container">
            <div className='d-flex justify-content-between'>
                <div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="/agregarorden"><i className="fa-solid fa-house"></i> Inicio</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">Orden de Servicio</li>
                            <li className="breadcrumb-item active" aria-current="page">Lista de Chequeo</li>
                        </ol>
                    </nav>
                </div>
                <div className='d-flex flex-row-reverse  gap-0 column-gap-3'>
                    <button type="button" className="btn text-primary" data-bs-toggle="modal" data-bs-target="#inventario">
                        <i className="fa-solid fa-list"></i> Inventario
                    </button>
                    <button type="button" className="btn text-primary" data-bs-toggle="modal" data-bs-target="#historia">
                        <i className="fa-solid fa-clock-rotate-left"></i> Historial
                    </button>
                </div>

                {/* modal inventario */}
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
                                            <tr className='tr001'>
                                                <th className='colorthead' scope="col">Descripción</th>
                                                <th className='colorthead' scope="col">Chequeo</th>
                                                <th className='colorthead' scope="col">Observación</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='tr001'>
                                                <td>parlantes</td>
                                                <td>
                                                    <div className="form-check">
                                                        <input className="form-check-input" style={{ marginLeft: "1px" }} type="checkbox" value="" id="flexCheckDefault" />
                                                    </div>
                                                </td>
                                                <td>6 parlantes</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* modal historia */}
                <div className="modal fade" id="historia" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Seleccione el N° de servicio para abrir la ejecución</h1>
                                <button type="button" className="btnn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <table className="container">
                                    <thead>
                                        <tr className='tr001'>
                                            <th className='colorthead' scope="col">Fecha de Servicio</th>
                                            <th className='colorthead' scope="col">N° Kilometros</th>
                                            <th className='colorthead' scope="col">N° de Servicio</th>
                                            <th className='colorthead' scope="col">Nombre operario</th>
                                            <th className='colorthead' scope="col">N° Factura</th>
                                            <th className='colorthead' scope="col">Observación</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='tr001'>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>16</td>
                                            <td>No se observa nada</td>
                                        </tr>
                                        <tr className='tr001'>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr className='tr001'>
                                            <th scope="row">3</th>
                                            <td colSpan="2">Larry the Bird</td>
                                            <td>@twitter</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className='mb-3 text-center' style={{ width: "296px", height: "34px" }}>Lista de Chequeo</h3>

            <form onSubmit={handleSubmit}>
                <div className="row mt-4">
                    {/* Foto Lateral Derecho */}
                    <div className="col-md-6 d-flex align-items-center listcehk">
                        <label className="w-50" htmlFor="fotoDerecha">Foto Lateral Derecho: *</label>
                        <div className="w-50">
                            <div className="card" style={{ width: '100%', height: '180px' }}>
                                {images.fotoDerecha ? (
                                    <img src={images.fotoDerecha} alt="Foto Lateral Derecho" className="card-img-top" style={{ height: '100%', width: 'auto', maxWidth: '100%', objectFit: 'fill' }} />
                                ) : (
                                    <label htmlFor="fotoDerecha" className="card-body text-center">
                                        <img src={imglist} style={{ width: "117.86px", position: "relative", right: "35px" }} alt="Examinar" />
                                        <div className="h6 mb-4 text-secondary border-bottom border-secondary" style={{ position: "relative", left: "150px", width: "95px" }}>
                                            Examinar
                                        </div>
                                    </label>
                                )}
                                <input
                                    type="file"
                                    className="form-control-file d-none"
                                    id="fotoDerecha"
                                    accept="image/*"
                                    required
                                    onChange={(event) => handleImageChange(event, 'fotoDerecha')}
                                />
                            </div>
                            <div className="form-group mt-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="observacionDerecha"
                                    placeholder="Observación: *"
                                    required
                                    value={formData.observacionDerecha}
                                    onChange={handleObservationChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Foto Frontal */}
                    <div className="col-md-6 d-flex align-items-center listcehk">
                        <label className="w-50" htmlFor="fotoFrontal">Foto Frontal</label>
                        <div className="w-50">
                            <div className="card" style={{ width: '100%', height: '180px' }}>
                                {images.fotoFrontal ? (
                                    <img src={images.fotoFrontal} alt="Foto Frontal" className="card-img-top" style={{ height: '180px', width: 'auto', maxWidth: '100%', objectFit: 'fill' }} />
                                ) : (
                                    <label htmlFor="fotoFrontal" className="card-body text-center">
                                        <img src={imglist} style={{ width: "117.86px", position: "relative", right: "35px" }} alt="Examinar" />
                                        <div className="h6 mb-4 text-secondary border-bottom border-secondary" style={{ position: "relative", left: "150px", width: "95px" }}>
                                            Examinar
                                        </div>
                                    </label>
                                )}
                                <input
                                    type="file"
                                    className="form-control-file d-none"
                                    id="fotoFrontal"
                                    accept="image/*"
                                    required
                                    onChange={(event) => handleImageChange(event, 'fotoFrontal')}
                                />
                            </div>
                            <div className="form-group mt-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="observacionFrontal"
                                    placeholder="Observación: *"
                                    required
                                    value={formData.observacionFrontal}
                                    onChange={handleObservationChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Foto Lateral Izquierda */}
                    <div className="col-md-6 d-flex align-items-center listcehk">
                        <label className="w-50" htmlFor="fotoIzquierda">Foto Lateral Izquierda</label>
                        <div className="w-50">
                            <div className="card" style={{ width: '100%', height: '180px' }}>
                                {images.fotoIzquierda ? (
                                    <img src={images.fotoIzquierda} alt="Foto Lateral Izquierda" className="card-img-top" style={{ height: '180px', width: 'auto', maxWidth: '100%', objectFit: 'fill' }} />
                                ) : (
                                    <label htmlFor="fotoIzquierda" className="card-body text-center">
                                        <img src={imglist} style={{ width: "117.86px", position: "relative", right: "35px" }} alt="Examinar" />
                                        <div className="h6 mb-4 text-secondary border-bottom border-secondary" style={{ position: "relative", left: "150px", width: "95px" }}>
                                            Examinar
                                        </div>
                                    </label>
                                )}
                                <input
                                    type="file"
                                    className="form-control-file d-none"
                                    id="fotoIzquierda"
                                    accept="image/*"
                                    required
                                    onChange={(event) => handleImageChange(event, 'fotoIzquierda')}
                                />
                            </div>
                            <div className="form-group mt-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="observacionIzquierda"
                                    placeholder="Observación: *"
                                    required
                                    value={formData.observacionIzquierda}
                                    onChange={handleObservationChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Foto Posterior */}
                    <div className="col-md-6 d-flex align-items-center listcehk">
                        <label className="w-50" htmlFor="fotoPosterior">Foto Posterior</label>
                        <div className="w-50">
                            <div className="card" style={{ width: '100%', height: '180px' }}>
                                {images.fotoPosterior ? (
                                    <img src={images.fotoPosterior} alt="Foto Posterior" className="card-img-top" style={{ height: '180px', width: 'auto', maxWidth: '100%', objectFit: 'fill' }} />
                                ) : (
                                    <label htmlFor="fotoPosterior" className="card-body text-center">
                                        <img src={imglist} style={{ width: "117.86px", position: "relative", right: "35px" }} alt="Examinar" />
                                        <div className="h6 mb-4 text-secondary border-bottom border-secondary" style={{ position: "relative", left: "150px", width: "95px" }}>
                                            Examinar
                                        </div>
                                    </label>
                                )}
                                <input
                                    type="file"
                                    className="form-control-file d-none"
                                    id="fotoPosterior"
                                    accept="image/*"
                                    required
                                    onChange={(event) => handleImageChange(event, 'fotoPosterior')}
                                />
                            </div>
                            <div className="form-group mt-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="observacionPosterior"
                                    placeholder="Observación: *"
                                    required
                                    value={formData.observacionPosterior}
                                    onChange={handleObservationChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Indicador de Combustible */}
                    <div className="col-md-6 d-flex align-items-center listcehk">
                        <label className="w-50" htmlFor="indicadorCombustible">Indicador de Combustible</label>
                        <div className="w-50">
                            <div className="card" style={{ width: '100%', height: '180px' }}>
                                {images.indicadorCombustible ? (
                                    <img src={images.indicadorCombustible} alt="Indicador de Combustible" className="card-img-top" style={{ height: '180px', width: 'auto', maxWidth: '100%', objectFit: 'fill' }} />
                                ) : (
                                    <label htmlFor="indicadorCombustible" className="card-body text-center">
                                        <img src={imglist} style={{ width: "117.86px", position: "relative", right: "35px" }} alt="Examinar" />
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
                                    onChange={(event) => handleImageChange(event, 'indicadorCombustible')}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Combustible */}
                    <div className='col-md-6 listcehk'>
                        <div>
                            <div className='d-flex align-items-center flex-column' style={{ display: "flex", alignContent: "flex-start", flexWrap: "wrap" }}>
                                <div className="form-group mt-2 d-flex flex-column">
                                    <div className="d-flex flex-row" style={{ gap: "25px" }}>
                                        <img src={LogoGasolina} style={{ color: "#ff5733", fontSize: "50px" }} alt="Logo Gasolina" />
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
                        </div>
                        <div className='col-md-12'>
                            <div className='d-flex align-items-center flex-row'>
                                <label className="w-50" htmlFor="observacionCombustible">Observación</label>
                                <div className="form-group mt-2 w-50">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="observacionCombustible"
                                        placeholder="Observación: *"
                                        required
                                        value={formData.observacionCombustible}
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