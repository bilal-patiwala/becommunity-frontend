import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import testImg from "../../assets/maksim-istomin-BSx5n20J-qg-unsplash.jpg";
function RecommendationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const interestvalues = location.state?.interestvalues;
  const [interestdata, setInterestData] = useState([]);
  // const [communities, setCommunities] = useState({});
  //   const {csrftoken} = useContext(AuthContext)

  //   useEffect(() => {
  //     get_communities();
  //   }, [interestvalues]);

  //   let get_communities = async () =>{
  //     console.log(interestvalues);
  //     let response = await fetch("http://127.0.0.1:8000/get_community/",{
  //         method:'POST',
  //         headers:{
  //             'Content-Type':'application/json',
  //             'X-CSRFToken':csrftoken
  //         },
  //         body: JSON.stringify({'data':interestvalues})
  //     })
  //     let data = await response.json()
  //     console.log(data)
  //     setCommunities(data)
  //     console.log(communities);
  // }

  const communities = {
    Technology: [
      {
        id: 1,
        name: "TechTalk",
        description: "A place for tech enthusiasts to discuss",
        creator: "ameliah",
        image: null,
      },
      {
        id: 2,
        name: "CodeCrafters",
        description: "Join fellow programmers",
        creator: "avat",
        image: null,
      },
      {
        id: 4,
        name: "eSportsElite",
        description: "eSportsElite is the ultimate destination",
        creator: "avat",
        image: "/media/community/60561.jpg",
      },
    ],
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
      <div className="font-Inter text-white text-lg px-4">
        We have selected these communities based on your interest available on
        our platform which you can join.
      </div>
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
                <img
                  className="h-[74px] w-[74px] rounded-full"
                  src={testImg}
                  alt=""
                />
                </div>
                <div className="font-Inter text-white text-center pt-4 font-medium">{community.name}</div>
                <div className="flex justify-center">
                <button className="py-[4px] rounded-[8px] mt-4 mb-1 bg-[#00FF84] hover:bg-[#09ed7f] w-[90%]">
                  <div className="font-Inter font-semibold">Join</div>
                </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecommendationPage;
