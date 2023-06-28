import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import "./CreatePost.css";
import AuthContext from "../../context/AuthContext";
function CreatePost() {
  const [communities, setCommunities] = useState([]);
  const { authToken } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    get_joined_communities();
  }, []);

  const get_joined_communities = async () => {
    let response = await fetch(
      "http://127.0.0.1:8000/get_user_joined_community/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken.refresh}`,
        },
      }
    );
    let data = await response.json();
    console.log("communities joined", data);
    setCommunities(data);
  };

  const handleCreatePost = async (data) => {
    let formdata = new FormData();
    formdata.append("title", data["post-title"]);
    formdata.append("description", data["post-description"]);
    formdata.append("community", data["post-community"]);
    formdata.append("image-url", data["post-image"][0]);
    for (let [key, value] of formdata.entries()) {
      console.log(value);
    }
    let response = await fetch("http://127.0.0.1:8000/create-post/", {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken.refresh}`,
      },
      body: formdata,
    });
    let responseData = await response.json();
    console.log(responseData);
  };

  return (
    <div className="bg-[#0F2A36] h-screen">
      <div className="font-Inter text-white">
        <div className="pl-[16px] pt-4 pb-2 text-2xl">Create New Post</div>
        <form onSubmit={handleSubmit(handleCreatePost)}>
          <div className="title">
            <input
              className="title-input"
              placeholder="Title"
              type="text"
              {...register("post-title", { required: true })}
            />
          </div>
          <div className="description">
            <textarea
              className="description-input"
              placeholder="Description"
              type="text"
              {...register("post-description", { required: true })}
            />
          </div>
          <div className="community">
            <select
              id="dropdown"
              className="community-dropdown-menu"
              {...register("post-community", { required: true })}
            >
              <option value="">-- Select --</option>
              {communities.map((option) => (
                <option key={option.id} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="post-image">
            <input
              className="post-image-input ml-3 mt-2"
              type="file"
              {...register("post-image", { required: true })}
            />
          </div>
          <div className="ml-3 mt-4">
            <button
              className="bg-[#fff] p-2 rounded-lg text-black"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
