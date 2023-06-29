import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import "./CreatePost.css";
import "./CreatePostModal.css"
import AuthContext from "../../context/AuthContext";
function CreatePostModal(closeModal) {
    const [communities, setCommunities] = useState([]);
    const { authToken } = useContext(AuthContext);

    const close = (e) => {
        e.preventDefault();
        closeModal(false);
    };

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

                    <div className="bg-[#0F2A36] rounded-lg w-full model-main-container pb-3">
                        <div className="bg-[#0F2A36]">
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

                    </div>
                </div>
            </div>
        </div>



    );
}

export default CreatePostModal;
