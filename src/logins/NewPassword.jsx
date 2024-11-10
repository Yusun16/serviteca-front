import React, { useState, useEffect } from 'react';
import servitecalogo from "../img/imginicio.png"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "../logins/styles/LoginForm.css"
import ModalExito from '../autopartes/ModalExito';
import CheckReady from '../img/check-ready.png'

function NewPassword() {
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const { otp, username } = useParams();

    useEffect(() => {
        const hasChangedPassword = localStorage.getItem('hasChangedPassword');
        if (hasChangedPassword) {
            navigate("/");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (password !== repeatPassword) {
            setErrorMessage('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/api/servitecauth/changePassword/${otp}/${username}`, {
                password,
                repeatPassword,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setIsModalOpen(true);
            setSuccessMessage(response.data);
            localStorage.setItem('hasChangedPassword', true);
            navigate("/")
        } catch (error) {
            if (error.response) {
                console.error("Detalles del error:", error.response.data);
                setErrorMessage(error.response.data.message || 'Error al cambiar la contraseña.');
            } else {
                setErrorMessage('Error en cambiar la contrasena');
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
                        Actualizar contrasena
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group-login">
                            <i className="fas fa-lock i-login"></i>
                            <input className="input-login" type="text" placeholder="Escriba la contrasena"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group-login">
                            <i className="fas fa-user i-login"></i>
                            <input className="input-login" type="text"
                                placeholder="Repetir Contraseña"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">
                            Actualizar
                        </button>
                        {isModalOpen &&
                            <ModalExito
                                idmodal="demo-modal49"
                                parexito="Contraseña actualizada con éxito"
                                className="modal003"
                                onClose={handleCloseModal}
                                buttonContent={<img src={CheckReady} alt='actualizar-registro' className='img-ready' />}
                            />
                        }
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewPassword