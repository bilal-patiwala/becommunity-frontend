import React, { useContext, useEffect, useState } from "react";
import Homeicon from "../../assets/icons8-home.svg";
import Topicon from "../../assets/arrow-up-circle.svg";
import Newicon from "../../assets/coffee.svg";
import communityTestImg from "../../../public/infoImage3.jpg";
import AuthContext from "../../context/AuthContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";

function HomepageSidebar({ open }) {
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [communityLoading, setCommunityLoading] = useState(false);
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    get_joined_communities();
  }, []);
  const get_joined_communities = async () => {
    setCommunityLoading(true);
    let response = await fetch(
      "http://127.0.0.1:8000/get_user_joined_community/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken.refresh}`,
        },
      }
    );
    let data = await response.json();
    console.log("communities joined", data);
    setJoinedCommunities(data);
    setCommunityLoading(false);
  };

  const handleCommunityClick = (id) => {
    localStorage.setItem('communityId', id);
    navigate(`/community/${id}`, { state: { id} });
    console.log(id);
  };
  return (
    <>
      <div
        style={{
          width: open ? "240px" : "86px",
          transition: "width 0.15s ease-in-out",
        }}
        className="w-1/5 font-Inter h-screen flex flex-col items-center shadow-xl z-10 p-2 bg-[#0B222C] left-0 top-10 sticky overflow-y-auto"
      >
        <div
          style={{ justifyContent: open ? "flex-start" : "center" }}
          className="w-2/3 flex items-center bg-[#0B222C] hover:bg-[#0F2A36] text-white py-2 text-center text-md rounded-lg w-full my-3 cursor-pointer"
        >
          <div className="ml-2 mr-4">
            <img className="sidebar-icon" src={Homeicon} alt="" />
          </div>
          <div style={{ display: open ? "block" : "none" }}>Home</div>
        </div>
        <div
          style={{ justifyContent: open ? "flex-start" : "center" }}
          className="w-2/3 flex items-center bg-[#0B222C] hover:bg-[#0F2A36] text-white py-2 text-center text-md rounded-lg w-full mb-3 cursor-pointer"
        >
          <div className="ml-2 mr-4">
            <img className="sidebar-icon" src={Topicon} alt="" />
          </div>
          <div style={{ display: open ? "block" : "none" }}>Top</div>
        </div>
        <div
          style={{ justifyContent: open ? "flex-start" : "center" }}
          className="w-2/3 flex items-center bg-[#0B222C] hover:bg-[#0F2A36] text-white py-2 text-center text-md rounded-lg w-full mb-3 cursor-pointer"
        >
          <div className="ml-2 mr-4">
            <img className="sidebar-icon" src={Newicon} alt="" />
          </div>
          <div style={{ display: open ? "block" : "none" }}>New</div>
        </div>
        <div className="w-full border-b-2 border-white"></div>
        <div
          style={{
            textAlign: "left",
            display: open ? "block" : "none",
          }}
          className="w-2/3 text-white px-2 pt-3 font-medium text-xl w-full mb-2"
        >
          Joined
        </div>
        {communityLoading ? (
          <div className="flex justify-center items-center mt-8">
            <LoadingSpinner height="30px" width="30px" />
          </div>
        ) : (
          <>
            {joinedCommunities.map((community, index) => (
              <div
                key={community.id}
                onClick={() => handleCommunityClick(community.id)}
                style={{
                  justifyContent: open ? "flex-start" : "center",
                  marginTop: !open && index === 0 ? "14px" : "0px",
                }}
                className="flex items-center w-full bg-[#0B222C] hover:bg-[#0F2A36] text-white py-2 text-md rounded-lg w-[100%] mb-2 cursor-pointer"
              >
                <div
                  // style={{
                  //   marginLeft: open ? "0px" : "0px",
                  //   marginRight: open ? "4px" : "0px",
                  // }}
                  className="ml-1 mr-3"
                >
                  <img
                    className="community-image"
                    src={`data:image/jpeg;base64,${community.image}`}
                    alt=""
                  />
                </div>
                <div style={{ display: open ? "block" : "none" }}>
                  {community.name.length > 18
                    ? community.name.substring(0, 18) + "..."
                    : community.name}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default HomepageSidebar;
