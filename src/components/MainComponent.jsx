import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Routes, useParams} from 'react-router-dom'
import NavbarComponent from './NavbarComponent'
import HomeComponent from './HomeComponent'
import LoginComponent from './LoginComponent'
import ApplsComponent from './ApplsComponent'
import axios from "axios";

function MainComponent() {
  const [compe, setCompe] = useState([]);
  const [appls,setAppls] = useState([]);
  useEffect(() => {
    let endpoints = ['http://localhost:3000/compe', 'http://localhost:3000/appls']
    Promise.all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then(([{data:compe}, {data: appls}]) => {
        setCompe(compe)
        setAppls(appls)
      })
      .catch((error) => {
        error = new Error();
        setCompe(error);
        setAppls(error);
      });
  });
  const CompeWithId = () => {
    let params = useParams();
    return(
      <ApplsComponent appls={appls.filter((c) => c.compe===params.compeid)}/>
    )
  }
  return (
    <BrowserRouter>
      <NavbarComponent/>
        <Routes>
          <Route index element={<HomeComponent compe={compe} />} />
          <Route path="/home" element={<HomeComponent compe={compe} />} />                         
          <Route path="/login" element={<LoginComponent />} />                
          <Route path="/appls/:compeid" element={<CompeWithId />} />               
        </Routes>
    </BrowserRouter>
  )
}

export default MainComponent