import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import Navegacion from "../plantilla/Navegacion";
import ListadoServicios from "../servicios/ListadoServicios";
import AgregarServicio from "../servicios/AgregarServicio";
import BuscarServicio from "../servicios/BuscarServicio";
import VistaPrincipal from "../servicios/VistaPrincipal";
import EditarServicio from "../servicios/EditarServicio";
import ListadoOrden from "../Orden Servicio/ListadoOrden";
import AgregarOrden from "../Orden Servicio/AgregarOrden";
import BuscarOrden from "../Orden Servicio/BuscarOrden";
import JefeTaller from "../logins/LoginForm";
import ListaChequeo from "../ListaChequeo/ListaChequeo";
import ListadoCliente from "../Registrar/listadoCliente";
import AgregarCliente from "../Registrar/agregarCliente";
import BuscarCliente from "../Registrar/buscarCliente";
import ListadoVehiculo from "../Registrar/listadoVehiculo";
import EditarVehiculo from "../Registrar/EditarVehiculo";
import AgregarVehiculo from "../Registrar/agregarVehiculo";
import BuscarVehiculo from "../Registrar/buscarVehiculo";
import EjecucionServicio from "../Orden Servicio/ejecucionServicio";
import IniAutPar from "../autopartes/IniAutPar";
import AutoPartes from "../autopartes/AutoPartes";
import BuscarAutPar from "../autopartes/BuscarAutPar";
import ModalEdit from "../autopartes/ModalEdit";
import InfoAutoPartes from "../Informes/InfoAutoPartes";
import InfoLiquidacionOperarios from "../Informes/InfoLiquidacionOperarios";
import InfoServicios from "../Informes/InfoServicios";
import IniOperarios from "../Operarios/IniOperarios";
import Operarios from "../Operarios/Operarios";
import BuscarOperarios from "../Operarios/BuscarOperarios";
import ModalEditOpe from "../Operarios/ModalEditOpe";
import ListadoChequeo from "../Orden Servicio/ListadoChequeo";
import EditarCliente from '../Registrar/EditarCliente';
import ModalAgregarEjecucion from "../Orden Servicio/modalAgregarEjecucion";
import Restriccion from './Restriccion';
import ResetPassword from '../logins/ResetPassword';
import ConfirmEmail from '../logins/ConfirmEmail';
import NewPassword from '../logins/NewPassword';
import RegisterUsuario from '../logins/RegisterUsuario';
import AdminLoginForm from '../logins/AdminLoginForm';

// Este es el nuevo componente para manejar la visibilidad del nav
function NavBarVisibility() {
    const location = useLocation();

    // Definimos las rutas donde no queremos que se muestre el nav
    const noNavRoutes = ["/", "/recuperar-contrasena", "/verificar-correo", "/renovar-contrasena", "/serviteca-admin-authenticate"];

    // Verificamos si la ruta actual está en noNavRoutes o si es una ruta de renovar contraseña
    const isRenovarContrasenaRoute = location.pathname.startsWith("/renovar-contrasena/");

    // Renderizamos el componente Navegacion solo si la ruta actual no está en noNavRoutes
    return !noNavRoutes.includes(location.pathname) && !isRenovarContrasenaRoute ? <Navegacion /> : null;
}

