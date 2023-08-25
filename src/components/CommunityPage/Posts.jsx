import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { PageLoader } from "../PageLoader/PageLoader";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Tooltip from "@mui/material/Tooltip";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaRegComments } from "react-icons/fa";
import thumbsUp from "../../assets/thumbs-up.svg";
import thumbsDown from "../../assets/thumbs-down.svg";
import thumbsUpFilled from "../../assets/thumbs-up-filled.svg";
import thumbsDownFilled from "../../assets/thumbs-down-filled.svg";

function Posts() {
  // const location = useLocation();
  // const community_id = location.state.id;
  const [communityPosts, setCommunityPosts] = useState([]);
  const { authToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [communityId, setCommunityId] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  let [recentlyLikedPosts, setRecentlyLikedPosts] = useState([]);

  useEffect(() => {
    const storedId = localStorage.getItem('communityId');
    if (storedId) {
      setCommunityId(storedId);
    }
  });

  const get_community_posts = async () => {
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
    console.log(data.posts);
    setCommunityPosts(data.posts);
    setLoading(false);
  };

  useEffect(() => {
    get_community_posts();
  }, [communityId]);


  const handleLike = async (post_id, index) => {
    // e.preventDefault();
    setRecentlyLikedPosts((prevPosts) => [...prevPosts, post_id]);
    postsData[index].likes_count++;

    let response = await fetch(`http://localhost:8000/like_post/${post_id}/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken.refresh}`,
      },
    });
    let data = await response.json();
    console.log(data);
  };
  const handleDislike = (e) => {
    e.preventDefault();
    setIsDisLiked(!isDisLiked);
  };

  return (
    <>
      {loading ? (
        <>
          {/* <LoadingSpinner height="60px" width="60px" /> */}
          <PageLoader />
          <PageLoader />
        </>
      ) : (
        <div className="text-white flex justify-center">
          <div
            className={`flex flex-col items-center shadow-xl z-10 p-2 bg-[#0F2A36] rounded-lg pt-2`}
          >
            <div className="flex flex-col w-full justify-center items-center">
              {" "}
              {communityPosts.slice().reverse().map((post) => (
                <div className="font-Inter w-7/12 rounded-lg bg-[#0B222C] py-3 mb-4 post-div">
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
                    <div className="object-contain px-2">
                      <img className="w-full rounded-lg max-h-96" src={`data:image/jpeg;base64,${post.image}`} alt="" />
                    </div>
                  )}
                  <div className="text-white font-Inter flex items-center flex-row mt-3">
                    <div className="px-4 flex flex-start">
                      {post.has_liked ||
                        recentlyLikedPosts.includes(post.id) ? (
                        <button onClick={() => handleLike(post.id, index)}>
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
                      {post.has_disliked ? (
                        <button onClick={handleDislike}>
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
                          <button onClick={handleDislike}>
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
                      title="Comment"
                      arrow
                    >
                      <Link style={{ textDecoration: "none" }} to={`/post/${post.id}`}>
                        <div className="px-6">
                          <FaRegComments size={26} style={{ fill: "white" }} />
                        </div>
                      </Link>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Posts;
