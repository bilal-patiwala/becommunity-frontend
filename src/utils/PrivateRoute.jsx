import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Welcomepage from "../pages/WelcomePage/Welcomepage";

export const PrivateRoute = () => {
  const {user} = useContext(AuthContext);
  return (
    user ? <Outlet/> : <Welcomepage/>
  )
};