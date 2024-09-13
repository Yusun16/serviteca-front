import React from 'react'
import { Link } from 'react-router-dom'
import imgnav from '../img/carservice.jpeg';

export default function Navegacion() {
  return (
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
            <Link to="/inicio" style={{ listStyle: "none", color: "white", display: "flex", position: "absolute", top: "28px", right: "55px", gap: "25px" }}><p>Home</p><i class="fa-solid fa-house" style={{ fontSize: "31px" }}></i> </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
