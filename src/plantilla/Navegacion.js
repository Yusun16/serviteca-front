import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import imgnav from '../img/carservice.jpeg';
import LogOut from '../logins/LogOut';

export default function Navegacion() {
  const [activeRole, setActiveRole] = useState('');
  const location = useLocation();

  const roleMap = {
    "ROLE_TALLER": "Jefe de Taller",
    "ROLE_INVENTARIO": "Jefe de Inventario",
    "ROLE_ASISTENTE": "Asistente de Compras"
  };

  useEffect(() => {
    const roles = JSON.parse(localStorage.getItem('roles'));
    if (roles && roles.length > 0) {
      const userRole = roles[0];
      setActiveRole(roleMap[userRole] || userRole);
    }
  }, []);

  return (
    <nav className="navbar colonav">
      {location.pathname === '/vista-principal' ? (
        <div className="container-fluid"></div>
      ) : (
        <div className="container-fluid">
          <img src={imgnav} alt="Logo de la serviteca" style={{ width: "150px" }} />
          {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button> */}
          {/* <div className="collapse navbar-collapse" id="navbarNav">
          </div> */}
        </div>
      )}
      <div>
        <ul className="nav justify-content-end">
          {location.pathname === '/vista-principal' ? (
            <div className='items-vista'>
              <li className="nav-item">
                <div className='sub-btn-rol001'>
                  <i className="fas fa-user"></i>
                  <span>{activeRole}</span>
                </div>
              </li>
              <li className="nav-item">
                <div className='sub-btn-rol001'>
                  <LogOut />
                </div>
              </li>
            </div>
          ) : (
            <li className="nav-item">
              <Link to="/vista-principal" style={{ listStyle: "none", color: "white", display: "flex", position: "absolute", top: "28px", right: "55px", gap: "25px" }}><p>Home</p><i class="fa-solid fa-house" style={{ fontSize: "31px" }}></i> </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}