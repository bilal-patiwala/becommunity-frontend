import React, { useContext, useEffect, useState } from "react";
import Homeicon from "../../assets/icons8-home.svg";
import Topicon from "../../assets/arrow-up-circle.svg";
import Newicon from "../../assets/coffee.svg";
import communityTestImg from "../../../public/infoImage3.jpg";
import AuthContext from "../../context/AuthContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";

function HomepageSidebar({ open, activeTab, setActiveTab }) {
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [communityLoading, setCommunityLoading] = useState(false);
  const { get_user } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const { authToken } = useContext(AuthContext);
  const [joinedCommunityList, setJoinedCommunityList] = useState([]);
  const [createdCommunityList, setCreatedCommunityList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    get_joined_communities();
    getCurrentUser();
  }, []);

  useEffect(() => {
    categorizeCommunities(userData.username, joinedCommunities);
  }, [joinedCommunities]);
  const getCurrentUser = async () => {
    let data = await get_user();
    console.log(data);
    setUserData(data);
  };
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
  const categorizeCommunities = (username, joinedCommunities) => {
    const joinedCommunitiesList = [];
    const createdCommunitiesList = [];

    // Iterate through the joinedCommunities array
    for (const community of joinedCommunities) {
      if (community.creator === username) {
        console.log(community.creator === username);
        // If the current user is the creator, add it to createdCommunitiesList
        createdCommunitiesList.push(community);
      } else {
        // Otherwise, add it to joinedCommunitiesList
        joinedCommunitiesList.push(community);
      }
    }

    setJoinedCommunityList(joinedCommunitiesList);
    setCreatedCommunityList(createdCommunitiesList);
  };

  const handleCommunityClick = (id) => {
    localStorage.setItem("communityId", id);
    navigate(`/community/${id}`, { state: { id } });
    console.log(id);
  };

  const navigateHome = () => {
    navigate("/");
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
          onClick={navigateHome}
          style={{ justifyContent: open ? "flex-start" : "center" }}
          className="w-2/3 flex items-center bg-[#0B222C] hover:bg-[#0F2A36] text-white py-2 text-center text-md rounded-lg w-full my-3 cursor-pointer"
        >
          <div className="ml-2 mr-4">
            <img className="sidebar-icon" src={Homeicon} alt="" />
          </div>
          <div style={{ display: open ? "block" : "none" }}>Home</div>
        </div>
        <div
          onClick={() => {
            setActiveTab("top");
          }}
          style={{ justifyContent: open ? "flex-start" : "center" }}
          className="w-2/3 flex items-center bg-[#0B222C] hover:bg-[#0F2A36] text-white py-2 text-center text-md rounded-lg w-full mb-3 cursor-pointer"
        >
          <div className="ml-2 mr-4">
            <img className="sidebar-icon" src={Topicon} alt="" />
          </div>
          <div style={{ display: open ? "block" : "none" }}>Top</div>
        </div>
        <div
          onClick={() => {
            setActiveTab("new");
          }}
          style={{ justifyContent: open ? "flex-start" : "center" }}
          className="w-2/3 flex items-center bg-[#0B222C] hover:bg-[#0F2A36] text-white py-2 text-center text-md rounded-lg w-full mb-3 cursor-pointer"
        >
          <div className="ml-2 mr-4">
            <img className="sidebar-icon" src={Newicon} alt="" />
          </div>
          <div style={{ display: open ? "block" : "none" }}>New</div>
        </div>
        <div className="w-full border-b-2 border-white"></div>
        {createdCommunityList.length > 0 ? (
          <div
            style={{
              textAlign: "left",
              display: open ? "block" : "none",
            }}
            className="w-2/3 text-white px-2 pt-3 font-medium text-lg w-full mb-2"
          >
            Created
          </div>
        ) : null}
        {communityLoading ? (
          open ? (
            <>
              <div class="shadow rounded-md p-4 w-full mx-auto mb-7">
                <div class="animate-pulse flex space-x-4">
                  <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                  <div class="flex-1 space-y-2 py-2">
                    <div class="h-2 bg-slate-200 rounded"></div>
                    <div class="space-y-3">
                      <div class="grid grid-cols-3 gap-2">
                        <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="shadow rounded-md p-4 w-full mx-auto mb-7">
                <div class="animate-pulse flex space-x-4">
                  <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                  <div class="flex-1 space-y-2 py-2">
                    <div class="h-2 bg-slate-200 rounded"></div>
                    <div class="space-y-3">
                      <div class="grid grid-cols-3 gap-2">
                        <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <LoadingSpinner height="30px" width="30px" />
          )
        ) : (
          <>
            {createdCommunityList.length > 0
              ? createdCommunityList.map((community, index) => (
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
                        alt="community-image"
                      />
                    </div>
                    <div style={{ display: open ? "block" : "none" }}>
                      {community.name.length > 18
                        ? community.name.substring(0, 18) + "..."
                        : community.name}
                    </div>
                  </div>
                ))
              : null}
            {createdCommunityList.length > 0 ? (
              <div className="w-full border-b-2 border-white"></div>
            ) : null}

            <div
              style={{
                textAlign: "left",
                display: open ? "block" : "none",
              }}
              className="w-2/3 text-white px-2 pt-3 font-medium text-lg w-full mb-2"
            >
              Joined
            </div>
            {joinedCommunityList.length>0 ? joinedCommunityList.map((community, index) => (
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
            )) : (<div className="text-white">Nothing to show</div>)}
          </>
        )}
      </div>
    </>
  );
}

export default HomepageSidebar;
