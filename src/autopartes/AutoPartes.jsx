import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableAutoPartes from './TableAutoPartes';
import ModalExito from './ModalExito';
import { useNavigate } from 'react-router-dom';

function AutoPartes() {
    let navegacion = useNavigate();
    const [autopartes, setAutopartes] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [opcionesServicios, setOpcionesServicios] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");


    const [inputs, setInputs] = useState({
        referencia: '',
        siigo: '',
        nombre: '',
        descripcion: '',
        cantidad: '',
        precioAutoparte: '',
        servicio: {
            idServicio: ''
        },
        linea: '',
        tipo: '',
        marca: '',
        modelo: '',
    });

    const [isInputEnabled, setIsInputEnabled] = useState({
        referencia: true,
        siigo: false,
        nombre: false,
        descripcion: false,
        cantidad: false,
        precioAutoparte: false,
        servicio: false,
        linea: false,
        tipo: false,
        marca: false,
        modelo: false,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const obtenerServicios = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:8080/serviteca/servicios', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setServicios(response.data);
            const opciones = response.data.map((servicio) => ({
                value: servicio.idServicio,
                label: `${servicio.nombre}`,
            }));
            setOpcionesServicios(opciones);
        } catch (error) {
            console.error("Error al obtener los servicios", error);
        }
    };

    // Manejando el cambio en los inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => {
            const newInputs = { ...prevInputs, [name]: value };

            // Habilitar input por input cuando si el anterior tiene un registro!!!
            setIsInputEnabled((prevState) => {
                const updatedState = { ...prevState };

                if (name === 'referencia' && value.trim() !== '') {
                    updatedState.siigo = true;
                }
                if (name === 'siigo' && value.trim() !== '') {
                    updatedState.nombre = true;
                }
                if (name === 'nombre' && value.trim() !== '') {
                    updatedState.descripcion = true;
                }
                if (name === 'descripcion' && value.trim() !== '') {
                    updatedState.cantidad = true;
                }
                if (name === 'cantidad' && value.trim() !== '') {
                    updatedState.precioAutoparte = true;
                }
                if (name === 'precioAutoparte' && value.trim() !== '') {
                    updatedState.servicio = true;
                }
                if (name === 'servicio' && value.trim() !== '') {
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

    const handleSelectChange = (selectedOption) => {
        if (selectedOption) {
            setInputs(prevData => ({
                ...prevData,
                servicio: {
                    idServicio: selectedOption.value,
                },
            }));

            setIsInputEnabled(prevState => ({
                ...prevState,
                linea: true,
            }));
        }
    };

    const validateReference = (referencia) => {
        const referenceRegex = /^[A-Za-z0-9\-\.]+$/;
        const refereMinLength = 4;
        const refereMaxLength = 20;

        if (!referencia || referencia.length < refereMinLength || referencia.length > refereMaxLength || !referenceRegex.test(referencia)) {
            return "La referencia debe ser alfanumérica, y puede incluir guiones y puntos.";
        }

        const guionCount = (referencia.match(/-/g) || []).length;
        if (guionCount > 3) {
            return "La referencia puede tener un máximo de 3 guiones.";
        }

        if (!/[A-Za-z0-9]/.test(referencia)) {
            return "La referencia debe contener al menos una letra o número.";
        }

        return null; // Si pasa la validación, no hay error
    };

    const validateSiigoCode = (siigo) => {
        const siigoRegex = /^[A-Za-z0-9-]+$/;
        const siigoMinLength = 4;
        const siigoMaxLength = 20;

        if (!siigo || siigo.length < siigoMinLength || siigo.length > siigoMaxLength || !siigoRegex.test(siigo)) {
            return "El código Siigo debe ser alfanumérico y puede incluir guiones, con una longitud entre 6 y 20 caracteres.";
        }

        // Si tu sistema requiere que el código sea único, aquí también se podría hacer una llamada al backend para verificar si el código ya existe en la base de datos.

        return null;
    };

    const validateForm = () => {
        const {
            referencia,
            siigo,
            nombre,
            descripcion,
            cantidad,
            precioAutoparte,
            servicio,
            linea,
            tipo,
            marca,
            modelo,
        } = inputs;

        const referenceError = validateReference(referencia);
        if (referenceError) {
            setErrorMessage(referenceError);
            return false;
        }

        const siigoError = validateSiigoCode(siigo);
        if (siigoError) {
            setErrorMessage(siigoError);
            return false;
        }

        const nameRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$/;
        if (!nombre || !nameRegex.test(nombre)) {
            setErrorMessage("El nombre solo puede contener letras.");
            return false;
        }

        if (!descripcion || descripcion.length > 500) {
            setErrorMessage("La descripción no puede estar vacía y debe tener un máximo de 500 caracteres.");
            return false;
        }

        if (!cantidad || isNaN(cantidad) || parseInt(cantidad, 10) <= 0) {
            setErrorMessage("La cantidad debe ser un número entero mayor que 0.");
            return false;
        }

        if (!precioAutoparte || isNaN(precioAutoparte) || parseFloat(precioAutoparte) <= 0) {
            setErrorMessage("El precio de la autoparte debe ser un número mayor que 0.");
            return false;
        }

        if (!servicio) {
            setErrorMessage("Por favor, selecciona un servicio.");
            return false;
        }

        if (!linea) {
            setErrorMessage("Por favor, selecciona una linea.");
            return false;
        }

        if (!tipo) {
            setErrorMessage("Por favor, selecciona un tipo.");
            return false;
        }

        const marcaRegex = /^[A-Za-z]+([ -]?[A-Za-z]+)*$/;  // Letras, espacios y guiones entre palabras

        if (marca && !marcaRegex.test(marca)) {
            setErrorMessage("La marca solo puede contener letras, espacios entre palabras y guiones.");
            return false;
        }

        const modeloRegex = /^\d{4}$/;  // Validación para año (4 dígitos)
        if (modelo && !modeloRegex.test(modelo)) {
            setErrorMessage("El modelo debe ser un año válido (4 dígitos).");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:8080/serviteca/autopartes', inputs, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsModalOpen(true);
            fetchAutopartes();
            // navegacion("/auto-partes");Actualiza la lista después de guardar
        } catch (error) {
            console.error('Error al guardar:', error);
            setErrorMessage("Hubo un problema al enviar los datos. Intenta nuevamente.");
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        window.location.reload(true);
        setInputs({
            referencia: '',
            siigo: '',
            nombre: '',
            descripcion: '',
            cantidad: '',
            precioAutoparte: '',
            servicio: {
                idServicio: ''
            },
            linea: '',
            tipo: '',
            marca: '',
            modelo: '',
        });
    };

    // Fetch autopartes from the backend
    const fetchAutopartes = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get('http://localhost:8080/serviteca/autopartes', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAutopartes(response.data);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    useEffect(() => {
        fetchAutopartes();
        obtenerServicios();
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
                            value={inputs.siigo}
                            onChange={handleInputChange}
                            disabled={!isInputEnabled.siigo}
                        />
                    </div>
                    <div className='div-col002'>
                        <label className='label006' htmlFor="nombre">Nombre: *</label>
                        <input
                            className='input005 input007'
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={inputs.nombre}
                            onChange={handleInputChange}
                            disabled={!isInputEnabled.nombre}
                        />
                    </div>
                    <div className='div-col002'>
                        <label className='label006' htmlFor="descripcion">Descripción: *</label>
                        <textarea
                            className='input005 inputarea002'
                            rows={3}
                            id="descripcion"
                            name="descripcion"
                            value={inputs.descripcion}
                            onChange={handleInputChange}
                            disabled={!isInputEnabled.descripcion}
                        />
                    </div>
                    <div className='div-col002'>
                        <label className='label006' htmlFor="cantidad">Cantidad: *</label>
                        <input
                            className='input005 input007'
                            type="text"
                            id="cantidad"
                            name="cantidad"
                            value={inputs.cantidad}
                            onChange={handleInputChange}
                            disabled={!isInputEnabled.cantidad}
                        />
                    </div>
                </div>

                <div className='column001'>
                    <div className='div-col002'>
                        <label className='label006' htmlFor="cantidad">Costo del producto: *</label>
                        <input
                            className='input005 input007'
                            type="text"
                            id="precioAutoparte"
                            name="precioAutoparte"
                            value={inputs.precioAutoparte}
                            onChange={handleInputChange}
                            disabled={!isInputEnabled.precioAutoparte}
                        />
                    </div>
                    <div className='div-col002'>
                        <label className='label006' htmlFor="servicio">Servicio: *</label>
                        <select
                            className="dropdown-toggle002"
                            name="servicio"
                            value={inputs.servicio.idServicio}
                            onChange={(e) => handleSelectChange({ value: e.target.value })}
                            disabled={!isInputEnabled.servicio}
                            required
                        >
                            <option value="" disabled>Selecciona una opción</option>
                            {opcionesServicios.map((opcion) => (
                                <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className='div-col002'>
                        <label className='label006' htmlFor="linea">Linea: *</label>
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
            {errorMessage && <p className="error-message container text-center">{errorMessage}</p>}
            <div>
                <TableAutoPartes />
            </div>
            {isModalOpen && (
                <ModalExito
                    idmodal="demo-modal3"
                    titlemodal="Guardado"
                    lineado="linea002"
                    parexito="Registro guardado con éxito"
                    className="modal__message003"
                    onClose={handleCloseModal}
                    rutaDir="/agregar-auto-partes"
                    btnclassName="btn0010"
                    buttonContent="OK"
                />
            )}

        </div>
    );
}

export default AutoPartes;
