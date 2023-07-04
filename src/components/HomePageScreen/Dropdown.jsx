import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import "./Dropdown.css";

function Dropdown() {

  const Navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      
      localStorage.removeItem('authToken');

      if (localStorage.getItem('authToken') == null) {
        window.location.reload(false);
        Navigate("/");
      }
      else {
        alert("Logout action failed..!! Try again");
      }
    }
    catch (err) {
      console.log(err);
    }

  }

  return (
    <>
      <div className='drop z-50 absolute w-40 h-fit px-1 pb-3 bg-white rounded-lg text-left font-Inter'>
        <div className='font-title text-lg px-3 rounded-lg underline-none font-bold my-2 py-2 hover:bg-gray-300 cursor-pointer'><NavLink to="/" className="no-underline text-black">Home</NavLink></div>
        <div className='font-title text-lg px-3 rounded-lg font-bold my-2 py-2 hover:bg-gray-300 cursor-pointer'><Link to="/MyProfile"  className="no-underline text-black">My Profile</Link></div>
        <div onClick={handleLogout} className='font-title text-xl px-3 rounded-lg font-bold py-2 hover:bg-gray-300 cursor-pointer'>Logout<i className='fas fa-sign-out mx-2 text-md text-gray-500'></i></div>
      </div>
    </>
  )
}

export default Dropdown