import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import ListadoVehiculo  from "./Registrar/listadoVehiculo";
import AgregarVehiculo  from "./Registrar/agregarVehiculo";
import BuscarVehiculo  from "./Registrar/buscarVehiculo";
import EjecucionServicio from "./Orden Servicio/ejecucionServicio";
import EditarCliente from "./Registrar/EditarCliente";



function App() {
  return (
    <BrowserRouter>
        <Navegacion/> 
    <Routes>
    <Route exact path="/inicio" element={<VistaPrincipal/> }/>
      <Route exact path="/login" element={<JefeTaller/>}/>
      <Route exact path="/agregarservicio" element={<AgregarServicio/>}/>
      <Route exact path="/buscarservicio/" element={<BuscarServicio/>}/>
      <Route exact path="/" element={<ListadoServicios/>}/>
      <Route exact path="/editar/:id" element={<EditarServicio/>}/>
      <Route exact path="/ordenservicio/" element={<ListadoOrden/>}/>
      <Route exact path="/agregarorden/" element={<AgregarOrden/>}/>
      <Route exact path="/buscarorden/" element={<BuscarOrden/>}/>
      <Route exact path="/jefetaller/" element={<JefeTaller/>}/>
      <Route exact path="/listachequeo/" element={<ListaChequeo/>}/>
      <Route exact path="/listadocliente/" element={<ListadoCliente/>}/>
      <Route exact path="/agregarCliente/" element={<AgregarCliente/>}/>
      <Route exact path="/buscarCliente/" element={<BuscarCliente/>}/>
      <Route exact path="/listadovehiculo" element={<ListadoVehiculo/>}/>
      <Route exact path="/agregarvehiculo" element={<AgregarVehiculo/>}/>
      <Route exact path="/buscarvehiculo" element={<BuscarVehiculo/>}/>
      <Route exact path="/ejecucionservicio" element={<EjecucionServicio/>}/>
      <Route exact path="/editarCliente/:id" element={<EditarCliente/>}/>


    </Routes>
    </BrowserRouter>
    
   

  );
}

export default App;
