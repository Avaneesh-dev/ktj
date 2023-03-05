import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Routes, useParams} from 'react-router-dom'
import NavbarComponent from './NavbarComponent'
import HomeComponent from './HomeComponent'
import LoginComponent from './LoginComponent'
import ApplsComponent from './ApplsComponent'
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");


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
  }, []);
  const updateAppl = (e, a, value) => {
    const configuration = {
      headers: { Authorization: `bearer ${token}` },
      method: "put",
      url: `http://localhost:3000/appls/${a}`,
      data: {
        "status": value,
      },
    };
    axios(configuration)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        error = new Error();
        console.log(error);
      });
    // prevent the form from refreshing the whole page
    e.preventDefault();
  };
  const CompeWithId = () => {
    let params = useParams();
    return(
      <ApplsComponent appls={appls.filter((c) => c.compe===params.compeid)} updateAppl={updateAppl}/>
    )
  }
  return (
    <BrowserRouter>
      <NavbarComponent/>
        <Routes>
          <Route index element={<HomeComponent compe={compe} />} />
          <Route path="/home" element={<HomeComponent compe={compe} appls={appls}/>} />                         
          <Route path="/login" element={<LoginComponent />} />                
          <Route path="/appls/:compeid" element={<CompeWithId />} />               
        </Routes>
    </BrowserRouter>
  )
}

export default MainComponent