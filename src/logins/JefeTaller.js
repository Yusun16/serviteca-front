import React, { useState } from "react";
import "../styles/LoginForm.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [activeRole, setActiveRole] = useState("Jefe de taller");

  const handleRoleChange = (role) => {
    setActiveRole(role);
  };

  return (
    <div className="login-container">
      <img
        src="path_to_logo.png"
        alt="Premium Car Service Logo"
        className="logo"
      />
      <div className="login-card">
        <h2>
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
          <div className="input-group">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Usuario" required />
          </div>
          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Contraseña" required />
          </div>
          <Link href="#">Olvidé mi contraseña</Link>
          <button type="submit" className="login-button">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
