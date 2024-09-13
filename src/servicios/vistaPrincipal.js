import React from 'react'
import imgInicio from '../img/imginicio.png';
import { Link } from 'react-router-dom';

export default function vistaPrincipal() {
    return (



        <div className="container">


            <div>

                <button className="btn btn-outline-light text-black" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight "
                    style={{ position: "absolute", left: "96%" }}><i className="fa-solid fa-bars" style={{ color: "#D95447", fontSize: "30px" }}></i></button>

                <div className="offcanvas offcanvas-end colonav" style={{ width: "311px", height: "89vh", top: "86px" }} tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                        <button type="button" className="btn-close btn-offcanvas001" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="text">
                        <Link className='servicios text-white' style={{ textDecoration: "none", position: "relative", left: "18px" }} to="/"> Servicios</Link>
                    </div>
                </div>
            </div>


            <div>
                <img src={imgInicio} alt="Logo de inicio" style={{ width: "500px", height: "200px", position: "absolute", left: "32%", top: "43%", bottom: "50%", right: "50%", display: "flex", transform: "translate(0%, 0%)" }} />
            </div>


        </div>



    )
}
