import React, {useState} from 'react'
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem,NavLink} from 'reactstrap'
import "./Main.css"
import Cookies from "universal-cookie";
const cookies = new Cookies();

function NavbarComponent(props) {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  const userName=cookies.get("USER");
  const logout = ()=>{
    cookies.remove("USER");
    console.log("logging out");
  }
  return (
    <>
    <div>
      <Navbar color='inherit' dark expand="md" className="col-12 ">
        <NavbarBrand className="col-md-3 col-sm-6 col-xs-8 fw-bold">
          <i className="fa fa-users fa-lg p-3"></i>
          Get A Team
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar className='col-md-12 d-flex justify-content-end'>
            <NavItem className="col-md-3 d-flex justify-content-center">
              <NavLink href="/"><i className='fa fa-home fa-lg p-2'></i> Home</NavLink>             
            </NavItem>          
            <NavItem className="col-md-3 d-flex justify-content-center">
            <NavLink href="/login">{userName?<div className='text-capitalize'><i className='fa fa-user fa-lg p-2'></i> {userName}</div>:<div><i className='fa fa-sign-in fa-lg p-2'></i> Login </div>}
            </NavLink>              
            </NavItem>
            <NavItem className="col-md-3 d-flex justify-content-center">
              <NavLink onClick={(e)=>{logout()}}><i className='fa fa-sign-out fa-lg p-2'></i>Logout</NavLink>             
            </NavItem>          
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    </>
  )
}

export default NavbarComponent