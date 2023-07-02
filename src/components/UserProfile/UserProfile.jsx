import React, { useContext, useEffect, useState } from 'react'
import "./UserProfile.css";
import AuthContext from '../../context/AuthContext';
function UserProfile() {
    const [userData, setUserData] = useState([]);
    let {authToken} = useContext(AuthContext);

    useEffect(()=>{
        get_user_data();
    },[])
    const get_user_data = async()=>{
        let response  = await fetch("http://127.0.0.1:8000/get_user_profile/",{
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken.refresh}`,
            },
        });
        let data = await response.json();
        console.log(data);
        setUserData(data); 
    }

  return (
    <div className='bg-[#0F2A36] h-screen'>
        <div className='font-Inter text-white p-4 text-2xl font-medium'>Edit your Profile</div>
        <div className='px-4'>
            <img height="400px" width="400px" src={`data:image/jpeg;base64,${userData.image}`} alt="" />
        </div>
    </div>
  )
}

export default UserProfile