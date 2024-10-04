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

function NavBarVisibility() {
  const location = useLocation();

  const noNavRoutes = ["/login", "/jefetaller"];

  return !noNavRoutes.includes(location.pathname) ? <Navegacion /> : null;
}

function App() {
  return (
    <BrowserRouter>
      <NavBarVisibility />
      <Routes>
        <Route  path="/inicio" element={<VistaPrincipal />} />
        <Route  path="/login" element={<JefeTaller />} />
        <Route  path="/agregarservicio" element={<AgregarServicio />} />
        <Route  path="/buscarservicio/" element={<BuscarServicio />} />
        <Route  path="/" element={<ListadoServicios />} />
        <Route  path="/editar/:id" element={<EditarServicio />} />
        <Route  path="/ordenservicio/" element={<ListadoOrden />} />
        <Route  path="/agregarorden/" element={<AgregarOrden />} />
        <Route  path="/buscarorden/" element={<BuscarOrden />} />
        <Route  path="/jefetaller/" element={<JefeTaller />} />
        <Route  path="/listachequeo/" element={<ListadoChequeo />} />
        <Route  path="/listadocliente/" element={<ListadoCliente />} />
        <Route  path="/agregarCliente/" element={<AgregarCliente />} />
        <Route  path="/buscarCliente/" element={<BuscarCliente />} />
        <Route  path="/listadovehiculo" element={<ListadoVehiculo />} />
        <Route  path="/agregarvehiculo" element={<AgregarVehiculo />} />
        <Route  path="/buscarvehiculo" element={<BuscarVehiculo />} />
        <Route  path="/EditarCliente/:id" element={<EditarCliente />} />
        <Route  path="/ejecucionServicio/" element={<EjecucionServicio />} />
        <Route  path="/modalAgregarEjecucion/" element={<ModalAgregarEjecucion />} />

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
    </BrowserRouter>
  );
}

export default App;
