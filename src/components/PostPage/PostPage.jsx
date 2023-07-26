import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import thumbsUp from "../../assets/thumbs-up.svg";
import thumbsDown from "../../assets/thumbs-down.svg";
import thumbsUpFilled from "../../assets/thumbs-up-filled.svg";
import thumbsDownFilled from "../../assets/thumbs-down-filled.svg";

// Samanuay -> review this whole code because I have put some things to make it work which are commented out and some are not so dekh lena

// const Comment = ({ comment }) => {
//   return (
//     <div className="text-white comment">
//       <div className="comment-content">{comment.content}</div>
//       {comment.replies && comment.replies.length > 0 && (
//         <div className="replies">
//           {comment.replies.map((reply) => (
//             <Comment key={reply.id} comment={reply} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

const Comment = ({ comment }) => {
  const [showReplies, setShowReplies] = useState(false);

  const toggleReplies = () => {
    setShowReplies((prev) => !prev);
  };

  return (
    <div className="m-2 text-white font-Inter" key={comment.id}>
      <div className="text-[#ACACAC] font-md">{comment.author}</div>
      <div>{comment.content}</div>
      {comment.replies.length > 0 && (
        <div
          className="cursor-pointer text-[#098fc9] font-md"
          onClick={toggleReplies}
        >
          {showReplies
            ? "Hide replies"
            : `${comment.replies.length} more replies..`}
        </div>
      )}

      {showReplies && (
        <div>
          {comment.replies.map((reply) => (
            <div key={reply.id}>
              <div className="text-[#ACACAC] font-md">{reply.author}</div>
              <div>{reply.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function PostPage() {
  const [post, setPostData] = useState({});
  const [postLoading, setPostLoading] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  let [recentlyLikedPosts, setRecentlyLikedPosts] = useState([]);
  const { authToken } = useContext(AuthContext);
  const { id } = useParams();
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
  const get_post_data = async () => {
    console.log(id);
    setPostLoading(true);
    let response = await fetch(`http://127.0.0.1:8000/get_one_post/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken.refresh}`,
      },
    });
    let data = await response.json();
    console.log("posts", data);
    setPostData(data);
    setPostLoading(false);
  };

  const load_comments = async () => {
    let response = await fetch(`http://localhost:8000/get_comments/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken.refresh}`,
      },
    });
    let data = await response.json();
    console.log("comments are : ", data);
    setCommentsData(data);
  };

  useEffect(() => {
    get_post_data();
    load_comments();
  }, []);

  return (
    <div className="bg-[#0F2A36]">
      {postLoading ? (
        <div className="flex justify-center items-center pt-8">
          <LoadingSpinner height="60px" width="60px" />
        </div>
      ) : (
        <div className="flex flex-col w-full justify-center items-center">
          {" "}
          <div
            key={post.id}
            className="font-Inter w-4/5 md:w-2/5 rounded-lg bg-[#0B222C] py-3 my-4 post-div"
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
              <div>
                <img src={`data:image/jpeg;base64,${post.image}`} alt="" />
              </div>
            )}
            <div className="text-white font-Inter flex items-center flex-row mt-3">
              <div className="px-4 flex flex-start">
                {post.has_liked || recentlyLikedPosts.includes(post.id) ? (
                  <button onClick={() => handleLike(post.id, index)}>
                    <img src={thumbsUpFilled} style={{ fill: "#fff" }} alt="" />
                  </button>
                ) : (
                  <button onClick={() => handleLike(post.id, index)}>
                    <img src={thumbsUp} alt="" />
                  </button>
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
                  <button onClick={handleDislike}>
                    <img src={thumbsDown} style={{ color: "#fff" }} alt="" />
                  </button>
                )}
                <div className="pt-[4px]">
                  <span className="px-2 pt-0 mt-0 font-medium">
                    {post.dislikes_count}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {commentsData.map((comment) => (
        <Comment key={comment.id} comment={comment} />
        ))}

      {/* Samanuay ->  below code is for mapping only parent comments try if you want to see */}
 
      {/* <div className="flex flex-col w-full justify-center items-center">
        <div className="font-Inter text-white w-4/5 md:w-2/5 rounded-lg bg-[#0B222C] py-2 my-2 post-div">
          <div>
            {commentsData.map((comment)=>(
              <div className="m-2" key={comment.id}>
                <div className="text-[#ACACAC] font-md">{comment.author}</div>
                <div>{comment.content}</div>
                {comment.replies.length>0 ?
                <div className="cursor-pointer text-[#098fc9] font-md">{comment.replies.length} more replies..</div>
                :null}
              </div>
            ))}
          </div>

        </div>
      </div> */}
    </div>
  );
}

export default PostPage;
