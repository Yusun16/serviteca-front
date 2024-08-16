import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navegacion from "./plantilla/Navegacion";
import ListadoServicios from "./servicios/ListadoServicios";

function App() {
  return (
    <div className="container">
    <BrowserRouter>
    <Navegacion/>
    <Routes>
      <Route exact path="/" element={<ListadoServicios/>}/>
    </Routes>
    </BrowserRouter>
    </div>
   

  );
}

export default App;
