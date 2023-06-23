import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import testImg from "../../assets/maksim-istomin-BSx5n20J-qg-unsplash.jpg";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
function RecommendationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const interestvalues = location.state?.interestvalues;
  const [interestdata, setInterestData] = useState([]);
  const [communities, setCommunities] = useState({});
  const { csrftoken } = useContext(AuthContext);
  const { authToken } = useContext(AuthContext);
  const [screenLoading, setScreenLoading] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);

  let [c_id, setCId] = useState([]);
  let [d_id, setDId] = useState([]);

  useEffect(() => {
    get_communities();
  }, [interestvalues]);

  let get_communities = async () => {
    console.log(interestvalues);
    setScreenLoading(true);
    let response = await fetch("http://127.0.0.1:8000/get_community/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ data: interestvalues }),
    });
    let data = await response.json();
    console.log(data);
    setCommunities(data);
    setScreenLoading(false);
    console.log(communities);
  };

  // const communities = {
  //   Technology: [
  //     {
  //       id: 1,
  //       name: "TechTalk",
  //       description: "A place for tech enthusiasts to discuss",
  //       creator: "ameliah",
  //       image: null,
  //     },
  //     {
  //       id: 2,
  //       name: "CodeCrafters",
  //       description: "Join fellow programmers",
  //       creator: "avat",
  //       image: null,
  //     },
  //     {
  //       id: 4,
  //       name: "eSportsElite",
  //       description: "eSportsElite is the ultimate destination",
  //       creator: "avat",
  //       image: "/media/community/60561.jpg",
  //     },
  //   ],
  // };

  const join = async (id) => {
    setJoinLoading(true);
    setDId([...d_id, id]);
    let response = await fetch("http://127.0.0.1:8000/join/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken.refresh}`,
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    let data = await response.json();
    setJoinLoading(false);
    console.log(data);
    if (data.status === 201) {
      setCId([...c_id, id]);
    } else if (data.status === 403) {
      setCId([...c_id, id]);
    }
  };
  
  return (
    <div className="bg-[#0F2A36]">
      <div
        className="text-black font-Inter font-semibold brand-heading px-12 py-4"
        href="#home"
      >
        <Link to="/" className="text-white no-underline font-Inter">
          BeCommunity
        </Link>
      </div>
      <div className="font-Inter text-white text-lg px-4">
        We have selected these communities based on your interest available on
        our platform which you can join.
      </div>
      {screenLoading ? (
        <div className="flex justify-center items-center mt-14">
          <LoadingSpinner height="50px" width="50px" />
        </div>
      ) : (
        <div>
          {" "}
          {Object.entries(communities).map(([category, communityList]) => (
            <div key={category}>
              <div className="font-Inter text-white text-lg p-4 font-semibold">
                {category}
              </div>
              <div className="flex flex-wrap flex-row mx-4">
                {communityList.map((community) => (
                  <div
                    className="flex flex-col justify-center mb-4 w-[160px] bg-[#0A1C24] mr-4 pt-4 pb-2 rounded-[12px]"
                    key={community.id}
                  >
                    <div className="flex justify-center">
                      {community.image ? (
                        <img
                          className="h-[74px] w-[74px] rounded-full"
                          src={`http://127.0.0.1:8000${community.image}`}
                          alt=""
                        />
                      ) : (
                        <img
                          className="h-[74px] w-[74px] rounded-full"
                          src={testImg}
                          alt=""
                        />
                      )}
                    </div>
                    <div className="font-Inter text-white text-center pt-4 font-medium">
                      {community.name}
                    </div>
                    <div className="flex justify-center">
                      <button
                        className=" rounded-[8px] mt-4 mb-1 bg-[#00FF84] hover:bg-[#09ed7f] w-[90%]"
                        onClick={() => join(community.id)}>
                          
                        {c_id.includes(community.id) ? (
                          <div className="py-[4px] font-Inter font-semibold">Joined</div>
                        ) : (
                          <div>
                            {joinLoading && d_id.includes(community.id) ? (
                              <div className="py-[2px] mb-2 mt-1 flex justify-center">
                                <LoadingSpinner height="16px" width="16px" />
                              </div>
                            ) : (
                              <div className="py-[4px] font-Inter font-semibold">
                                Join
                              </div>
                            )}
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}{" "}
        </div>
      )}
    </div>
  );
}

export default RecommendationPage;
