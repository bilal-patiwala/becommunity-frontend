import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"
import Homeimage from "../../assets/undraw_community_re_cyrm.svg";
import { BiRightArrowAlt } from 'react-icons/bi';
function Home() {
  return (
    <div
    id="home"
      style={{ marginTop: "0px", paddingBottom:"60px" }}
      className="bg-[#0F2A36]"
    >
      <div className="flex justify-around">
        <div className="text-left leading-relaxed homepageBox title-div">
          <div className="font-Inter text-white text-4xl font-semibold">Be<span className="text-white">Community</span> </div>
          <div className="mt-4 text-[#DEDCDC] font-Inter text-xl">
          <span className="font-bold text-[#00FF84]">A Place to Connect. </span>
            Create and join communities according to your interests. Making Communication and communities easier 
          </div>
          <Link to="/signin" className="joining-btn">
          <div className="text-black font-Inter font-medium text-md text-center rounded-full bg-[#fff] hover:bg-[#edecec] join-btn-div">
           <span className="btn-text">Join BeCommunity</span> <span className="btn-icon">  <BiRightArrowAlt className="arrow-icon" /> </span>
          </div>
          </Link>
        </div>
        <div className="image-div homepageBox">
          <img src={Homeimage} alt="" className="home-img"/>
        </div>
      </div>
    </div>
  );
}

export default Home;
