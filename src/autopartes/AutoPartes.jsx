import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableAutoPartes from './TableAutoPartes';
import ModalExito from './ModalExito';
import { useNavigate } from 'react-router-dom';

function AutoPartes() {
    let navegacion = useNavigate();
    const [autopartes, setAutopartes] = useState([]);

    const [inputs, setInputs] = useState({
        referencia: '',
        siigo: '',
        descripcion: '',
        linea: '',
        tipo: '',
        marca: '',
        modelo: '',
    });

    const [isInputEnabled, setIsInputEnabled] = useState({
        referencia: true,
        siigo: false,
        descripcion: false,
        linea: false,
        tipo: false,
        proveedor: false,
        marca: false,
        modelo: false,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Maneja el cambio en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => {
            const newInputs = { ...prevInputs, [name]: value };

            // Habilitar el siguiente input si el actual no está vacío
            setIsInputEnabled((prevState) => {
                const updatedState = { ...prevState };

                if (name === 'referencia' && value.trim() !== '') {
                    updatedState.siigo = true;
                }
                if (name === 'siigo' && value.trim() !== '') {
                    updatedState.descripcion = true;
                }
                if (name === 'descripcion' && value.trim() !== '') {
                    updatedState.linea = true;
                }
                if (name === 'linea' && newInputs.linea.trim() !== '') {
                    updatedState.tipo = true;
                }
                if (name === 'tipo' && newInputs.tipo.trim() !== '') {
                    updatedState.marca = true;
                }
                if (name === 'marca' && value.trim() !== '') {
                    updatedState.modelo = true;
                }

                return updatedState;
            });

            return newInputs;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requiredFields = ['referencia', 'siigo', 'descripcion', 'linea', 'tipo'];
        const allRequiredFieldsValid = requiredFields.every(field => inputs[field].trim() !== '');

        if (allRequiredFieldsValid) {
            try {
                await axios.post('http://localhost:8080/serviteca/autopartes', inputs);
                setIsModalOpen(true);
                fetchAutopartes();
                // navegacion("/auto-partes");Actualiza la lista después de guardar
            } catch (error) {
                console.error('Error al guardar:', error);
            }
        } else {
            alert('Por favor, completa todos los campos obligatorios.');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Fetch autopartes from the backend
    const fetchAutopartes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/serviteca/autopartes');
            setAutopartes(response.data);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    useEffect(() => {
        fetchAutopartes();
    }, []);

    return (
        <div>
            <nav aria-label="breadcrumb" className='breadcrumb002'>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item breadcrumb001">
                        <i className="fa-solid fa-house"></i>
                        Inicio
                    </li>
                    <li className="breadcrumb-item active breadcrumb004" aria-current="page">Autopartes</li>
                    <li className="breadcrumb-item active breadcrumb003" aria-current="page">Agregar</li>
                </ol>
            </nav>
            <div className='column005'>
                <h6 className='text009 pos-text'>Agregar auto-partes</h6>
                <ul className="icons001 icons009"></ul>
            </div>
            <form className="container005" onSubmit={handleSubmit}>
                <div className='column001'>
                    <div className='div-col002'>
                        <label className='label006' htmlFor="referencia">Referencia: *</label>
                        <input
                            className='input005 input007'
                            type="text"
                            id="referencia"
                            name="referencia"
                            required
                            value={inputs.referencia}
                            onChange={handleInputChange}
                            disabled={!isInputEnabled.referencia}
                        />
                    </div>
                    <div className='div-col002'>
                        <label className='label006' htmlFor="siigo">Código SIIGO: *</label>
                        <input
                            className='input005 input007'
                            type="text"
                            id="siigo"
                            name="siigo"
                            required
                            value={inputs.siigo}
                            onChange={handleInputChange}
                            disabled={!isInputEnabled.siigo}
                        />
                    </div>
                    <div className='div-col002'>
                        <label className='label006' htmlFor="descripcion">Descripción: *</label>
                        <textarea
                            className='input005 inputarea002'
                            rows={3}
                            id="descripcion"
                            name="descripcion"
                            required
                            value={inputs.descripcion}
                            onChange={handleInputChange}
                            disabled={!isInputEnabled.descripcion}
                        />
                    </div>
                    <div className='div-col002'>
                        <label className='label006' htmlFor="linea">Línea: *</label>
                        <select
                            className="dropdown-toggle002"
                            name="linea"
                            value={inputs.linea}
                            onChange={handleInputChange}
                            disabled={!isInputEnabled.linea}
                            required
                        >
                            <option value="" disabled>Selecciona una opción</option>
                            <option>No grabado</option>
                            <option>Grabado</option>
                        </select>
                    </div>
                </div>
                <div className='column001'>
                    <div className='div-col002'>
                        <label className='label006' htmlFor="tipo">Tipo: *</label>
                        <select
                            className="dropdown-toggle002"
                            name="tipo"
                            value={inputs.tipo}
                            onChange={handleInputChange}
                            disabled={!isInputEnabled.tipo}
                            required
                        >
                            <option value="" disabled>Selecciona una opción</option>
                            <option>Filtro</option>
                            <option>Aceite</option>
                            <option>Repuesto</option>
                        </select>
                    </div>
                    <div className='div-col002'>
                        <label className='label006' htmlFor="marca">Marca:</label>
                        <input
                            className='input005 input007'
                            type="text"
                            id="marca"
                            name="marca"
                            value={inputs.marca}
                            onChange={handleInputChange}
                            disabled={!isInputEnabled.marca}
                        />
                    </div>
                    <div className='div-col002'>
                        <label className='label006' htmlFor="modelo">Modelo:</label>
                        <input
                            className='input005 input007'
                            type="text"
                            id="modelo"
                            name="modelo"
                            value={inputs.modelo}
                            onChange={handleInputChange}
                            disabled={!isInputEnabled.modelo}
                        />
                    </div>
                    <div className='pos-btn009'>
                        <button className='btn009' type='submit'>
                            <div className="sub-btn009">
                                <i className="fa-solid fa-floppy-disk"></i>
                                <span>Guardar</span>
                            </div>
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <TableAutoPartes />
            </div>
            {isModalOpen && (
                <ModalExito
                    idmodal="demo-modal3"
                    titlemodal="Guardado"
                    parexito="Registro guardado con éxito"
                    className="modal__message003"
                    onClose={handleCloseModal}
                    rutaDir="/agregar-auto-partes"
                />
            )}
        </div>
    );
}

export default AutoPartes;
