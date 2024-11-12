import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import servitecalogo from "../img/imginicio.png"
import "../logins/styles/LoginForm.css"

const RegisterUsuario = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cedula, setCedula] = useState('');
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const cedulaRegex = /^\d{7,12}$/;
    const passwordRegex = /^[A-Za-z0-9]{4,12}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedUsername = username.trim();
        const trimmedCedula = cedula.trim();
        const trimmedPassword = password.trim();

        if (!trimmedUsername || !emailRegex.test(trimmedUsername)) {
            setErrorMessage("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        if (!trimmedCedula || !cedulaRegex.test(trimmedCedula)) {
            setErrorMessage("La cédula debe ser un número entre 7 y 12 dígitos, sin espacios.");
            return;
        }

        if (!trimmedPassword || !passwordRegex.test(trimmedPassword)) {
            setErrorMessage("La contraseña debe tener entre 4 y 12 caracteres, solo letras y sin espacios.");
            return;
        }

        if (!role || role === 'default') {
            setErrorMessage("Por favor, selecciona un rol.");
            return;
        }

        setErrorMessage("");

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://localhost:8080/api/servitecacess/signup', {
                username,
                cedula,
                password,
                role: [role],
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setSuccessMessage('Usuario registrado exitosamente.');
            navigate("/vista-principal");
        } catch (error) {
            console.error("Error en el registro:", error);
            if (error.response) {
                setErrorMessage(`Error: ${error.response.data.message || error.response.data}`);
            } else {
                setErrorMessage("Hubo un problema al registrar al usuario. Intenta nuevamente.");
            }
        }
    };


    return (
        <div className="body-register-user">
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
                        <i className="fas fa-user-circle"></i> Registrando usuarios
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group-login">
                            <i className="fas fa-user i-login"></i>
                            <input className="input-login" type="email" placeholder="Correo" value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required />
                        </div>
                        <div className="input-group-login">
                            <i className="fa-solid fa-address-card i-login"></i>
                            <input className="input-login" type="text" placeholder="Cedula" value={cedula}
                                onChange={(e) => setCedula(e.target.value)}
                                required />
                        </div>
                        <div className="input-group-login">
                            <i className="fas fa-lock i-login"></i>
                            <input className="input-login" type="password" placeholder="Contraseña" value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                        </div>
                        <div className="input-group-login">
                            <i className="fas fa-users-cog i-login"></i>
                            <select
                                className="input-login"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="default" disabled>Seleccionar un rol</option>
                                <option value="jefeTaller">Jefe de Taller</option>
                                <option value="jefeInventario">Jefe de Inventario</option>
                                <option value="asistenteCompra">Asistente de Compras</option>
                            </select>
                        </div>
                        <button type="submit" className="login-button">
                            Registrar
                        </button>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        {successMessage && <p className="success">{successMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterUsuario;
