import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route exact path ="/" element={<Homepage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
