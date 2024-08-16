import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navegacion from "./plantilla/Navegacion";
import ListadoServicios from "./servicios/ListadoServicios";
import AutoPartes from "./autopartes/AutoPartes";

function App() {
  return (
    <div className="container">
    <BrowserRouter>
    <Navegacion/>
    <Routes>
      <Route exact path="/" element={<ListadoServicios/>}/>
      <Route exact path="/autopartes" element={<AutoPartes/>}/>
    </Routes>
    </BrowserRouter>
    </div>
   

  );
}

export default App;
