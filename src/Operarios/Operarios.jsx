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
    const [errorMessage, setErrorMessage] = useState("");
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

        setErrorMessage('');
    };

    const validateForm = () => {
        const {
            cedula,
            nombre,
            apellido,
            correo,
            telefono,
            direccion,
            acudiente,
            telefonoAcudiente,
            especialidad,
        } = formData;

        const cedulaRegex = /^\d{7,12}$/;
        const nameRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^\d{10}$/;

        if (!cedula || !cedulaRegex.test(cedula)) {
            setErrorMessage("La cédula debe ser un número entre 7 y 12 dígitos.");
            return false;
        }

        if (!nombre || !nameRegex.test(nombre)) {
            setErrorMessage("El nombre solo puede contener letras.");
            return false;
        }

        if (!apellido || !nameRegex.test(apellido)) {
            setErrorMessage("El apellido solo puede contener letras.");
            return false;
        }

        if (!correo || !emailRegex.test(correo)) {
            setErrorMessage("Por favor, ingresa un correo electrónico válido.");
            return false;
        }

        if (!telefono || !phoneRegex.test(telefono)) {
            setErrorMessage("El teléfono debe ser un número válido de al menos 7 dígitos.");
            return false;
        }

        if (!direccion.trim()) {
            setErrorMessage("La dirección no puede estar vacía.");
            return false;
        }

        if (!acudiente || !nameRegex.test(acudiente)) {
            setErrorMessage("El nombre del acudiente solo puede contener letras.");
            return false;
        }

        if (!telefonoAcudiente || !phoneRegex.test(telefonoAcudiente)) {
            setErrorMessage("El teléfono del acudiente debe ser un número válido.");
            return false;
        }

        if (!especialidad) {
            setErrorMessage("Por favor, selecciona una especialidad.");
            return false;
        }

        if (!image) {
            setErrorMessage("Por favor, selecciona una imagen.");
            return false;
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(image.type)) {
            setErrorMessage("La imagen debe ser un archivo JPG, PNG o JPEG.");
            return false;
        }

        const maxSize = 5 * 1024 * 1024; // 5 MB
        if (image.size > maxSize) {
            setErrorMessage("La imagen no puede superar los 5 MB.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // if (!image) {
        //     alert("Por favor, selecciona una imagen.");
        //     return;
        // }

        const token = localStorage.getItem('token');

        // Guardando datos del Formulario
        try {
            const response = await axios.post('http://localhost:8080/serviteca/operarios', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
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
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            setIsModalOpen(true);
            navigate("/agregar-operarios")
            // alert('Operario y foto subidos correctamente');
        } catch (error) {
            console.error('Error al enviar los datos', error);
            setErrorMessage("Hubo un problema al enviar los datos. Intenta nuevamente.");
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
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
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