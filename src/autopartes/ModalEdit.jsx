import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Input from './Input'
import Label from './Label'
import ModalExito from './ModalExito'
import { useNavigate } from 'react-router-dom';

function ModalEdit() {
    // const urlBase = "http://localhost:8080/serviteca/autopartes";

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [inputs, setInputs] = useState({
        input1: '',
        input2: '',
        input3: '',
        dropdown1: '',
        dropdown2: '',
        input4: '',
        input5: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };


    const handleDropdownChange1 = (e) => {
        setInputs({
            ...inputs,
            dropdown1: e.target.value,
        });
    };

    const handleDropdownChange2 = (e) => {
        setInputs({
            ...inputs,
            dropdown2: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const requiredFields = [
            'input1',
            'input2',
            'input3',
            'dropdown1',
            'dropdown2',
            'input4',
            'input5'
        ];

        const allFieldsFilled = requiredFields.every(field => inputs[field].trim() !== '');

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
            <div id="demo-modal16" className='modal__message004'>
                <div className="modal__content modal__shadow">
                    <div className='modal__title'>
                        <h1>Editar Auto-Partes</h1>
                        <div className="linea002"></div>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="container005" >
                                <div className='column001'>
                                    <div className='div-col002'>
                                        <Label
                                            className='label006'
                                            htmlFor="referencia"
                                            name="referencia:"
                                        />
                                        <Input
                                            className='input004'
                                            type="text"
                                            id="referencia"
                                            name="input1"
                                            placeholder="Referencia" required={true}
                                            value={inputs.input1}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='div-col002'>
                                        <Label className='label006' htmlFor="codigoStISO" name="codigoStISO:"></Label>
                                        <Input
                                            className='input004'
                                            type="text"
                                            id="codigoStISO"
                                            name="input2"
                                            required
                                            value={inputs.input2}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='div-col002'>
                                        <Label className='label006' htmlFor="descripcion" name="Descripción:"></Label>
                                        <textarea
                                            className='inputarea001'
                                            rows={3}
                                            cols={3}
                                            type="text"
                                            id="descripcion"
                                            name="input3"
                                            required
                                            value={inputs.input3}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='div-col002'>
                                        <Label className='label006' htmlFor="linea" name="Linea:"></Label>
                                        <div className="dropdown">
                                            <select className="dropdown-toggle"
                                                name="dropdown1"
                                                value={inputs.dropdown1}
                                                onChange={handleDropdownChange1}
                                                required={true}
                                            >
                                                <option value="" disabled>Selecciona una opción</option>
                                                <option >No grabado</option>
                                                <option >Grabado</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='column001'>
                                    <div className='div-col002'>
                                        <Label className='label006' htmlFor="tipo" name="Tipo:"></Label>
                                        <div className="dropdown">
                                            <select className="dropdown-toggle"
                                                name="dropdown2"
                                                required={true}
                                                onChange={handleDropdownChange2}
                                                value={inputs.dropdown2}                                            >
                                                <option value="" disabled>Selecciona una opción</option>
                                                <option>Filtro</option>
                                                <option>Aceite</option>
                                                <option>Repuesto</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='div-col002'>
                                        <Label className='label006' htmlFor="marca" name="Marca:"></Label>
                                        <Input
                                            className='input004'
                                            type="text"
                                            id="marca"
                                            name="input4"
                                            required
                                            value={inputs.input4}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='div-col002'>
                                        <Label className='label006' htmlFor="modelo" name="Modelo:" ></Label>
                                        <Input
                                            className='input004'
                                            type="text"
                                            id="modelo"
                                            name="input5"
                                            required
                                            value={inputs.input5}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='containerbtn'>
                                <div className='pos-btn009 div-btn009'>
                                    <button className='btn009' type="submit">
                                        <div className="sub-btn009">
                                            <i className="fa-solid fa-floppy-disk"></i>
                                            <span className="">Guardar</span>
                                        </div>
                                    </button>
                                </div>
                                <button onClick={goBack} className='btn007'>
                                    <ul className="icons005">
                                        <li className="icons004"><i className="fa-regular fa-circle-xmark"></i></li>
                                        <li className="">Cancelar</li>
                                    </ul>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div>
                    <ModalExito
                        idmodal="demo-modal15"
                        titlemodal="Editado"
                        parexito="Registro editado con exito"
                        className="modal__message003"
                        rutaDir="/"
                        onClose={handleCloseModal}
                    />
                </div>
            )}
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}

export default ModalEdit