import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from './Input'
import Label from './Label'
import ModalExito from './ModalExito'
import { useNavigate, useParams } from 'react-router-dom';

function ModalEdit() {
    const urlBase = "http://localhost:8080/serviteca/autopartes";

    const { id } = useParams();

    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [servicios, setServicios] = useState([]);
    const [opcionesServicios, setOpcionesServicios] = useState([]);
    const [autopartes, setAutopartes] = useState({
        referencia: '',
        siigo: '',
        nombre: '',
        descripcion: '',
        cantidad: '',
        precioAutoparte:'',
        servicio: {
            idServicio: ''
        },
        linea: '',
        tipo: '',
        marca: '',
        modelo: '',
    });
    // const { referencia, siigo, descripcion, linea, tipo, marca, modelo } = autopartes

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    const cargarAutoPartes = async () => {
        const token = localStorage.getItem('token');
        try {
            const resultado = await axios.get(`${urlBase}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            setAutopartes(resultado.data)
        } catch (error) {
            console.error("Error al editar las autopartes:", error);
        }
    };

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

    const handleSelectChange = (selectedOption) => {
        if (selectedOption) {
            setAutopartes(prevData => ({
                ...prevData,
                servicio: {
                    idServicio: selectedOption.value,
                },
            }));
        }
    };

    useEffect(() => {
        cargarAutoPartes();
        obtenerServicios();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAutopartes({
            ...autopartes,
            [name]: value,
        });
    };

    const handleDropdownChange1 = (e) => {
        setAutopartes({
            ...autopartes,
            linea: e.target.value,
        });
    };

    const handleDropdownChange2 = (e) => {
        setAutopartes({
            ...autopartes,
            tipo: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = [
            'referencia',
            'siigo',
            'nombre',
            'descripcion',
            'cantidad',
            'precioAutoparte',
            'linea',
            'tipo',
        ];
        const allFieldsFilled = requiredFields.every(field => String(autopartes[field] || '').trim() !== '');
        if (allFieldsFilled) {
            const token = localStorage.getItem('token');
            try {
                await axios.post(urlBase, autopartes, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setIsModalOpen(true);
                // navegacion("/auto-partes")
            } catch (error) {
                console.error('Error al editar:', error);
                setError('');
            }
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
                    <li className="breadcrumb-item active breadcrumb004" aria-current="page">Autopartes</li>
                    <li className="breadcrumb-item active breadcrumb003" aria-current="page">Editar</li>
                </ol>
            </nav>
            <div id="demo-modal16" className='modal__message004'>
                <div className="modal__content modal__shadow">
                    <div className='modal__title'>
                        <h1>Editar Auto-Partes</h1>
                        <div className="linea002"></div>
                    </div>
                    <div>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="container005" >
                                <div className='column001'>
                                    <div className='div-col002'>
                                        <Label
                                            className='label006'
                                            htmlFor="referencia"
                                            name="Referencia:"
                                        />
                                        <Input
                                            className='input004'
                                            type="text"
                                            id="referencia"
                                            name="referencia"
                                            placeholder="Referencia" required={true}
                                            value={autopartes.referencia}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </div>
                                    <div className='div-col002'>
                                        <Label className='label006' htmlFor="siigo" name="Código SIIGO:"></Label>
                                        <Input
                                            className='input004'
                                            type="text"
                                            id="siigo"
                                            name="siigo"
                                            required
                                            value={autopartes.siigo}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </div>
                                    <div className='div-col002'>
                                        <Label
                                            className='label006'
                                            htmlFor="nombre"
                                            name="Nombre:"
                                        />
                                        <Input
                                            className='input004'
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            placeholder="Nombre"
                                            required={true}
                                            value={autopartes.nombre}
                                            onChange={(e) => handleInputChange(e)}
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
                                            name="descripcion"
                                            required
                                            value={autopartes.descripcion}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </div>
                                    <div className='div-col002'>
                                        <Label
                                            className='label006'
                                            htmlFor="cantidad"
                                            name="Cantidad:"
                                        />
                                        <Input
                                            className='input004'
                                            type="text"
                                            id="cantidad"
                                            name="cantidad"
                                            placeholder="Cantidad"
                                            required={true}
                                            value={autopartes.cantidad}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </div>

                                </div>
                                <div className='column001'>
                                <div className='div-col002'>
                                        <Label
                                            className='label006'
                                            htmlFor="precioAutoparte"
                                            name="Precio Autoparte:"
                                        />
                                        <Input
                                            className='input004'
                                            type="text"
                                            id="precioAutoparte"
                                            name="precioAutoparte"
                                            placeholder="precio Autoparte"
                                            required={true}
                                            value={autopartes.precioAutoparte}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </div>

                                    <div className='div-col002'>
                                        <Label className='label006' htmlFor="servicio" name="Servicio:"></Label>
                                        <div className="dropdown">
                                            <select
                                                className="dropdown-toggle002"
                                                name="servicio"
                                                value={autopartes.servicio.idServicio}
                                                onChange={(e) => handleSelectChange({ value: e.target.value })}

                                                required
                                            >
                                                <option value="" disabled>Selecciona una opción</option>
                                                {opcionesServicios.map((opcion) => (
                                                    <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='div-col002'>
                                        <Label className='label006' htmlFor="linea" name="Linea:"></Label>
                                        <div className="dropdown">
                                            <select className="dropdown-toggle"
                                                name="linea"
                                                value={autopartes.linea}
                                                onChange={handleDropdownChange1}
                                                required={true}
                                            >
                                                <option value="" disabled>Selecciona una opción</option>
                                                <option >No grabado</option>
                                                <option >Grabado</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='div-col002'>
                                        <Label className='label006' htmlFor="tipo" name="Tipo:"></Label>
                                        <div className="dropdown">
                                            <select className="dropdown-toggle"
                                                name="tipo"
                                                required={true}
                                                onChange={handleDropdownChange2}
                                                value={autopartes.tipo}                                            >
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
                                            name="marca"
                                            value={autopartes.marca}
                                            onChange={(e) => handleInputChange(e)}
                                        />
                                    </div>
                                    <div className='div-col002'>
                                        <Label className='label006' htmlFor="modelo" name="Modelo:" ></Label>
                                        <Input
                                            className='input004'
                                            type="text"
                                            id="modelo"
                                            name="modelo"
                                            value={autopartes.modelo}
                                            onChange={(e) => handleInputChange(e)}
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
                                <div className='pos-btn007 div-btn007'>
                                    <button onClick={goBack} className='btn007' type='button'>
                                        <div className="sub-btn007">
                                            <i className="fa-regular fa-circle-xmark"></i>
                                            <span className="">Cancelar</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                </div>
            </div>
            {isModalOpen && (
                <div>
                    <ModalExito
                        idmodal="demo-modal15"
                        titlemodal="Editado"
                        lineado="linea002"
                        parexito="Registro editado con exito"
                        className="modal__message003"
                        rutaDir="/auto-partes"
                        onClose={handleCloseModal}
                        btnclassName="btn0010"
                        buttonContent="OK"
                    />
                </div>
            )}
        </div>
    )
}

export default ModalEdit