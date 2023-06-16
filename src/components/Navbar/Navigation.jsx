// import React from 'react'
// import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';  
// function Navigation() {  
//   return (  
  //     <>  
//       <Navbar style={{height:"60px"}} className='font-Inter bg-[#0F2A36]' collapseOnSelect expand="lg" fixed="top">  
//         <Container>  
//           <Navbar.Brand style={{fontSize:"24px"}} className='text-white font-semibold' href="/">BeCommunity</Navbar.Brand>  
//           <Navbar.Toggle style={{backgroundColor:"white"}} aria-controls="responsive-navbar-nav" />  
//           <Navbar.Collapse  id="responsive-navbar-nav">  
//             <Nav className="me-auto">  
//               {/* <Nav.Link className='text-white' href="#features">Link 1</Nav.Link>  
//               <Nav.Link className='text-white' href="#pricing">Link 2</Nav.Link>    */}
//             </Nav>  
//             <Nav className='bg-[#0F2A36] p-2 m-2'>  
//               <Nav.Link className='text-white px-4 hover:underline' href="#blog">Blog</Nav.Link>  
//               <Nav.Link className='text-white px-4 hover:underline' href="#contact">  
//                 Contact
//               </Nav.Link>  
//               <Nav.Link className='text-white px-4 hover:underline' href="#about">  
//                 About
//               </Nav.Link>  
//               <Nav.Link className='bg-white hover:bg-[#edecec] rounded-full py-2 w-24 px-2 text-center mx-2' href="/login">  
//                 <div className='font-bold text-[#050522] hover: text-[#0a0a40]'>Login</div>
//               </Nav.Link> 
//             </Nav>  
//           </Navbar.Collapse>  
//         </Container>  
//       </Navbar>  
//     </>  
//   );  
// }  
// export default Navigation;



import { React, useState } from "react";
import "./Navbar.css"

export default function Navigation() {

  let [open, setOpen] = useState(false);
  const [loginState, setLoginState] = useState(false);

  return (
    <header id="navbar" className="relative z-10 bg-[#0F2A36] shadow-xl w-full sticky top-0 left-0">
      <nav className="container md:flex items-center flex-row w-full pt-3 pb-1 md:pl-0 pl-5 md:px-1">
        <div className='w-1/4 font-bold text-2xl cursor-pointer flex text-left items-center pb-3'>
          <a className="flex flex-row no-underline" href="/">
            <span className="text-white font-sans">BeCommunity</span>
          </a>
        </div>

        <div onClick={() => setOpen(!open)} className='text-3xl absolute right-9 top-3 cursor-pointer md:hidden'>
          <i className={open ? 'fa fa-close text-white' : 'fa-solid fa-bars text-white'}></i>
        </div>

        <div className="w-3/4 flex flex-row items-center ml-44">
          <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[1] left-0 w-full md:w-auto md:pl-0 transition-all duration-500 ease-in ${open ? 'top-14 bg-[#0F2A36]' : 'top-[-490px]'}`}>
            <li className='md:ml-10 ml-4 md:my-0 my-7'>
              <a href="#" className={`transition delay-40 text-white no-underline font-medium font-poppins border-b-2 border-transparent tracking-wider text-lg hover:text-green-500 hover:border-white duration-200`}>
                Home
              </a>
            </li>
            <li className='md:ml-10 ml-4 md:my-0 my-7'>
              <a href="#about" className={`transition delay-40 text-white no-underline font-medium font-poppins border-b-2 border-transparent tracking-wider text-lg hover:text-green-500 hover:border-white duration-200`}>
                About
              </a>
            </li>
            <li className='md:ml-10 ml-4 md:my-0 my-7'>
              <a href="#features" className={`transition delay-40 text-white no-underline font-medium font-poppins border-b-2 border-transparent tracking-wider text-lg hover:text-green-500 hover:border-white duration-200`}>
                Features
              </a>
            </li>
            <li className='md:ml-10 ml-4 md:my-0 my-7'>
              <a href="#contact" className={`transition delay-40 text-white no-underline font-medium font-poppins border-b-2 border-transparent tracking-wider text-lg hover:text-green-500 hover:border-white duration-200`}>
                Contact Us
              </a>
            </li>
            <div className="ml-3 absolute md:right-14 flex flex-row">
              {loginState ?
                <div className="w-fit h-fit flex flex-row items-center justify-end">
                  <div onClick={() => setDrop(!drop)} ref={dropRef} className="flex flex-row items-center justify-center mx-1 cursor-pointer">
                    <button className="relative rounded-full w-fit h-fit object-cover mx-1">
                      {userData.img == "userImage" ? <img src="/assets/profile2.jpg" className="w-10 h-10 rounded-full" alt="userimg" /> : <img src={imagePath} className="w-10 h-10 rounded-full" alt="userimg" />}
                      {drop && <Dropdown />}
                    </button>
                    <div className="font-title font-bold text-xl border-b-2 border-gray-100 mx-1 cursor-default">{userData.username}</div>
                    <i className="fa fa-caret-down"></i>
                  </div>
                </div>
                :
                <div className="w-fit h-fit md:ml-0 bg-green-500 rounded-lg p-2 px-3 hover:bg-green-600">
                  <a href="/signin" className={`transition delay-40 font-bold no-underline font-sans text-xl text-white border-b-2 border-transparent duration-200`}>
                    Sign Up
                  </a>
                </div>
              }
            </div>
          </ul>
        </div>
      </nav>
    </header >
  )
}