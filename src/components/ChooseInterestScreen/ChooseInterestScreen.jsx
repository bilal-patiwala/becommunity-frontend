import React, { useContext, useEffect, useState } from "react";
import "./ChooseInterestScreen.css";
import { Link } from "react-router-dom";
import interest from "./Interest";
import AuthContext from "../../context/AuthContext";
function ChooseInterestScreen() {

    const {authToken} = useContext(AuthContext)

    useEffect(() => {
        fetch("http://127.0.0.1:8000/get_user", {
          method: "GET",
          headers : {
            "Content-Type":"application/json",
            "Authorization": `Bearer ${authToken.access}`
          }
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
      

  const [interestArray, setInterestValue] = useState([]);
  const handleInterestSelect = (value) => {
    if (!interestArray.includes(value)) {
      setInterestValue([...interestArray, value]);
    } else {
      setInterestValue(interestArray.filter((item) => item !== value));
    }
  };
  return (
    <div className="bg-[#0F2A36] h-screen">
      <div
        className="text-black font-Inter font-semibold brand-heading px-12 py-4"
        href="#home"
      >
        <Link to="/" className="text-white no-underline font-Inter">
          BeCommunity
        </Link>
      </div>
      <div className="flex justify-center mt-4">
        <div className="bg-[#0A1C24] w-[80%] rounded-[21px] p-4 font-Inter">
          <div className="text-white text-xl">
            Welcome, Bilal. Please select your interest to get started.
          </div>
          <div className="text-[#C4C4C4] my-4">
            {interestArray.length}/5 selected
          </div>
          <div className="interest-categories flex flex-wrap">
            {interest.map((interest) => (
              <Link
                key={interest.value}
                onClick={() => handleInterestSelect(interest.value)}
                style={{
                  backgroundColor: interestArray.includes(interest.value)
                    ? "black"
                    : "white",
                  color: interestArray.includes(interest.value)
                    ? "white"
                    : "black",
                }}
                className="no-underline p-[8px] m-2 rounded-[10px]"
              >
                {interest.value}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseInterestScreen;
