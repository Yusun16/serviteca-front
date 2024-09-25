import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TableOperarios from './TableOperarios'
import ModalExito from '../autopartes/ModalExito';
import Foto001 from '../img/fotoup.jpeg';

function Operarios() {
    const [isOn, setIsOn] = useState(false);
    const [image, setImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        cedula: '',
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        direccion: '',
        acudiente: '',
        telefonoAcudiente: '',
        especialidad: '',
    });

    const toggleSwitch = () => {
        setIsOn(prevState => !prevState);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Guardando datos del Formulario
        try {
            const response = await axios.post('http://localhost:8080/serviteca/operarios', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            // Response para conectar el id
            const operarioId = response.data.id;
            // Formulario guardado. Guardar imagen.
            // Condicional para subir la imagen
            if (image) {
                const imageFormData = new FormData();
                imageFormData.append('id', operarioId);
                imageFormData.append('file', image);

                await axios.put('http://localhost:8080/serviteca/operarios/photo', imageFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            setIsModalOpen(true);
            navigate("/agregar-operarios")
            // alert('Operario y foto subidos correctamente');
        } catch (error) {
            console.error('Error al enviar los datos', error);
            alert('Hubo un problema al enviar los datos');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        window.location.reload(true);
        navigate('/agregar-operarios');
        setFormData({
            cedula: '',
            nombre: '',
            apellido: '',
            correo: '',
            telefono: '',
            direccion: '',
            acudiente: '',
            telefonoAcudiente: '',
            especialidad: '',
        });
        setImage(null);
    };

    return (
        <div>
            <nav aria-label="breadcrumb" className='breadcrumb002'>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item breadcrumb001">
                        <i className="fa-solid fa-house"></i>
                        Inicio
                    </li>
                    <li className="breadcrumb-item active breadcrumb004" aria-current="page">Operarios</li>
                    <li className="breadcrumb-item active breadcrumb003" aria-current="page">Agregar</li>
                </ol>
            </nav>
            <div>
                <div className='column005'>
                    <h6 className='text009 pos-text'>Agregar operarios</h6>
                    <ul className="icons001 icons009"></ul>
                </div>
                <form className="container005 container005-width" onSubmit={handleSubmit}>
                    <div className='column001'>
                        <div className='div-col002'>
                            <label className='label006' htmlFor="cedula">Cedula: *</label>
                            <input
                                className='input005 input011'
                                type="text"
                                id="cedula"
                                name="cedula"
                                value={formData.cedula}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='div-col002'>
                            <label className='label006' htmlFor="nombre">Nombre: *</label>
                            <input
                                className='input005 input011'
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='div-col002'>
                            <label className='label006' htmlFor="apellido">Apellido: *</label>
                            <input
                                className='input005 input011'
                                rows={3}
                                type="text"
                                id="apellido"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='div-col002'>
                            <label className='label006' htmlFor="correo">Correo: *</label>
                            <input
                                className='input005 input011'
                                rows={3}
                                type="text"
                                id="correo"
                                name="correo"
                                value={formData.correo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='div-col002'>
                            <label className='label006' htmlFor="telefono">Telefono: *</label>
                            <input
                                className='input005 input011'
                                rows={3}
                                type="text"
                                id="telefono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='div-col002'>
                            <label className='label006' htmlFor="direccion">Direccion: *</label>
                            <input
                                className='input005 input011'
                                rows={3}
                                type="text"
                                id="direccion"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='column001'>
                        <div className='div-col002 div-col-switch'>
                            <label className='label-switch' htmlFor="todos-indi">Estado (Inactivo/Activo): *</label>
                            <div
                                id="todos-indi"
                                className={`switch-state ${isOn ? 'on' : 'off'}`}
                                onClick={toggleSwitch}
                                role="switch"
                            // aria-checked={isOn}
                            // tabIndex="0"
                            >
                                <div className="slider"></div>
                            </div>

                        </div>
                        <div className='div-col002 '>
                            <label className='label006' htmlFor="fotoUrl">Foto: *</label>
                            <div className='foto001'>
                                <div className='foto-container'>
                                    {image && <img src={URL.createObjectURL(image)} className='img-foto' alt="Foto-subida" />}
                                    <input
                                        type="file"
                                        className='input-foto'
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        id="fotoUrl"
                                        name='fotoUrl'
                                        required
                                    />
                                    <label htmlFor="fotoImg" className="foto-label">
                                        Examinar
                                        <img src={Foto001} alt='examinar-foto' className="foto-image" />
                                    </label>
                                    <div className="linea003"></div>
                                </div>
                            </div>
                        </div>
                        <div className='div-col002'>
                            <label className='label006' htmlFor="acudiente">Acudiente: *</label>
                            <input
                                className='input005 input011'
                                type="text"
                                id="acudiente"
                                name="acudiente"
                                value={formData.acudiente}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='div-col002'>
                            <label className='label006' htmlFor="telefonoAcudiente">Telefono acu.: *</label>
                            <input
                                className='input005 input011'
                                type="text"
                                id="telefonoAcudiente"
                                name="telefonoAcudiente"
                                value={formData.telefonoAcudiente}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='div-col002'>
                            <label className='label006' htmlFor="linea">Especialidad: *</label>
                            <div className="dropdown">
                                <select
                                    className="dropdown-toggle003"
                                    name="especialidad"
                                    value={formData.especialidad}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Selecciona una opción</option>
                                    <option value="Tecnico" >Tecnico</option>
                                    <option value="Tecnologo" >Tecnologo</option>
                                    <option value="Estudiante" >Estudiante</option>
                                    <option value="Pasante" >Pasante</option>
                                </select>
                            </div>
                        </div>
                        <div className='pos-btn009'>
                            <button className='btn009' type='submit'>
                                <div className="sub-btn009">
                                    <i className="fa-solid fa-floppy-disk"></i>
                                    <span className="">Guardar</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </form>
                <div>
                    <TableOperarios />
                </div>
                {isModalOpen && (
                    <ModalExito
                        idmodal="demo-modal10"
                        titlemodal="Guardado"
                        lineado="linea002"
                        parexito="Registro guardado con exito"
                        className="modal__message003 modal003-z-index"
                        onClose={handleCloseModal}
                        rutaDir="/agregar-operarios"
                        btnclassName="btn0010"
                        buttonContent="OK"
                    />
                )}
            </div>
        </div>
    )
}

export default Operarios