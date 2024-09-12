import React, { useState } from 'react'
import TableOperarios from './TableOperarios'
import ModalExito from '../autopartes/ModalExito';
import Foto001 from '../img/fotoup.jpeg';

function Operarios() {
    const [isOn, setIsOn] = useState(false);

    const [image, setImage] = useState(null);

    const toggleSwitch = () => {
        setIsOn(prevState => !prevState);
    };

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
                <form className="container005 container005-width">
                    <div className='column001'>
                        <div className='div-col002'>
                            <label className='label006' htmlFor="cedula">Cedula: *</label>
                            <input
                                className='input005 input011'
                                type="text"
                                id="cedula"
                                name="input1"
                            />
                        </div>
                        <div className='div-col002'>
                            <label className='label006' htmlFor="nombre">Nombre: *</label>
                            <input
                                className='input005 input011'
                                type="text"
                                id="nombre"
                                name="input2"
                            />
                        </div>
                        <div className='div-col002'>
                            <label className='label006' htmlFor="apellido">Apellido: *</label>
                            <input
                                className='input005 input011'
                                rows={3}
                                type="text"
                                id="apellido"
                                name="input3"
                            />
                        </div>
                        <div className='div-col002'>
                            <label className='label006' htmlFor="correo">Correo: *</label>
                            <input
                                className='input005 input011'
                                rows={3}
                                type="text"
                                id="correo"
                                name="input4"
                            />
                        </div>
                        <div className='div-col002'>
                            <label className='label006' htmlFor="telefono">Telefono: *</label>
                            <input
                                className='input005 input011'
                                rows={3}
                                type="text"
                                id="telefono"
                                name="input5"
                            />
                        </div>
                        <div className='div-col002'>
                            <label className='label006' htmlFor="direccion">Direccion: *</label>
                            <input
                                className='input005 input011'
                                rows={3}
                                type="text"
                                id="direccion"
                                name="input6"
                            />
                        </div>
                    </div>
                    <div className='column001'>
                        <div className='div-col002 div-col-switch'>

                            {/* <div className="filter "> */}
                            <label className='label-switch' htmlFor="todos-indi">Estado (Inactivo/Activo): *</label>
                            <div id="todos-indi" className={`switch-state ${isOn ? 'on' : 'off'}`} onClick={toggleSwitch}>
                                <div className="slider"></div>
                            </div>
                            {/* </div> */}

                        </div>
                        <div className='div-col002 '>
                            <label className='label006' htmlFor="foto">Foto: *</label>
                            <div className='foto001'>
                                <div className='foto-container'>
                                    {image && <img src={image} className='img-foto' alt="Foto-subida" />}
                                    <input
                                        type="file"
                                        className='input-foto'
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        id="foto"
                                    />
                                    <label htmlFor="foto" className="foto-label">
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
                                name="input9"
                            />
                        </div>
                        <div className='div-col002'>
                            <label className='label006' htmlFor="telefono-acu">Telefono acu.: *</label>
                            <input
                                className='input005 input011'
                                type="text"
                                id="telefono-acu"
                                name="input10"
                            />
                        </div>
                        <div className='div-col002'>
                            <label className='label006' htmlFor="linea">Especialidad: *</label>
                            <div className="dropdown">
                                <select className="dropdown-toggle003"
                                    name="dropdown1"
                                // value={inputs.dropdown1}
                                // onChange={handleDropdownChange}
                                // disabled={!isInputEnabled.dropdown1}
                                >
                                    <option value="" disabled>Selecciona una opción</option>
                                    <option >Tecnico</option>
                                    <option >Tecnologo</option>
                                    <option >Estudiante</option>
                                    <option >Pasante</option>
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
                {/* <div id="demo-modal10" className="modal003">
                    <div className="modal__content modal__shadow">
                        <h1>Guardado</h1>
                        <form action="" method='' className="form009">
                            <p>Registro guardado con exito</p>
                            <div className="">
                                <button className='btn0010' type="submit">
                                    OK
                                </button>
                            </div>
                        </form>
                        <a href="#" className="modal__close">&times;</a>
                    </div>
                </div> */}
                <ModalExito
                    idmodal="demo-modal10"
                    titlemodal="Guardado"
                    parexito="Registro guardado con exito"
                    // className="modal__message003"
                    className="modal003"
                // onClose={handleCloseModal}
                />
            </div>
        </div>
    )
}

export default Operarios