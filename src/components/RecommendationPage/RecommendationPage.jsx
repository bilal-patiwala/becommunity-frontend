import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function RecommendationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const interestvalues = location.state?.interestvalues;
  const [interestdata, setInterestData] = useState([]);
  const [communities, setCommunities] = useState({});
  const {csrftoken} = useContext(AuthContext)

  useEffect(() => {
    get_communities();
  }, [interestvalues]);

  let get_communities = async () =>{
    console.log(interestvalues);
    let response = await fetch("http://127.0.0.1:8000/get_community/",{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken
        },
        body: JSON.stringify({'data':interestvalues})
    })
    let data = await response.json()
    console.log(data)
    setCommunities(data)
    console.log(communities);
}


  // const communities = [
  //   { id: 1, name: "Codecrafters", description: "Hello1" },
  //   { id: 2, name: "Technos", description: "Community for Tech" },
  // ];

  return (
    <div>
     {Object.entries(communities).map(([category, communityList]) => (
        <div key={category}>
          <h3>{category}</h3>
          {communityList.map((community) => (
            <div key={community.id}>
              <h4>{community.name}</h4>
              <p>{community.description}</p>
              <img src={`http://localhost:8000${community.image}`} alt="" />
              {/* Render other properties of the community as needed */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default RecommendationPage;
