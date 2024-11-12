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

// Este es el nuevo componente para manejar la visibilidad del nav
function NavBarVisibility() {
    const location = useLocation();

    // Definimos las rutas donde no queremos que se muestre el nav
    const noNavRoutes = ["/", "/recuperar-contrasena", "/verificar-correo", "/renovar-contrasena"];

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
                <Route exact path="/recuperar-contrasena" element={<ResetPassword />} />
                <Route exact path="/verificar-correo" element={<ConfirmEmail />} />
                <Route exact path="/renovar-contrasena/:otp/:username" element={<NewPassword />} />
                {/* Rutas de Servicios - Manuel */}
                <Route exact path="/listadoservicio" element={<Restriccion element={<ListadoServicios />} allowedRoles={['ROLE_INVENTARIO']} />} />
                <Route exact path="/agregarservicio" element={<AgregarServicio />} />
                <Route exact path="/buscarservicio/" element={<BuscarServicio />} />
                <Route exact path="/editar/:id" element={<EditarServicio />} />
                {/* Rutas de Ordenes de Servicios - Manuel y Yusun */}
                <Route exact path="/agregarorden/" element={<Restriccion element={<AgregarOrden />} allowedRoles={['ROLE_TALLER']} />} />
                <Route exact path="/ordenservicio/" element={<ListadoOrden />} />
                <Route exact path="/buscarorden/" element={<BuscarOrden />} />
                <Route exact path="/ejecucionServicio/" element={<EjecucionServicio />} />
                <Route exact path="/modalAgregarEjecucion/" element={<ModalAgregarEjecucion />} />
                {/* Rutas de Lista de Chequeo - Yusun */}
                <Route exact path="/listachequeo/" element={<ListadoChequeo />} />
                <Route path="/chequeo" element={<ListaChequeo />} />
                {/* Rutas de Clientes - Manuel */}
                <Route exact path="/listadocliente/" element={<Restriccion element={<ListadoCliente />} allowedRoles={['ROLE_TALLER']} />} />
                <Route exact path="/agregarCliente/" element={<AgregarCliente />} />
                <Route exact path="/buscarCliente/" element={<BuscarCliente />} />
                <Route exact path="/EditarCliente/:id" element={<EditarCliente />} />
                {/* Rutas de Vehiculos - Manuel */}
                <Route exact path="/listadovehiculo" element={<ListadoVehiculo />} />
                <Route exact path="/agregarvehiculo" element={<AgregarVehiculo />} />
                <Route exact path="/buscarvehiculo" element={<BuscarVehiculo />} />

                {/* Rutas de Jefer */}
                <Route path="/auto-partes" element={<Restriccion element={<IniAutPar />} allowedRoles={['ROLE_ASISTENTE']} />} />
                <Route path="/agregar-auto-partes" element={<Restriccion element={<AutoPartes />} allowedRoles={['ROLE_ASISTENTE']} />} />
                <Route path="/buscar-auto-partes" element={<BuscarAutPar />} />
                <Route path="/editar-auto-partes/:id" element={<ModalEdit />} />
                <Route path="/operarios" element={<IniOperarios />} />
                <Route path="/agregar-operarios" element={<Operarios />} />
                <Route path="/buscar-operarios" element={<BuscarOperarios />} />
                <Route path="/editar-operarios/:id" element={<ModalEditOpe />} />
                <Route path="/informe-auto-partes" element={<InfoAutoPartes />} />
                <Route path="/informe-liquidacion-operarios" element={<InfoLiquidacionOperarios />} />
                <Route path="/informe-servicios" element={<InfoServicios />} />
                {/* Rutas fin de Jefer */}
            </Routes>
        </div>
    )
}

export default RouteServiteca