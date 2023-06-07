import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcomepage from "./pages/WelcomePage/Welcomepage";
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route exact path ="/" element={<Welcomepage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
