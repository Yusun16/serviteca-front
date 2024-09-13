import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Label from '../autopartes/Label'
import Input from '../autopartes/Input'
import { useNavigate, useParams } from 'react-router-dom';
import ModalExito from '../autopartes/ModalExito'

function ModalEditOpe() {

    const urlBase = "http://localhost:8080/serviteca/operarios";

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const [operarios, setOperarios] = useState({
        cedula: '',
        nombre: '',
        apellido: '',
        correo: '',
        direccion: '',
        telefono: '',
    });
    const { id } = useParams();
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const cargarOperarios = async () => {
        const resultado = await axios.get(`${urlBase}/${id}`);
        setOperarios(resultado.data);
    };

    useEffect(() => {
        cargarOperarios();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOperarios({
            ...operarios,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(urlBase, operarios)
        // navegacion("/auto-partes")

        const requiredFields = [
            'cedula',
            'nombre',
            'apellido',
            'correo',
            'direccion',
            'telefono',
            'acudiente',
            'telefonoAcudiente',
        ];

        const allFieldsFilled = requiredFields.every(field => operarios[field].trim() !== '');

        if (allFieldsFilled) {
            setError('');
            setIsModalOpen(true);
        } else {
            setError('Por favor, completa todos los campos obligatorios.');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
                    <li className="breadcrumb-item active breadcrumb003" aria-current="page">Editar</li>
                </ol>
            </nav>
            <div id="demo-modal11" className="modal__message004">
                <div className="modal__content modal__shadow">
                    <div className='modal__title'>
                        <h1>Editar Operario</h1>
                        <div className="linea002"></div>
                    </div>
                    <div>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="container005">
                                <div className='column001'>
                                    <div className='div-col001'>
                                        <Label
                                            className='label005'
                                            htmlFor="cedula"
                                            name="Cedula:"
                                        />
                                        <Input
                                            className='input006'
                                            type="text"
                                            id="cedula"
                                            name="cedula"
                                            placeholder="N° Cedula"
                                            value={operarios.cedula}
                                            onChange={(e) => handleInputChange(e)}
                                            required
                                        />
                                    </div>
                                    <div className='div-col001'>
                                        <Label className='label005' htmlFor="nombre" name="Nombre: *"></Label>
                                        <Input
                                            className='input006'
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            value={operarios.nombre}
                                            onChange={(e) => handleInputChange(e)}
                                            required
                                        />
                                    </div>
                                    <div className='div-col001'>
                                        <Label className='label005' htmlFor="apellido" name="Apellido: *"></Label>
                                        <Input
                                            className='input006'
                                            type="text"
                                            id="apellido"
                                            name="apellido"
                                            value={operarios.apellido}
                                            onChange={(e) => handleInputChange(e)}
                                            required
                                        />
                                    </div>
                                    <div className='div-col001'>
                                        <Label className='label005' htmlFor="correo" name="Correo: *"></Label>
                                        <Input
                                            className='input006'
                                            type="text"
                                            id="correo"
                                            name="correo"
                                            value={operarios.correo}
                                            onChange={(e) => handleInputChange(e)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='column001'>
                                    <div className='div-col001'>
                                        <Label className='label005' htmlFor="direccion" name="Direccion: *"></Label>
                                        <Input
                                            className='input006'
                                            type="text"
                                            id="direccion"
                                            name="direccion"
                                            value={operarios.direccion}
                                            onChange={(e) => handleInputChange(e)}
                                            required
                                        />
                                    </div>
                                    <div className='div-col001'>
                                        <Label htmlFor="telefono" name="Telefono: *"></Label>
                                        <Input
                                            className='input006'
                                            type="text"
                                            id="telefono"
                                            name="telefono"
                                            value={operarios.telefono}
                                            onChange={(e) => handleInputChange(e)}
                                            required
                                        />
                                    </div>
                                    <div className='div-col001'>
                                        <Label htmlFor="acudiente" name="Acudiente: *" ></Label>
                                        <Input
                                            className='input006'
                                            type="text"
                                            id="acudiente"
                                            name="acudiente"
                                            value={operarios.acudiente}
                                            onChange={(e) => handleInputChange(e)}
                                            required
                                        />
                                    </div>
                                    <div className='div-col001'>
                                        <Label htmlFor="telefonoAcudiente" name="Telefono acu.: *" ></Label>
                                        <Input
                                            className='input006'
                                            type="text"
                                            id="telefonoAcudiente"
                                            name="telefonoAcudiente"
                                            value={operarios.telefonoAcudiente}
                                            onChange={(e) => handleInputChange(e)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='containerbtn'>
                                {/* <a href="#demo-modal4" className='btn009' type="submit">
                                    <ul className="icons005">
                                        <li className="icons004"><i className="fa-solid fa-floppy-disk"></i></li>
                                        <li className="">Guardar</li>
                                    </ul>
                                </a> */}
                                {/* 10/09/2024 */}
                                {/* <a href="#demo-modal12" className='btn009' type="submit">
                                    <ul className="icons005">
                                        <li className="icons004"><i className="fa-solid fa-floppy-disk"></i></li>
                                        <li className="">Guardar</li>
                                    </ul>
                                </a> 
                                <button className='btn007' type="reset">
                                    <ul className="icons005">
                                        <li className="icons004"><i className="fa-regular fa-circle-xmark"></i></li>
                                        <li className="">Cancelar</li>
                                    </ul>
                                </button>*/}
                                <div className='pos-btn009 div-btn009'>
                                    <button className='btn009' type="submit">
                                        <div className="sub-btn009">
                                            <i className="fa-solid fa-floppy-disk"></i>
                                            <span className="">Guardar</span>
                                        </div>
                                    </button>
                                </div>
                                <div className='pos-btn007 div-btn007'>
                                    <button type="button" onClick={goBack} className='btn007'>
                                        <div className="sub-btn007">
                                            <i className="fa-regular fa-circle-xmark"></i>
                                            <span className="">Cancelar</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div>
                    <ModalExito
                        idmodal="demo-modal25"
                        titlemodal="Editado"
                        lineado="linea002"
                        parexito="Registro editado con exito"
                        className="modal__message003"
                        rutaDir="/operarios"
                        onClose={handleCloseModal}
                        btnclassName="btn0010"
                        buttonContent="OK"
                    />
                </div>
            )}
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}

export default ModalEditOpe