import React, {useState} from 'react'
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem,NavLink} from 'reactstrap'
import "./Main.css"
import Cookies from "universal-cookie";
const cookies = new Cookies();

function NavbarComponent(props) {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  const userName=cookies.get("USER");
  return (
    <div className=''>
      <Navbar color='inherit' light expand="md" className="col-12 navtext">
        <NavbarBrand className="col-md-3 col-sm-6">Get A Team</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar className='col-md-9 text-center'>
          <NavItem className="col-md-2">
              <NavLink href="home">HOME</NavLink>             
            </NavItem>          
            <NavItem className="col-md-2">
            <NavLink href="login">{userName?<div>{userName}</div>:<div>LOGIN</div>}</NavLink>              
            </NavItem>          
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default NavbarComponent