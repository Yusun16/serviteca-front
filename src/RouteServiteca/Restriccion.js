import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Restriccion = ({ element, allowedRoles }) => {
    const token = localStorage.getItem("token");
    const user = token ? jwtDecode(token) : null;

    const userRoles = user?.roles || [];

    const hasAccess = allowedRoles.some(role => userRoles.includes(role));
    // console.log('Usuario decodificado:', user);
    // console.log('Comprobando acceso:', hasAccess);

    return hasAccess ? element : <Navigate to="/" />;

};

export default Restriccion


// Control de rol con sus respectivas vistas
// if (!hasAccess) {
//     return element;
// }
// return element;