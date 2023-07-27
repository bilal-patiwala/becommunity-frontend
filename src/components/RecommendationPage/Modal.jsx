import { React, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./Modal.css";
import { AiOutlineCheckCircle } from "react-icons/ai";

import testImg from "../../assets/maksim-istomin-BSx5n20J-qg-unsplash.jpg";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function Modal({ closeModal, interestvalues }) {
  const close = (e) => {
    e.preventDefault();
    closeModal(false);
  };

  // Function to handle checkbox changes
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setCommunities((prevCommunities) => [...prevCommunities, name]);
    } else {
      setCommunities((prevCommunities) =>
        prevCommunities.filter((community) => community !== name)
      );
    }
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // You can handle the selected communities here (e.g., send them to the server)
    console.log('Selected communities:', communities);
  };

  const navigate = useNavigate();
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
    <div className="Modal bg-gray-700 bg-opacity-60 backdrop-filter backdrop-blur-sm z-30 w-full py-5 fixed flex justify-center h-screen items-center">
      <div className="ModalContainer h-screen relative md:w-1/2 w-full md:mx-0 mx-5 rounded-lg flex flex-col">
        <div className="flex flex-col items-center py-1 pl-1 rounded-lg">
          <div className="w-full relative font-semibold bold text-white text-2xl">
            <button
              id="close"
              onClick={close}
              className="px-3 pb-2 absolute rounded-lg right-2 top-1 hover:bg-[#1e414f]"
            >
              x
            </button>
          </div>

          <div className="bg-[#0F2A36] rounded-lg model-main-container">
            <div className="font-Inter text-white text-lg px-4 pt-4">
              We have selected these communities based on your interest
              available on our platform which you can join.
            </div>
            {screenLoading ? (
              <div className="flex justify-center mt-8 h-screen">
                <LoadingSpinner height="50px" width="50px" />
              </div>
            ) : (
              <div>
                {" "}
                {Object.entries(communities).map(
                  ([category, communityList]) => (
                    <div key={category}>
                      <div className="font-Inter text-white text-lg p-4 font-semibold">
                        {category}
                      </div>
                      <div className="flex flex-wrap flex-row mx-4">
                        {communityList.map((community) => (
                          <div
                            className="flex flex-col justify-center mb-4 mx-2 w-fit bg-[#0A1C24] pt-2 px-4 rounded-[12px]"
                            key={community.id}
                          >
                          <div className="flex">
                            <div className="flex justify-center items-center mr-5">
                            {community.image ? (
                                <img
                                  className="h-[40px] w-[40px] rounded-full"
                                  src={`data:image/jpeg;base64,${community.image}`}
                                  alt=""
                                />
                              ) : (
                                <img
                                  className="h-[40px] w-[40px] rounded-full"
                                  src={testImg}
                                  alt=""
                                />
                              )}
                              </div>
                              <div className="flex justify-center items-center py-2">
                              <form className="flex items-center" onSubmit={handleSubmit}>
                                <div>
                                <p className="font-Inter text-white text-center font-medium">{community.name}</p>
                                </div>
                                <div>
                                  <input
                                    type="checkbox"
                                    name="Community 1"
                                    className="mx-3 w-5 h-5 mb-3"
                                    // checked={communities.includes('Community 1')}
                                    onChange={handleCheckboxChange}
                                  />
                                  </div>
                              </form>
                              </div>
                            
                            {/* <div className="flex justify-center">
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
                                onClick={() => join(community.id)}
                              >
                                {c_id.includes(community.id) ? (
                                  <div className="py-[4px] font-Inter text-black flex items-center justify-center font-semibold">
                                    <div className="mr-2">Joined</div>
                                    <AiOutlineCheckCircle
                                      size={16}
                                      color="black"
                                      className="mr-1"
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    {joinLoading &&
                                    d_id.includes(community.id) ? (
                                      <div className="py-[2px] mb-2 mt-1 flex justify-center">
                                        <LoadingSpinner
                                          height="16px"
                                          width="16px"
                                        />
                                      </div>
                                    ) : (
                                      <div className="py-[4px] font-Inter font-semibold">
                                        Join
                                      </div>
                                    )}
                                  </div>
                                )}
                              </button>
                            </div> */}
                          </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}{" "}
                <Link to="/">
                  <div className="w-full bg-[#0F2A36] text-center sticky bottom-0">
                    <button
                      id="goto-homepage-btn"
                      className="m-2 rounded-[12px] bg-[#03C988] hover:bg-[#08a36f]"
                      type="submit"
                    >
                      <div className="px-5 py-2 text-md text-black font-Inter font-semibold">
                        Next <i className="fa fa-arrow-right ml-1"></i>
                      </div>
                    </button>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
