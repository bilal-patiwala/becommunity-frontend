import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function RecommendationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const interestvalues = location.state?.interestvalues;
  const [interestdata, setInterestData] = useState([]);
  const [communities, setCommunities] = useState([]);
  const { get_communities } = useContext(AuthContext);

  useEffect(() => {
    setInterestData(interestvalues);
    getCommunityRecommendation();
  }, [interestvalues]);

  const getCommunityRecommendation = async () => {
    let data = await get_communities(interestdata);
    setCommunities(data);
  };

  // const communities = [
  //   { id: 1, name: "Codecrafters", description: "Hello1" },
  //   { id: 2, name: "Technos", description: "Community for Tech" },
  // ];

  return (
    <div>
      {communities.map((community) => (
        <div key={community.id}>
          <div>{community.name}</div>
          <div>{community.description}</div>
          <div>{community.creator}</div>
<img src={community.image} alt="" />
        </div>
      ))}
    </div>
  );
}

export default RecommendationPage;
