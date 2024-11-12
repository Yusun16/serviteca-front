import React from "react";
import RouteServiteca from "./RouteServiteca/RouteServiteca";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <RouteServiteca />
    </BrowserRouter>
  );
}

export default App;
