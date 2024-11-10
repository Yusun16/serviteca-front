import React, { useState } from 'react';
import servitecalogo from "../img/imginicio.png"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../logins/styles/LoginForm.css"

function ResetPassword() {
    const [username, setUsername] = useState('');
    const [cedula, setCedula] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:8080/api/servitecauth/verify-correo', null, {
                params: {
                    username,
                    cedula,
                },
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setSuccessMessage(response.data);
            navigate("/verificar-correo")
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message || "Correo o cedula, no validos!!!");
            } else {
                setErrorMessage('Verifica tus datos y vuelva a intentarlo, nuevamente.');
            }
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
                        Restablecer contraseña
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group-login">
                            <i className="fas fa-user i-login"></i>
                            <input className="input-login" type="text" placeholder="Correo"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group-login">
                            <i className="fas fa-lock i-login"></i>
                            <input className="input-login" type="text" placeholder="Cedula"
                                value={cedula}
                                onChange={(e) => setCedula(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">
                            Validar
                        </button>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword