import React from "react";
import {Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// receives component and any other props represented by ...rest

function ProtectedRoutes() {     
  const token = cookies.get("TOKEN");
  if (token) {
    console.log(token)
    return <Outlet />;
  } else {
    console.log("Not Logged In");
    return(<Navigate to="/login" />)
  }
}

export default ProtectedRoutes