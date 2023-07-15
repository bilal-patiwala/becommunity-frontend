import React, { useContext, useEffect, useState } from "react";
import "./UserProfile.css";
import AuthContext from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
function UserProfile() {
  const [userData, setUserData] = useState([]);
  const Navigate = useNavigate();
  const [updatedFile, setUpdatedFile] = useState(null);
  const [newDOB, setNewDOB] = useState("");
  const [newBio, setNewBio] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [updatedImg, setUpdatedImg] = useState(null);
  let { authToken } = useContext(AuthContext);
  useEffect(() => {
    get_user_data();
  }, []);
  const userInfo = { newDOB, newBio };
  const get_user_data = async () => {
    let response = await fetch("http://127.0.0.1:8000/get_user_profile/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken.refresh}`,
      },
    });
    let data = await response.json();
    console.log(data);
    setUserData(data);
    setNewBio(data.bio);
  };

  const handleImageUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setUpdatedFile(file);
    setUpdatedImg(URL.createObjectURL(file));
  };

  const handleDOBChange = (event) => {
    event.preventDefault();
    const newDOB = event.target.value;
    setNewDOB(newDOB);
  };

  const handleBioChange = (event) => {
    // event.preventDefault();
    const updatedBio = event.target.value;
    setNewBio(updatedBio);
  };

  const handleRecoveryEmail = (event) => {
    event.preventDefault();
    const recoveryEmail = event.target.value;
    setRecoveryEmail(recoveryEmail);
  };

  const handleEditProfile = async (event) => {
    event.preventDefault();
    let formdata = new FormData();
    formdata.append("image", updatedFile);
    formdata.append("dob", userInfo.newDOB);
    formdata.append("bio", userInfo.newBio);

    for (let [key, value] of formdata.entries()) {
      console.log(value);
    }

    let response = await fetch("http://127.0.0.1:8000/edit_profile/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken.refresh}`,
      },
      body:formdata,
    });
    let data = await response.json()
    console.log(data);
    Navigate("/MyProfile")
  };

  return (
    <div className="bg-[#0F2A36]">
      <div className="font-Inter text-white p-4 text-2xl font-medium">
        Edit your Profile
      </div>
      <div className="px-4">
        {updatedImg ? (
          <img height="400px" width="400px" src={updatedImg} alt="" />
        ) : (
          <img
            height="400px"
            width="400px"
            src={`data:image/jpeg;base64,${userData.image}`}
            alt=""
          />
        )}

        <form>
          <input type="file" onChange={handleImageUpload} />
          <br />
          <input
            type="date"
            value={newDOB ? newDOB : userData.dob}
            onChange={handleDOBChange}
          />
          <br />
          <input type="text" value={newBio} onChange={handleBioChange} />
          <br />

          <br />
          <input type="email" onChange={handleRecoveryEmail} />
          <button type="submit" onClick={handleEditProfile}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
