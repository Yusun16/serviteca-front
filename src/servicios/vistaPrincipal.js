import React from 'react'
import imgInicio from '../img/imginicio.png';

export default function vistaPrincipal() {
    return (
        <div className="container">    
              <img src={imgInicio} alt="Logo de inicio" style={{ width: "500px", height: "200px", position: "relative", left: "410px", top: "200px"}} />
        </div>
    )
}
