import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Routes, useParams} from 'react-router-dom'
import NavbarComponent from './NavbarComponent'
import HomeComponent from './HomeComponent'
import LoginComponent from './LoginComponent'
import ApplsComponent from './ApplsComponent'
import Footer from './FooterComponent'
import { Baseurl } from './Baseurl'
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");

function MainComponent() {
  const [compe, setCompe] = useState([]);
  const [appls,setAppls] = useState([]);
  useEffect(() => {
    let endpoints = [`https://${Baseurl}/compe`, `https://${Baseurl}/appls`]
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
  }, [] );
  const updateAppl = (e, a, value) => {
    const configuration = {
      headers: { Authorization: `bearer ${token}` },
      method: "put",
      url: `https://${Baseurl}/appls/${a}`,
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
  
  const CompeWithId = (props) => {
    let params = useParams();
    const hideCompe = (c) => {
      const configuration = {
        headers: { Authorization: `bearer ${token}` },
        method: "put",
        url: `https://${Baseurl}/compe/${c}`,
        data: {
          "show": false,
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
    };
    return(
      <ApplsComponent compe={compe.filter((c)=> c._id===params.compeid)} appls={appls.filter((c) => c.compe===params.compeid)} updateAppl={updateAppl} hideCompe={hideCompe} />
    )
  }
  return (
    <BrowserRouter>
      <NavbarComponent/>
        <Routes>
          <Route index element={<HomeComponent compe={compe.filter((c)=> c.show===true)} appls={appls}/>} />                       
          <Route path="/login" element={<LoginComponent />} />                
          <Route path="/appls/:compeid" element={<CompeWithId compe={compe}/>} />               
        </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default MainComponent