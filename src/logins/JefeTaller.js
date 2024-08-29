import React, { useState } from "react";
import { Link } from "react-router-dom";
import servitecalogo from "../img/imginicio.png"
import "../logins/styles/LoginForm.css"

const LoginForm = () => {
  const [activeRole, setActiveRole] = useState("Jefe de taller");

  const handleRoleChange = (role) => {
    setActiveRole(role);
  };

    

  return (
    <div className="body-login">
      <div className="login-container">
        <img
          src={servitecalogo}
          alt="Premium Car Service Logo"
          className="logo-login"
          style={{
            width: "220px",
            height: "90px",
            left: "700px",
          }}
        />
        <div className="login-card-1">
          <h2 className="h2-login">
            <i className="fas fa-user-circle"></i> Iniciar sesión
          </h2>
          <div className="role-tabs">
            <button
              className={activeRole === "Jefe de taller" ? "active" : ""}
              onClick={() => handleRoleChange("Jefe de taller")}
            >
              Jefe de taller
            </button>
            <button
              className={activeRole === "Jefe de inventario" ? "active" : ""}
              onClick={() => handleRoleChange("Jefe de inventario")}
            >
              Jefe de inventario
            </button>
            <button
              className={activeRole === "Asistente de compras" ? "active" : ""}
              onClick={() => handleRoleChange("Asistente de compras")}
            >
              Asistente de compras
            </button>
          </div>
          <form>
            <div className="input-group-login">
              <i className="fas fa-user i-login"></i>
              <input className="input-login" type="text" placeholder="Usuario" required />
            </div>
            <div className="input-group-login">
              <i className="fas fa-lock i-login"></i>
              <input className="input-login" type="password" placeholder="Contraseña" required />
            </div>
            <Link className="a-login" href="#">Olvidé mi contraseña</Link>
            <button type="submit" className="login-button">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
