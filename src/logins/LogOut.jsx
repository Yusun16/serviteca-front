import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogOut() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Eliminar el token en el localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("lastVisitedRoute");

        // Redirigir a la página de login
        navigate("/");
    };

    return (
        <a onClick={handleLogout} className='btn-logout'>
            <div className='sub-btn-logout'>
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                <span>Cerrar sesión</span>
            </div>
        </a>
    );
};

export default LogOut