function RouteServiteca() {
    return (
        <div>
            {/* Usamos el nuevo componente dentro del BrowserRouter */}
            <NavBarVisibility />
            <Routes>
                {/* Rutas de Sesión - Inicio-Rol - Recuperación */}
                <Route exact path="/vista-principal" element={<VistaPrincipal />} />
                <Route exact path="/" element={<JefeTaller />} />
                <Route exact path="/serviteca-admin-authenticate" element={<AdminLoginForm />} />
                <Route exact path="/serviteca-admin-register" element={<Restriccion element={<RegisterUsuario />} allowedRoles={['ROLE_ADMIN']} />} />
                <Route exact path="/recuperar-contrasena" element={<ResetPassword />} />
                <Route exact path="/verificar-correo" element={<ConfirmEmail />} />
                <Route exact path="/renovar-contrasena/:otp/:username" element={<NewPassword />} />
                {/* Rutas de Servicios - Manuel */}
                <Route exact path="/listadoservicio" element={<Restriccion element={<ListadoServicios />} allowedRoles={['ROLE_INVENTARIO']} />} />
                <Route exact path="/agregarservicio" element={<Restriccion element={<AgregarServicio />} allowedRoles={['ROLE_INVENTARIO']} />} />
                <Route exact path="/buscarservicio/" element={<Restriccion element={<BuscarServicio />} allowedRoles={['ROLE_INVENTARIO']} />} />
                <Route exact path="/editar/:id" element={<Restriccion element={<EditarServicio />} allowedRoles={['ROLE_INVENTARIO']} />} />
                {/* Rutas de Ordenes de Servicios - Manuel y Yusun */}
                <Route exact path="/agregarorden/" element={<Restriccion element={<AgregarOrden />} allowedRoles={['ROLE_TALLER']} />} />
                <Route exact path="/ordenservicio/" element={<Restriccion element={<ListadoOrden />} allowedRoles={['ROLE_TALLER']} />} />
                <Route exact path="/buscarorden/" element={<Restriccion element={<BuscarOrden />} allowedRoles={['ROLE_TALLER']} />} />
                <Route exact path="/ejecucionServicio/" element={<Restriccion element={<EjecucionServicio />} allowedRoles={['ROLE_TALLER']} />} />
                <Route exact path="/modalAgregarEjecucion/" element={<Restriccion element={<ModalAgregarEjecucion />} allowedRoles={['ROLE_TALLER']} />} />
                {/* Rutas de Lista de Chequeo - Yusun */}
                <Route exact path="/listachequeo/" element={<Restriccion element={<ListadoChequeo />} allowedRoles={['ROLE_TALLER']} />} />
                <Route path="/chequeo" element={<Restriccion element={<ListaChequeo />} allowedRoles={['ROLE_TALLER']} />} />
                {/* Rutas de Clientes - Manuel */}
                <Route exact path="/listadocliente/" element={<Restriccion element={<ListadoCliente />} allowedRoles={['ROLE_TALLER']} />} />
                <Route exact path="/agregarCliente/" element={<Restriccion element={<AgregarCliente />} allowedRoles={['ROLE_TALLER']} />} />
                <Route exact path="/buscarCliente/" element={<Restriccion element={<BuscarCliente />} allowedRoles={['ROLE_TALLER']} />} />
                <Route exact path="/EditarCliente/:id" element={<Restriccion element={<EditarCliente />} allowedRoles={['ROLE_TALLER']} />} />
                {/* Rutas de Vehiculos - Manuel */}
                <Route exact path="/listadovehiculo" element={<Restriccion element={<ListadoVehiculo />} allowedRoles={['ROLE_TALLER']} />} />
                <Route exact path="/agregarvehiculo" element={<Restriccion element={<AgregarVehiculo />} allowedRoles={['ROLE_TALLER']} />} />
                <Route exact path="/buscarvehiculo" element={<Restriccion element={<BuscarVehiculo />} allowedRoles={['ROLE_TALLER']} />} />
                <Route exact path="/EditarVehiculo/:id" element={<Restriccion element={<EditarVehiculo />} allowedRoles={['ROLE_TALLER']} />} />

                {/* Rutas de Jefer */}
                <Route path="/auto-partes" element={<Restriccion element={<IniAutPar />} allowedRoles={['ROLE_ASISTENTE']} />} />
                <Route path="/agregar-auto-partes" element={<Restriccion element={<AutoPartes />} allowedRoles={['ROLE_ASISTENTE']} />} />
                <Route path="/buscar-auto-partes" element={<Restriccion element={<BuscarAutPar />} allowedRoles={['ROLE_ASISTENTE']} />} />
                <Route path="/editar-auto-partes/:id" element={<Restriccion element={<ModalEdit />} allowedRoles={['ROLE_ASISTENTE']} />} />
                <Route path="/operarios" element={<Restriccion element={<IniOperarios />} allowedRoles={['ROLE_TALLER']} />} />
                <Route path="/agregar-operarios" element={<Restriccion element={<Operarios />} allowedRoles={['ROLE_TALLER']} />} />
                <Route path="/buscar-operarios" element={<Restriccion element={<BuscarOperarios />} allowedRoles={['ROLE_TALLER']} />} />
                <Route path="/editar-operarios/:id" element={<Restriccion element={<ModalEditOpe />} allowedRoles={['ROLE_TALLER']} />} />
                <Route path="/informe-auto-partes" element={<Restriccion element={<InfoAutoPartes />} allowedRoles={['ROLE_TALLER']} />} />
                <Route path="/informe-liquidacion-operarios" element={<Restriccion element={<InfoLiquidacionOperarios />} allowedRoles={['ROLE_TALLER']} />} />
                <Route path="/informe-servicios" element={<Restriccion element={<InfoServicios />} allowedRoles={['ROLE_TALLER']} />} />
                {/* Rutas fin de Jefer */}
            </Routes>
        </div>
    )
}

export default RouteServiteca