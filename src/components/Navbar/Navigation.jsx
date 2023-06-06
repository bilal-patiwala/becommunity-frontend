import React from 'react'
import "./Navbar.css"
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';  
function Navigation() {  
  return (  
    <>  
      <Navbar style={{height:"60px"}} className='font-Inter bg-[#14142E]' collapseOnSelect expand="lg" fixed="top">  
        <Container>  
          <Navbar.Brand style={{fontSize:"24px"}} className='text-white font-semibold' href="#home">BeCommunity</Navbar.Brand>  
          <Navbar.Toggle style={{backgroundColor:"white"}} aria-controls="responsive-navbar-nav" />  
          <Navbar.Collapse  id="responsive-navbar-nav">  
            <Nav className="me-auto">  
              {/* <Nav.Link className='text-white' href="#features">Link 1</Nav.Link>  
              <Nav.Link className='text-white' href="#pricing">Link 2</Nav.Link>    */}
            </Nav>  
            <Nav className='bg-[#14142E] p-2 m-2'>  
              <Nav.Link className='text-white px-4' href="#blog">Blog</Nav.Link>  
              <Nav.Link className='text-white px-4' href="#contact">  
                Contact
              </Nav.Link>  
              <Nav.Link className='text-white px-4' href="#about">  
                About
              </Nav.Link>  
              <Nav.Link className='bg-white rounded-full py-2 w-24 px-2 text-center mx-2' href="#login">  
                <div className='font-bold text-[#050522] hover: text-[#0a0a40]'>Login</div>
              </Nav.Link> 
            </Nav>  
          </Navbar.Collapse>  
        </Container>  
      </Navbar>  
    </>  
  );  
}  
export default Navigation;