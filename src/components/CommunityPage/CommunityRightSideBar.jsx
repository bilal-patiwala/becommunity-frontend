import React, { useCallback, useContext, useEffect, useState } from "react";
import "./CommunityPage.css";
import AuthContext from "../../context/AuthContext";

function CommunityRightSideBar() {
  const [communityInfo, setCommunityInfo] = useState([]);
  const { authToken } = useContext(AuthContext);
  const [communityId, setCommunityId] = useState("");

  useEffect(() => {
    const storedId = localStorage.getItem("communityId");
    if (storedId) {
      setCommunityId(storedId);
    }
  });
  const get_community_info = async () => {
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
    console.log("comm", data);
    setCommunityInfo(data.community);
  };

  useEffect(() => {
    get_community_info();
  }, [communityId]);
  return (
    <>
      <div className="w-1/4 flex flex-col sidebar-divs mt-8">
        <div className="font-Inter flex flex-col shadow-xl z-10 p-2 bg-[#0B222C] rounded-lg sticky overflow-y-auto right-0 top-10 my-4 mx-2">
          <div className="text-white font-semibold px-2 py-1 text-lg">
            {" "}
            {communityInfo.name}{" "}
          </div>
          <div className="text-[#ACACAC] font-medium px-2 py-1 text-lg">
            {communityInfo.description}
</div>
          <div className="text-[#ACACAC] font-medium px-2 py-1 text-lg">
            Created By : <span className="text-white">{communityInfo.creator}</span>
          </div>
          <div className="text-[#ACACAC] font-medium px-2 py-1 text-lg">
            Members Joined : <span className="text-white">{communityInfo.membors}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommunityRightSideBar;
