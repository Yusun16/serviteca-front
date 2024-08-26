import React from 'react'
import imgInicio from '../img/imginicio.png';
import { Link } from 'react-router-dom';

export default function vistaPrincipal() {
    return (



        <div className="container">


            <div>

                <button className="btn btn-outline-light text-black" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" style={{ position: "relative", left: "105%" }}><i className="fa-solid fa-bars"></i></button>

                <div className="offcanvas offcanvas-end colonav" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="text">
                        <Link className='servicios text-white' style={{textDecoration: "none"}} to="/"> Servicios</Link>
                    </div>
                </div>
            </div>


            <div>
                <img src={imgInicio} alt="Logo de inicio" style={{ width: "500px", height: "200px", position: "relative", left: "410px", top: "200px" }} />
            </div>


        </div>



    )
}
