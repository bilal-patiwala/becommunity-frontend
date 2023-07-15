import React, { useContext, useEffect, useState, useRef } from "react";
import Dropdown from "./Dropdown";
import NotifyModal from "./NotifyModal";
import "./HomePageScreen.css";
import userImg from "../../assets/icons8-male-user-50.png";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import AuthContext from "../../context/AuthContext";
function HomepageNavbar({ open, setOpen }) {
  const Navigate = useNavigate();
  const dropRef = useRef();
  const notifyRef = useRef();
  const [drop, setDrop] = useState(false);
  const [notifyModal, setNotifyModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const { get_user } = useContext(AuthContext);
  useEffect(() => {
    getCurrentUser();
  }, []);
  const getCurrentUser = async () => {
    let data = await get_user();
    console.log(data);
    setUserData(data);
  };

  useEffect(() => {
    const close = (e) => {
      if (!dropRef.current.contains(e.target)) setDrop(false);
    };

    document.addEventListener("mousedown", close);

    return () => document.removeEventListener("mousedown", close);
  });

  useEffect(() => {
    const closeNotify = (e) => {
      if (!notifyRef.current.contains(e.target)) setNotifyModal(false);
    };

    document.addEventListener("mousedown", closeNotify);

    return () => document.removeEventListener("mousedown", closeNotify);
  });

  const navigatetoCreateCommunity = () => {
    Navigate("/create-community");
  };

  return (
    <>
      <header
        id="navbar"
        className="relative z-20 bg-[#0F2A36] shadow-xl w-full sticky top-0 left-0"
      >
        <nav className="md:flex items-center justify-between py-[5px] md:pl-0 pl-5 md:px-1 ml-14 mr-4">
          <div
            onClick={() => setOpen(!open)}
            className="text-2xl absolute left-5 top-4 cursor-pointer"
          >
            <i className="fa-solid fa-bars text-white"></i>
          </div>

          <div className="w-1/4 font-bold text-2xl cursor-pointer flex text-left items-center">
            <a className="flex flex-row no-underline" href="/">
              <span className="text-white font-Inter">BeCommunity</span>
            </a>
          </div>

          <div className="w-1/2 font-bold text-2xl cursor-pointer flex text-left items-center">
            <div className="relative w-5/6">
              <i
                class="fa fa-search absolute text-xl top-[6px] right-3 text-white"
                aria-hidden="true"
              ></i>
              <input
                className="bg-[#0B222C] h-9 w-full rounded-lg text-white pl-2 font-medium"
                placeholder="Search"
                type="text"
                name="search"
                id="search"
              />
            </div>
          </div>

          <div className="w-1/4 flex items-center justify-end">
            <Tooltip
              className="transition delay-40 ease-in duration-400 text-black"
              title={!notifyModal ? "Notifications" : ""}
              placement="left"
              arrow
            >
              <div
                onClick={() => setNotifyModal(!notifyModal)}
                ref={notifyRef}
                className="mx-5 cursor-pointer"
              >
                {!notifyModal ? (
                  <div className="relative">
                    <i class="fa-regular fa-bell text-white text-2xl"></i>
                    <h2 className="absolute fixed top-0 left-4 text-sm text-white bg-red-500 px-1 rounded-full">
                      3
                    </h2>
                  </div>
                ) : (
                  <i class="bell fa-solid fa-bell text-white text-2xl"></i>
                )}

                {notifyModal && <NotifyModal />}
              </div>
            </Tooltip>

            <div
              id="create"
              className="flex w-fit h-fit px-2 pb-2 items-center justify-center text-center rounded-lg mr-5"
            >
              <Tooltip
                className="transition delay-40 ease-in duration-400 text-black"
                title="Create a Community"
                arrow
              >
                <button
                  onClick={navigatetoCreateCommunity}
                  className="text-4xl text-white font-semibold font-Inter"
                >
                  +
                </button>
              </Tooltip>
            </div>

            <div
              onClick={() => setDrop(!drop)}
              ref={dropRef}
              className="flex w-14 h-14 items-center justify-center mx-2"
            >
              <button className="user-image-navbar bg-white">
                {userData.image ? (
                  <img
                    src={`data:image/jpeg;base64,${userData.image}`}
                    className="user-image-navbar"
                    alt="userimg"
                  />
                ) : (
                  <img
                    src={userImg}
                    className="user-image-navbar"
                    alt="userimg"
                  />
                )}
                {drop && <Dropdown />}
              </button>
              <i className="fa fa-caret-down text-white ml-2"></i>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default HomepageNavbar;
