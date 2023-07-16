import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useLocation,useParams } from "react-router-dom";
function Posts() {
  // const location = useLocation();
  // const community_id = location.state.id;
  const [communityPosts, setCommunityPosts] = useState([]);
  const { authToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [communityId, setCommunityId] = useState('');

  useEffect(() => {
    const storedId = localStorage.getItem('communityId');
    if (storedId) {
      setCommunityId(storedId);
    }
  }, []);
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
  return (
    <div className="text-white flex justify-center">
      <div
        className={`flex flex-col items-center shadow-xl z-10 p-2 bg-[#0F2A36] rounded-lg pt-5`}
      >
        {loading ? (
          <div className="flex justify-center items-center mt-8">
            <LoadingSpinner height="60px" width="60px" />
          </div>
        ) : (
          <div className="flex flex-col w-full justify-center items-center">
            {" "}
            {communityPosts.map((post) => (
              <div className="font-Inter w-2/3 rounded-lg bg-[#0B222C] py-3 mb-4 post-div">
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
                  <div>
                    <img src={`data:image/jpeg;base64,${post.image}`} alt="" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Posts;
