import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import servitecalogo from "../img/imginicio.png";
import "../logins/styles/LoginForm.css";

const AdminLoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/servitecauth/signin', {
                username,
                password,
            });

            const token = response.data.accessToken;
            const decodedToken = jwtDecode(token);

            localStorage.setItem('token', token);
            const roles = decodedToken.roles || [];
            localStorage.setItem('roles', JSON.stringify(roles));

            // Verificar rol "ROLE_ADMIN"
            if (roles.includes("ROLE_ADMIN")) {
                navigate("/vista-principal", { state: { rol: "ROLE_ADMIN" } });
            } else {
                setErrorMessage("No tienes permisos para acceder a esta sección.");
            }

        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            setErrorMessage("Correo y/o contraseña inválidos.");
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
                        <i className="fas fa-user-circle"></i> Iniciar sesión (Solo Administrador)
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group-login">
                            <i className="fas fa-user i-login"></i>
                            <input
                                className="input-login"
                                type="text"
                                placeholder="Usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group-login">
                            <i className="fas fa-lock i-login"></i>
                            <input
                                className="input-login"
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button" disabled={!username || !password}>
                            Ingresar
                        </button>
                        <p className="a-login" style={{ marginTop: '15px', textAlign: 'center' }}>
                            ¿Olvidaste tu contraseña? <a href="/recuperar-contrasena">Recuperar contraseña</a>
                        </p>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginForm;
