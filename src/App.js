import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navegacion from "./plantilla/Navegacion";
import ListadoServicios from "./servicios/ListadoServicios";
import AgregarServicio from "./servicios/AgregarServicio";
import BuscarServicio from "./servicios/BuscarServicio";
import EditarServicio from "./servicios/EditarServicio";

function App() {
  return (
    
    <BrowserRouter>
    <Navegacion/>
    <Routes>
      <Route exact path="/" element={<ListadoServicios/>}/>
      <Route exact path="/agregar" element={<AgregarServicio/>}/>
      <Route exact path="/buscar/" element={<BuscarServicio/>}/>
      <Route exact path="/editar/:id" element={<EditarServicio/>}/>
    </Routes>
    </BrowserRouter>
    
   

  );
}

export default App;
