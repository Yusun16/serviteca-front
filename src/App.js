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

function App() {
  return (
    <BrowserRouter>
    <Navegacion/>
    <Routes>
    <Route exact path="/inicio" element={<VistaPrincipal/>}/>
      <Route exact path="/" element={<ListadoServicios/>}/>
      <Route exact path="/agregar" element={<AgregarServicio/>}/>
      <Route exact path="/buscar/" element={<BuscarServicio/>}/>
      <Route exact path="/editar/:id" element={<EditarServicio/>}/>
      <Route exact path="/ordenservicio/" element={<ListadoOrden/>}/>
      <Route exact path="/agregarorden/" element={<AgregarOrden/>}/>
      <Route exact path="/buscarorden/" element={<BuscarOrden/>}/>
    </Routes>
    </BrowserRouter>
    
   

  );
}

export default App;
