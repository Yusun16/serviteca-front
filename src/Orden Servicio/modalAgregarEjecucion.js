import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ModalStack = ({ onAutopartesSeleccionadas }) => {
    const [autopartes, setAutopartes] = useState([]);
    const [autopartesFiltradas, setAutopartesFiltradas] = useState([]);
    const [filtroReferencia, setFiltroReferencia] = useState('');
    const [autopartesSeleccionadas, setAutopartesSeleccionadas] = useState([]);
    const [popoverVisible, setPopoverVisible] = useState(false); // Estado para controlar la visibilidad del Popover

    useEffect(() => {
        const fetchAutopartes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/serviteca/autopartes');
                setAutopartes(response.data);
                setAutopartesFiltradas(response.data);
            } catch (error) {
                console.error("Error al cargar autopartes:", error);
            }
        };

        fetchAutopartes();
    }, []);

    const handleCheckboxChange = (parte) => {
        setAutopartesSeleccionadas((prevSeleccionadas) => {
            if (prevSeleccionadas.some((item) => item.referencia === parte.referencia)) {
                return prevSeleccionadas.filter((item) => item.referencia !== parte.referencia);
            } else {
                return [...prevSeleccionadas, parte];
            }
        });
    };

    const buscarPorReferencia = () => {
        const resultado = autopartes.filter(parte =>
            parte.referencia.toLowerCase().includes(filtroReferencia.toLowerCase())
        );
        setAutopartesFiltradas(resultado);
    };

    const togglePopover = () => {
        setPopoverVisible(!popoverVisible);
    };

    // Al hacer clic en "Agregar", envía las autopartes seleccionadas al componente principal
    const handleAgregar = () => {
        onAutopartesSeleccionadas(autopartesSeleccionadas); // Pasa las autopartes seleccionadas al padre
    };

    return (
        <div className="container mt-5">
            <div className="modal fade" id="firstModal" tabIndex="-1" aria-labelledby="firstModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button type="button" className="equis-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            <br />
                            <div className="modal-body text-center">
                                <div className="col" style={{ display: "flex", flexDirection: "row" }}>
                                    <div className='col-4'>Agregar Productos:</div>
                                    <div className='col-5'>
                                        <button 
                                            type="button" 
                                            className="btn btn-center btncolor" 
                                            onClick={togglePopover} 
                                            aria-expanded={popoverVisible}
                                        >
                                            Buscar
                                        </button>
                                        {popoverVisible && (
                                            <div className="popover bs-popover-bottom show" role="tooltip" style={{ position: 'absolute', zIndex: 1 }}>
                                                <div className="popover-arrow"></div>
                                                <div className="popover-body">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Ingrese referencia"
                                                        value={filtroReferencia}
                                                        onChange={(e) => setFiltroReferencia(e.target.value)}
                                                    />
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-sm btn-primary mt-2" 
                                                        onClick={() => {
                                                            buscarPorReferencia();
                                                            togglePopover();
                                                        }}
                                                    >
                                                        Buscar
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <table className="container" style={{ marginTop: "15px" }}>
                                    <thead>
                                        <tr className='tr-table-tr text-center'>
                                            <th className='text-letras colorthead text-center' scope="col">Referencia</th>
                                            <th className='text-letras colorthead text-center' scope="col">Agregar</th>
                                            <th className='text-letras colorthead text-center' scope="col">Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {autopartesFiltradas.map((parte) => (
                                            <tr key={parte.referencia} className='tr-table-tr text-center'>
                                                <td>{parte.referencia}</td>
                                                <td>
                                                    <input 
                                                        className="form-check-input" 
                                                        type="checkbox" 
                                                        onChange={() => handleCheckboxChange(parte)}
                                                    />
                                                </td>
                                                <td>{parte.cantidad}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button type="button" className="btnncolor btn-sm me-3" data-bs-dismiss="modal" onClick={handleAgregar}>
                                Agregar <i className="fa-solid fa-check"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalStack;
