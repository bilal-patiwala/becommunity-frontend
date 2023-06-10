import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcomepage from "./pages/WelcomePage/Welcomepage";
import Login from "./pages/Login/Login";
import Signin from "./pages/Signin/Signin";
import Homepage from "./pages/Homepage/Homepage";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./utils/PrivateRoute";
function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route exact path="/" element={<Homepage />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
