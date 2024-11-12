import React, { useState, useEffect } from 'react';
import imgInicio from '../img/imginicio.png';
import { Link } from 'react-router-dom';

export default function VistaPrincipal() {
    const [activeRole, setActiveRole] = useState('');

    useEffect(() => {
        const storedRoles = JSON.parse(localStorage.getItem('roles'));
        if (storedRoles && storedRoles.length > 0) {
            setActiveRole(storedRoles[0]);
        }
    }, []);

    return (
        <div className="container">
            <div>
                <button
                    // className="btn btn-outline-light text-black"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                    style={{ position: "absolute", left: "96%", top: "11%", border: "none" }}>
                    <i className="fa-solid fa-bars" style={{ color: "#D95447", fontSize: "30px" }}></i>
                </button>
                <div
                    className="offcanvas offcanvas-end colonav"
                    style={{ width: "311px", height: "95vh", top: "62px" }}
                    tabIndex="-1"
                    id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header" style={{ position: "absolute" }}>
                        <button
                            type="button"
                            className="btn-offcanvas001"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close">
                            <span className="close-icon"></span>
                        </button>
                    </div>

                    <div className="text" style={{ position: "relative", marginTop: "20px" }}>
                        {activeRole === 'ROLE_TALLER' && (
                            <ul>
                                <li style={{ marginBottom: "40px" }}>
                                    <Link className='servicios text-white' style={{ textDecoration: "none", position: "relative", left: "18px" }} to="/agregarorden">Orden Servicio</Link>
                                </li>
                                <li style={{ margin: "40px 0px" }}>
                                    <Link className='servicios text-white' style={{ textDecoration: "none", position: "relative", left: "18px" }} to="/listadovehiculo">Registrar Vehiculo</Link>
                                </li>
                                <li style={{ margin: "40px 0px" }}>
                                    <Link className='servicios text-white' style={{ textDecoration: "none", position: "relative", left: "18px" }} to="/listadocliente">Registrar Cliente</Link>
                                </li>
                                <li style={{ margin: "40px 0px" }}>
                                    <Link className='servicios text-white' style={{ textDecoration: "none", position: "relative", left: "18px" }} to="/operarios">Registrar Operario</Link>
                                </li>
                                <li style={{ margin: "40px 0px" }}>
                                    <Link className='servicios text-white' style={{ textDecoration: "none", position: "relative", left: "18px" }} to="/informe-servicios">Informe Servicios</Link>
                                </li>
                                <li style={{ margin: "40px 0px" }}>
                                    <Link className='servicios text-white' style={{ textDecoration: "none", position: "relative", left: "18px" }} to="/informe-auto-partes">Informe Autopartes</Link>
                                </li>
                                <li style={{ margin: "40px 0px" }}>
                                    <Link className='servicios text-white' style={{ textDecoration: "none", position: "relative", left: "18px" }} to="/informe-liquidacion-operarios">Informe Liquidacion Operarios</Link>
                                </li>
                            </ul>
                        )}

                        {activeRole === 'ROLE_INVENTARIO' && (
                            <ul>
                                <li>
                                    <Link className='servicios text-white' style={{ textDecoration: "none", position: "relative", left: "18px" }} to="/listadoservicio">Servicios</Link>
                                </li>
                            </ul>
                        )}

                        {activeRole === 'ROLE_ASISTENTE' && (
                            <ul>
                                <li>
                                    <Link className='servicios text-white' style={{ textDecoration: "none", position: "relative", left: "18px" }} to="/auto-partes">Autopartes</Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <img
                    src={imgInicio}
                    alt="Logo de inicio"
                    style={{ width: "500px", height: "200px", position: "absolute", left: "32%", top: "43%", display: "flex", transform: "translate(0%, 0%)" }}
                />
            </div>
        </div>

    )
}
