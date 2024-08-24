import React from 'react'
import { Link } from 'react-router-dom'

export default function Navegacion() {
  return (
<<<<<<< HEAD
    <nav className="navbar navbar-expand-lg navbar-dark colonav">
      <div className="container-fluid">
        <img src={imgnav} alt="Logo de la serviteca" style={{ width: "150px" }} />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        </div>
      </div>
      <div>
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <Link to="/agregarorden" style={{ listStyle: "none", color: "white", fontSize: "31px" }}><i class="fa-solid fa-house"></i> </Link>
          </li>
        </ul>
      </div>
    </nav>
=======
    <div className='container'>
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Inicio</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/agregar">Agregar Servicio</Link>
          
        </li>
      </ul>
    </div>
  </div>
</nav>

    </div>
>>>>>>> 887b256c56b4483092488376db137b945d8721b9
  )
}
