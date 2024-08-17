import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navegacion from "./plantilla/Navegacion";
import ListadoServicios from "./servicios/ListadoServicios";
import AgregarServicio from "./servicios/AgregarServicio";
import BuscarServicio from "./servicios/BuscarServicio";

function App() {
  return (
    <div className="container">
    <BrowserRouter>
    <Navegacion/>
    <Routes>
      <Route exact path="/" element={<ListadoServicios/>}/>
      <Route exact path="/agregar" element={<AgregarServicio/>}/>
      <Route exact path="/buscar" element={<BuscarServicio/>}/>
    </Routes>
    </BrowserRouter>
    </div>
   

  );
}

export default App;
