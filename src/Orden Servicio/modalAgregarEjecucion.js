import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ModalStack = ({ onAutopartesSeleccionadas }) => { 
    const [datosOrden, setDatosOrden] = useState([]); 
    const [autopartes, setAutopartes] = useState([]);
    const [autopartesFiltradas, setAutopartesFiltradas] = useState([]);
    const [filtroReferencia, setFiltroReferencia] = useState('');
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [autopartesSeleccionadas, setAutopartesSeleccionadas] = useState([]);

    useEffect(() => {
        const idOrden = localStorage.getItem('idOrden'); // Identificador del servicio en `localStorage`

        const fetchData = async () => {
            try {
                // Solicitar los nombres de servicio asociados a la orden
                const responseEjecucion = await axios.get(`http://localhost:8080/serviteca/ejecucion?idOrden=${idOrden}`);
                const nombresServicio = responseEjecucion.data.map(servicio => servicio.nombreServicio);
                setDatosOrden(nombresServicio);

                // Solicitar solo las autopartes relacionadas con el servicio asignado
                const responseAutopartes = await axios.get(`http://localhost:8080/serviteca/autopartes?servicioId=${idOrden}`);
                setAutopartes(responseAutopartes.data);
                setAutopartesFiltradas(responseAutopartes.data);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };

        fetchData();
    }, []);

    const togglePopover = () => setPopoverVisible(!popoverVisible);

    const buscarPorReferencia = () => {
        const filtradas = autopartes.filter((parte) =>
            parte.referencia.toLowerCase().includes(filtroReferencia.toLowerCase())
        );
        setAutopartesFiltradas(filtradas);
    };

    const isChecked = (parte) => {
        return autopartesSeleccionadas.some((item) => item.referencia === parte.referencia);
    };

    const handleCheckboxChange = (parte) => {
        if (isChecked(parte)) {
            setAutopartesSeleccionadas((prev) =>
                prev.filter((item) => item.referencia !== parte.referencia)
            );
        } else {
            setAutopartesSeleccionadas((prev) => [...prev, parte]);
        }
    };

    const handleAgregar = () => {
        onAutopartesSeleccionadas(autopartesSeleccionadas);
        setAutopartesSeleccionadas([]);
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
                                    <div className='col-5 d-flex align-items-center'>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={datosOrden ? datosOrden.join(', ') : ''}
                                            readOnly
                                            style={{ marginRight: '10px' }}
                                        />
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
                                                        checked={isChecked(parte)}
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
