import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { FaRegComments } from "react-icons/fa";
import thumbsUp from "../../assets/thumbs-up.svg";
import thumbsDown from "../../assets/thumbs-down.svg";
import thumbsUpFilled from "../../assets/thumbs-up-filled.svg";
import thumbsDownFilled from "../../assets/thumbs-down-filled.svg";

import "./HomePageScreen.css";
import AuthContext from "../../context/AuthContext";
import CreatePostModal from "../CreatePost/CreatePostModal";
import { PageLoader } from "../PageLoader/PageLoader";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import HomepageNavbar from "./HomepageNavbar";
import HomepageSidebar from "./HomepageSidebar";
import HomepageRightSidebar from "./HomepageRightSidebar";
function HomePageScreen() {
  const Navigate = useNavigate();
  const dropRef = useRef();
  const notifyRef = useRef();
  const { authToken } = useContext(AuthContext);
  const [postsData, setPostsData] = useState([]);
  const [postBtn, setPostBtn] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  let [recentlyLikedPosts, setRecentlyLikedPosts] = useState([]);
  let [recentlyDislikedPosts, setRecentlyDislikedPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("");

  const handleLike = async (post_id, index) => {
    // e.preventDefault();
    setRecentlyLikedPosts((prevPosts) => [...prevPosts, post_id]);
    if (
      recentlyDislikedPosts.includes(post_id)
    ) {
      setRecentlyDislikedPosts((prevDisLikedPosts) =>
        prevDisLikedPosts.filter((id) => id !== post_id)
      );
      postsData[index].dislikes_count--;
    }
    postsData[index].likes_count++;

    let response = await fetch(`http://localhost:8000/like_post/${post_id}/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken.refresh}`,
      },
    });
    // let data = await response.json();
    // console.log(data);
  };

  const handleDislike = async (post_id, index) => {
    setRecentlyDislikedPosts((prevDislikedPosts) => [
      ...prevDislikedPosts,
      post_id,
    ]);
    if (recentlyLikedPosts.includes(post_id)) {
      setRecentlyLikedPosts((prevLikedPosts) =>
        prevLikedPosts.filter((id) => id !== post_id)
      );
      postsData[index].likes_count--;
    }
    postsData[index].dislikes_count++;
    let response = await fetch(
      `http://localhost:8000/dislike_post/${post_id}/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken.refresh}`,
        },
      }
    );
    // let data = await response.json();
    // console.log(data);
  };

  const handleAlreadyLike = async (post_id, index) => {
    // e.preventDefault();
    setRecentlyLikedPosts((prevLikedPosts) =>
      prevLikedPosts.filter((id) => id !== post_id)
    );

    postsData[index].likes_count--;

    let response = await fetch(`http://localhost:8000/like_post/${post_id}/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken.refresh}`,
      },
    });
    // let data = await response.json();
    // console.log(data);
  };

  const handleAlreadyDislike = async (post_id, index) => {
    setRecentlyDislikedPosts((prevDisLikedPosts) =>
      prevDisLikedPosts.filter((id) => id !== post_id)
    );
    postsData[index].dislikes_count--;
    let response = await fetch(
      `http://localhost:8000/dislike_post/${post_id}/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken.refresh}`,
        },
      }
    );
    // let data = await response.json();
    // console.log(data);
  };

  const get_post = async () => {
    setPostLoading(true);
    let response = await fetch("http://127.0.0.1:8000/get-post/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken.refresh}`,
      },
    });
    let data = await response.json();
    setPostsData(data)
    const likedPosts = [];
    const dislikedPosts = [];

    data.forEach((post) => {
      if (post.has_liked) {
        likedPosts.push(post.id);
      } else if (post.has_disliked) {
        dislikedPosts.push(post.id);
      }
    });
    setRecentlyLikedPosts(likedPosts);
    setRecentlyDislikedPosts(dislikedPosts);

    setPostLoading(false);
  };

  useEffect(() => {
    get_post();
  }, []);

  const sortByDate = (a, b) => new Date(b.date) - new Date(a.date);
  const sortByLikes = (a, b) => b.likes_count - a.likes_count;

  const handleSortByDate = () => {
    const sortedPosts = [...postsData].sort(sortByDate);
    setPostsData(sortedPosts);
  };

  const handleSortByLikes = () => {
    const sortedPosts = [...postsData].sort(sortByLikes);
    setPostsData(sortedPosts);
  };

  useEffect(() => {
    if (activeTab == "top") {
      handleSortByLikes();
    } else if (activeTab == "new") {
      handleSortByDate();
    } else {
      get_post();
    }
  }, [activeTab]);

  const post = (e) => {
    e.preventDefault();
    setPostBtn(true);
  };
  const handleModalClose = () => {
    setPostBtn(false);
    // get_post();
  };

  const [open, setOpen] = useState(true);

  return (
    <>
      {postBtn && <CreatePostModal closeModal={handleModalClose} />}

      <div className="bg-[#0F2A36]">
        <HomepageNavbar open={open} setOpen={setOpen} />

        <div
          style={{ justifyContent: open ? "space-between" : "space-around" }}
          className="w-full flex bg-[#0F2A36]"
        >
          <div>
            <HomepageSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              open={open}
            />
          </div>

          <div
            className={`${
              open ? "w-3/5" : "w-4/5"
            } flex flex-col items-center z-10 p-2 bg-[#0F2A36] rounded-lg pt-5`}
          >
            <div className="w-full flex justify-end items-center">
              <Tooltip
                className="transition delay-40 ease-in duration-400 text-black"
                title="Create Post"
                arrow
              >
                <div
                  id="post"
                  className="font-Inter z-20 fixed bottom-7 rounded-full shadow-xl bg-green-600 pr-4 pl-3 py-2"
                >
                  <button
                    onClick={post}
                    className="flex flex-row items-center text-xl font-black text-white font-bold text-center"
                  >
                    <i className="fa fa-plus mr-1"></i>
                    <div>Post</div>
                  </button>
                </div>
              </Tooltip>
            </div>

            {postLoading ? (
              <>
                {/* <LoadingSpinner height="60px" width="60px" /> */}
                <PageLoader />
                <PageLoader />
                <PageLoader />
              </>
            ) : (
              <div className="flex flex-col w-full justify-center items-center">
                {" "}
                {postsData.map((post, index) => (
                  <div
                    key={post.id}
                    className="font-Inter w-2/3 rounded-lg bg-[#0B222C] py-3 mb-4 post-div"
                  >
                    <div className="title text-[#ACACAC] py-2 px-4">
                      {post.post_creator} | {post.community}
                    </div>
                    <div className="content font-semibold text-lg text-white px-4 pb-2">
                      {post.title}
                    </div>
                    <div className="content text-[#c2c2c2] px-4 pb-4">
                      {post.description}
                    </div>
                    {post.image && (
                      <div className="object-cover">
                        <img
                          className="w-full"
                          src={`data:image/jpeg;base64,${post.image}`}
                          alt=""
                        />
                      </div>
                    )}
                    <div className="text-white font-Inter flex items-center flex-row mt-3">
                      <div className="px-4 flex flex-start">
                        {recentlyLikedPosts.includes(post.id) ? (
                          <button
                            onClick={() => handleAlreadyLike(post.id, index)}
                          >
                            <img
                              src={thumbsUpFilled}
                              style={{ fill: "#fff" }}
                              alt=""
                            />
                          </button>
                        ) : (
                          <Tooltip
                            className="transition delay-40 ease-in duration-400 text-black"
                            title="Like"
                            arrow
                          >
                            <button onClick={() => handleLike(post.id, index)}>
                              <img src={thumbsUp} alt="" />
                            </button>
                          </Tooltip>
                        )}
                        <div className="pt-[4px]">
                          <span className="px-2 pt-0 mt-0 font-medium">
                            {post.likes_count}
                          </span>
                        </div>
                      </div>
                      <div className="px-2 flex flex-start">
                        {recentlyDislikedPosts.includes(post.id) ? (
                          <button
                            onClick={() => handleAlreadyDislike(post.id, index)}
                          >
                            <img
                              src={thumbsDownFilled}
                              style={{ color: "#fff" }}
                              alt=""
                            />
                          </button>
                        ) : (
                          <Tooltip
                            className="transition delay-40 ease-in duration-400 text-black"
                            title="Dislike"
                            arrow
                          >
                            <button
                              onClick={() => handleDislike(post.id, index)}
                            >
                              <img
                                src={thumbsDown}
                                style={{ color: "#fff" }}
                                alt=""
                              />
                            </button>
                          </Tooltip>
                        )}
                        <div className="pt-[4px]">
                          <span className="px-2 pt-0 mt-0 font-medium">
                            {post.dislikes_count}
                          </span>
                        </div>
                      </div>
                      <Tooltip
                        className="transition delay-40 ease-in duration-400 text-black"
                        title="Comments"
                        arrow
                      >
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/post/${post.id}`}
                        >
                          <div className="px-6">
                            <FaRegComments
                              size={26}
                              style={{ fill: "white" }}
                            />
                          </div>
                        </Link>
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* <div className="w-2/3 rounded-lg bg-[#0B222C] py-3 mb-5 border border-white">
            <div className="title text-[#ACACAC] py-2 px-4">
              Sam67 | SpaceTalks
            </div>
            <div className="content text-white px-4 pb-4">
              Batman trilogy is the only good DC movie according to me in a
              longest time. #DC #Batman #Nolan
            </div>

            <div className="reactions text-white px-4 pb-4">
              <i class="fa-solid fa-arrow-up text-white cursor-pointer">
                <span className="text-gray-400 mx-2">67</span>
              </i>
              <i class="fa-solid fa-arrow-down text-white ml-4 cursor-pointer">
                <span className="text-gray-400 mx-2">23</span>
              </i>
            </div>
          </div> */}
            {/* <div className="w-2/3 rounded-lg bg-[#0B222C] py-3 mb-5">
            <div className="title text-[#ACACAC] py-2 px-4">
              Sam67 | SpaceTalks
            </div>
            <div className="content text-white px-4 pb-4">
              Batman trilogy is the only good DC movie according to me in a
              longest time. #DC #Batman #Nolan
            </div>

            <div className="reactions text-white px-4 pb-4">
              <i class="fa-solid fa-arrow-up text-white cursor-pointer">
                <span className="text-gray-400 mx-2">67</span>
              </i>
              <i class="fa-solid fa-arrow-down text-white ml-4 cursor-pointer">
                <span className="text-gray-400 mx-2">23</span>
              </i>
            </div>
          </div> */}
          </div>
          <HomepageRightSidebar />
        </div>
      </div>
    </>
  );
}

export default HomePageScreen;
