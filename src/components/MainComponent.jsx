import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavbarComponent from './NavbarComponent'
import HomeComponent from './HomeComponent'
import LoginComponent from './LoginComponent'
import ProtectedRoutes from "./ProtectedRoutes";
//import FreeComponent from './FreeComponent'
//import AuthComponent from './AuthComponent'

function MainComponent() {
  return (
    <BrowserRouter>
      <NavbarComponent/>
        <Routes>
          <Route index element={<HomeComponent />} />
          <Route path="/home" element={<HomeComponent />} />                         
          <Route path="/login" element={<LoginComponent />} /> 
          {/*<Route path="/free" element={<FreeComponent/>} />
          <Route path='/auth' element={<ProtectedRoutes />}>
            <Route path="/auth" element={<AuthComponent/>}/>
          </Route>  */}                  
        </Routes>
    </BrowserRouter>
  )
}

export default MainComponent