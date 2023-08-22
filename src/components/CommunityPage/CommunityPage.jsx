import React, { useContext, useEffect, useState, useRef } from "react";
import { Routes, useNavigate, useParams } from "react-router-dom";
import "../HomePageScreen/HomePageScreen.css";
import "./CommunityPage.css";
import AuthContext from "../../context/AuthContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import HomepageNavbar from "../HomePageScreen/HomepageNavbar";
import HomepageSidebar from "../HomePageScreen/HomepageSidebar";
import HomepageRightSidebar from "../HomePageScreen/HomepageRightSidebar";
import communityTestImg from "../../../public/infoImage3.jpg";
import { NavLink, Route } from "react-router-dom";
import Posts from "./Posts";
import Chats from "./Chats";
function CommunityPage() {
  const [open, setOpen] = useState(false);
  // const [communityName, setCommunityName] = useState("");
  const [communityInfo, setCommunityInfo] = useState([]);
  const { authToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [communityId, setCommunityId] = useState('');

  useEffect(() => {
    const storedId = localStorage.getItem('communityId');
    if (storedId) {
      setCommunityId(storedId);
    }
  });
  const get_community_info = async () => {
    setLoading(true);
    let response = await fetch(
      `http://localhost:8000/get_one_community_info/${communityId}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken.refresh}`,
        },
      }
    );
    let data = await response.json();
    console.log(data);
    setCommunityInfo(data.community);
    setLoading(false);
  };

  useEffect(() => {
    get_community_info();
  }, [communityId]);
  
  const [activeLink, setActiveLink] = useState("posts");
  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      <div className="bg-[#0F2A36]">
        <HomepageNavbar open={open} setOpen={setOpen} />

        <div
          style={{ justifyContent: open ? "space-between" : "space-around" }}
          className="w-full flex bg-[#0F2A36]"
        >
          <div>
            <HomepageSidebar open={open} />
          </div>

          <div className={`w-[90%] z-10 bg-[#0F2A36]`}>
          {loading ? (
          <div class="shadow rounded-md p-2 mx-2 my-1 w-1/5 ">
          <div class="animate-pulse flex space-x-2">
            <div class="rounded-full bg-slate-200 h-10 w-10"></div>
            <div class="flex-1 space-y-2 py-2">
              <div class="h-2 bg-slate-200 rounded"></div>
              <div class="space-y-2">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        ) : (
            <div className="border-[#304953] border-b-2 font-Inter text-white flex flex-row">
              <div className="mt-2 mb-2 mx-3">
                <img
                  src={`data:image/jpeg;base64,${communityInfo.image}`}
                  className="community-header-image"
                  alt=""
                />
              </div>
              <div className="my-[15px] text-lg font-semibold">
                {communityInfo.name}
              </div>
            </div>
          )}
            
            <div className="flex justify-around w-full font-Inter font-medium text-white mt-[12px] text-md mx-3">
              <div
                style={{
                  borderBottom:
                    activeLink === "posts" ? "2px #03C988 solid" : null,
                  width: "50%",
                  textAlign: "center",
                  paddingBottom: "8px",
                }}
              >
                <NavLink
                  className="community-nav-links"
                  style={{
                    color: activeLink === "posts" ? "#03C988" : "#fff",
                  }}
                  isActive={() => activeLink === "posts"}
                  onClick={() => handleNavLinkClick("posts")}
                >
                  Posts
                </NavLink>
              </div>
              <div
                style={{
                  borderBottom:
                    activeLink === "chat" ? "2px #03C988 solid" : null,
                  width: "50%",
                  textAlign: "center",
                  paddingBottom: "8px",
                }}
              >
                <NavLink
                  className="community-nav-links"
                  style={{
                    color: activeLink === "chat" ? "#03C988" : "#fff",
                  }}
                  isActive={() => activeLink === "chat"}
                  onClick={() => handleNavLinkClick("chat")}
                >
                  Chats
                </NavLink>
              </div>
            </div>
            <div className="mt-8">
              {activeLink === "posts" ? <Posts /> : <Chats />}
            </div>
          </div>
          <HomepageRightSidebar />
        </div>
      </div>
    </>
  );
}

export default CommunityPage;
