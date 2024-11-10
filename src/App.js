<<<<<<< HEAD
import React from "react";
import RouteServiteca from "./RouteServiteca/RouteServiteca";
import { BrowserRouter } from "react-router-dom";
=======
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navegacion from "./plantilla/Navegacion";
import ListadoServicios from "./servicios/ListadoServicios";
import AgregarServicio from "./servicios/AgregarServicio";
import BuscarServicio from "./servicios/BuscarServicio";
import VistaPrincipal from "./servicios/vistaPrincipal";
import EditarServicio from "./servicios/EditarServicio";
import ListadoOrden from "./Orden Servicio/ListadoOrden";
import AgregarOrden from "./Orden Servicio/AgregarOrden";
import BuscarOrden from "./Orden Servicio/BuscarOrden";
import JefeTaller from "./logins/JefeTaller";
import ListaChequeo from "./ListaChequeo/ListaChequeo";
import ListadoCliente from "./Registrar/listadoCliente";
import AgregarCliente from "./Registrar/agregarCliente";
import BuscarCliente from "./Registrar/buscarCliente";
import ListadoVehiculo from "./Registrar/listadoVehiculo";
import AgregarVehiculo from "./Registrar/agregarVehiculo";
import BuscarVehiculo from "./Registrar/buscarVehiculo";
import EjecucionServicio from "./Orden Servicio/ejecucionServicio";
import IniAutPar from "./autopartes/IniAutPar";
import AutoPartes from "./autopartes/AutoPartes";
import BuscarAutPar from "./autopartes/BuscarAutPar";
import ModalEdit from "./autopartes/ModalEdit";
import InfoAutoPartes from "./Informes/InfoAutoPartes";
import InfoLiquidacionOperarios from "./Informes/InfoLiquidacionOperarios";
import InfoServicios from "./Informes/InfoServicios";
import IniOperarios from "./Operarios/IniOperarios";
import Operarios from "./Operarios/Operarios";
import BuscarOperarios from "./Operarios/BuscarOperarios";
import ModalEditOpe from "./Operarios/ModalEditOpe";
import ListadoChequeo from "./Orden Servicio/ListadoChequeo";
import EditarCliente from './Registrar/EditarCliente';
import ModalAgregarEjecucion from "./Orden Servicio/modalAgregarEjecucion";
import EditarVehiculo from "./Registrar/EditarVehiculo";



function NavBarVisibility() {
  const location = useLocation();

  const noNavRoutes = ["/login", "/jefetaller"];

  return !noNavRoutes.includes(location.pathname) ? <Navegacion /> : null;
}
>>>>>>> 8c370155bc306cd35a732fc3d62a7a42feb13b54

function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <RouteServiteca />
=======
      <NavBarVisibility />
      <Routes>
        <Route exact path="/inicio" element={<VistaPrincipal />} />
        <Route exact path="/login" element={<JefeTaller />} />
        <Route exact path="/agregarservicio" element={<AgregarServicio />} />
        <Route exact path="/buscarservicio/" element={<BuscarServicio />} />
        <Route exact path="/" element={<ListadoServicios />} />
        <Route exact path="/editar/:id" element={<EditarServicio />} />
        <Route exact path="/ordenservicio/" element={<ListadoOrden />} />
        <Route exact path="/agregarorden/" element={<AgregarOrden />} />
        <Route exact path="/buscarorden/" element={<BuscarOrden />} />
        <Route exact path="/jefetaller/" element={<JefeTaller />} />
        <Route exact path="/listachequeo/" element={<ListadoChequeo />} />
        <Route exact path="/listadocliente/" element={<ListadoCliente />} />
        <Route exact path="/agregarCliente/" element={<AgregarCliente />} />
        <Route exact path="/buscarCliente/" element={<BuscarCliente />} />
        <Route exact path="/listadovehiculo" element={<ListadoVehiculo />} />
        <Route exact path="/agregarvehiculo" element={<AgregarVehiculo />} />
        <Route exact path="/buscarvehiculo" element={<BuscarVehiculo />} />
        <Route exact path="/EditarCliente/:id" element={<EditarCliente />} />
        <Route exact path="/ejecucionServicio/" element={<EjecucionServicio />} />
        <Route exact path="/modalAgregarEjecucion/" element={<ModalAgregarEjecucion />} />
        <Route exact path="/EditarVehiculo/:id" element={<EditarVehiculo />} />


        {/* Rutas de Jefer */}
        <Route path="/auto-partes" element={<IniAutPar />} />
        <Route path="/agregar-auto-partes" element={<AutoPartes />} />
        <Route path="/buscar-auto-partes" element={<BuscarAutPar />} />
        <Route path="/editar-auto-partes/:id" element={<ModalEdit />} />
        <Route path="/operarios" element={<IniOperarios />} />
        <Route path="/agregar-operarios" element={<Operarios />} />
        <Route path="/buscar-operarios" element={<BuscarOperarios />} />
        <Route path="/editar-operarios/:id" element={<ModalEditOpe />} />
        <Route path="/informe-auto-partes" element={<InfoAutoPartes />} />
        <Route path="/informe-liquidacion-operarios" element={<InfoLiquidacionOperarios />} />
        <Route path="/informe-servicios" element={<InfoServicios />} />
        <Route path="/chequeo" element={<ListaChequeo />} />

        {/* Rutas fin de Jefer */}
      </Routes>
>>>>>>> 8c370155bc306cd35a732fc3d62a7a42feb13b54
    </BrowserRouter>
  );
}

export default App;
