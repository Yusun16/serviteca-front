import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import servitecalogo from "../img/imginicio.png"
import "../logins/styles/LoginForm.css"

const LoginForm = () => {
  const [activeRole, setActiveRole] = useState("Jefe de taller");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const user = jwtDecode(token);
  //     const roles = user?.roles || [];
  //     if (roles.includes("ROLE_TALLER")) {
  //       navigate("/agregarorden");
  //     } else if (roles.includes("ROLE_INVENTARIO")) {
  //       navigate("/inicio");
  //     } else if (roles.includes("ROLE_ASISTENTE")) {
  //       navigate("/auto-partes");
  //     }
  //   }
  // }, [navigate]);

  const handleRoleChange = (role) => {
    setActiveRole(role);
    // console.log(`Rol seleccionado: ${role}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(`Intento de inicio de sesión con: ${username}, Rol: ${activeRole}`);

    let roleKey;
    switch (activeRole) {
      case "Jefe de taller":
        roleKey = "ROLE_TALLER";
        break;
      case "Jefe de inventario":
        roleKey = "ROLE_INVENTARIO";
        break;
      case "Asistente de compras":
        roleKey = "ROLE_ASISTENTE";
        break;
      default:
        roleKey = null;
    }

    if (!roleKey) {
      setErrorMessage("Rol no válido");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/servitecauth/signin', {
        username,
        password,
      });

      const token = response.data.accessToken;

      const decodedToken = jwtDecode(token);
      const roles = decodedToken.roles || [];

      // console.log("Roleando:", jwtDecode(token))

      localStorage.setItem('token', token);
      localStorage.setItem('roles', JSON.stringify(roles));

      // console.log("Inicio de sesión exitoso:", response.data);

      // const roles = response.data.roles;

      if (!roles.includes(roleKey)) {
        setErrorMessage("No tienes permisos para acceder con este rol.");
        return;
      }

      // if (roles.includes("ROLE_TALLER")) {
      //   // console.log("Redirigiendo a /agregarorden");
      //   navigate("/agregarorden");
      // } else if (roles.includes("ROLE_INVENTARIO")) {
      //   // console.log("Redirigiendo a /inicio");
      //   navigate("/inicio");
      // } else if (roles.includes("ROLE_ASISTENTE")) {
      //   // console.log("Redirigiendo a /auto-partes");
      //   navigate("/auto-partes");
      // } else {
      //   // console.log("Rol no reconocido, redirigiendo a la página principal");
      //   navigate("/");
      // }

      // console.log("Rol activo antes de navegar:", activeRole);
      navigate("/vista-principal", { state: { rol: activeRole } });

    } catch (error) {
      // console.error("Error en el inicio de sesión:", error);
      if (error.response) {
        console.error("Detalles del error:", error.response.data);
      }
      setErrorMessage("Correo y/o contrasena invalido");
    }
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
          <form onSubmit={handleSubmit}>
            <div className="input-group-login">
              <i className="fas fa-user i-login"></i>
              <input className="input-login" type="email" placeholder="Usuario" value={username}
                onChange={(e) => setUsername(e.target.value)}
                required />
            </div>
            <div className="input-group-login">
              <i className="fas fa-lock i-login"></i>
              <input className="input-login" type="password" placeholder="Contraseña" value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            </div>
            <Link to="/recuperar-contrasena" className="a-login">Olvidé mi contraseña</Link>
            <button type="submit" className="login-button" disabled={!username || !password}>
              Ingresar
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
