import React, { useContext, useEffect, useState } from "react";
import "./ChooseInterestScreen.css";
import { Link } from "react-router-dom";
import interest from "./Interest";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { motion } from "framer-motion";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Modal from "../RecommendationPage/Modal";
function ChooseInterestScreen() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [interestArray, setInterestValue] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recommendationModal, setRecommendationModal] = useState(false);
  const navigate = useNavigate();
  // const history = useHistory();
  const { authToken } = useContext(AuthContext);

  const get_categories = async () => {
    let response = await fetch("http://127.0.0.1:8000/get-categories/", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    // return data;
    setCategories(data);
  };
  const slicedArrayCategories = categories.slice(0, 15);

  const { get_user } = useContext(AuthContext);
  useEffect(() => {
    getCurrentUser();
    get_categories();
  }, []);

  const getCurrentUser = async () => {
    let data = await get_user();
    setUsername(data);
    setLoading(false);
  };

  const handleInterestSelect = (value) => {
    if (!interestArray.includes(value)) {
      setInterestValue([...interestArray, value]);
    } else {
      setInterestValue(interestArray.filter((item) => item !== value));
    }
  };

  const handleCategorySelection = () => {
    setRecommendationModal(true);
    // navigate("/recommendations", { state: { interestvalues: interestArray } });
  };

  return (
    <>

    {recommendationModal && <Modal closeModal={setRecommendationModal} interestvalues={interestArray}/>}

    <div className="bg-[#0F2A36] h-screen">
      <div
        className="text-black font-Inter font-semibold brand-heading px-12 py-4"
        href="#home"
      >
        <Link to="/" className="text-white no-underline font-Inter">
          BeCommunity
        </Link>
      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-12">
          <LoadingSpinner height="50px" width="50px" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mt-4"
        >
          <div className="bg-[#0A1C24] w-[80%] rounded-[21px] p-4 font-Inter">
            <div className="text-white text-xl">
              Welcome, {username}. Please select your interest to get started.
            </div>
            <div className="text-[#C4C4C4] my-4">
              {interestArray.length}/5 selected{" "}
              {interestArray.length > 5 ? (
                <span>(Please select only 5 to proceed)</span>
              ) : null}
            </div>
            <div className="interest-categories flex flex-wrap">
              {slicedArrayCategories.map((interest) => (
                <Link
                  key={interest.name}
                  onClick={() => handleInterestSelect(interest.name)}
                  style={{
                    backgroundColor: interestArray.includes(interest.name)
                      ? "black"
                      : "white",
                    color: interestArray.includes(interest.name)
                      ? "white"
                      : "black",
                  }}
                  className="no-underline p-[8px] my-2 ml-0 mr-2 rounded-[10px]"
                >
                  {interest.name}
                </Link>
              ))}
            </div>
            <button
              id="next-btn"
              style={{
                backgroundColor:
                  interestArray.length > 5 ? "#08a36f" : "#03C988",
              }}
              disabled={interestArray.length > 5}
              onClick={handleCategorySelection}
              className="mt-4 rounded-[12px] bg-[#03C988] hover:bg-[#08a36f]"
              type="submit"
            >
              <div className="px-4 py-2 text-black font-Inter font-semibold">
                Next
              </div>
            </button>
          </div>
        </motion.div>
      )}
    </div>
    </>
  );
}

export default ChooseInterestScreen;
