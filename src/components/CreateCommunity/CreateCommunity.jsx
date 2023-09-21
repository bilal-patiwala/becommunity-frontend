import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import "./CreateCommunity.css";
import { useNavigate } from "react-router-dom";
import CreatableSelect from 'react-select/creatable';
function CreateCommunity() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);

  const get_categories = async () => {
    let response = await fetch("http://127.0.0.1:8000/get-categories/", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    setCategories(data);
  };
  useEffect(() => {
    get_categories();
  }, []);

  function handleSelectCategories(selectedOptions) {
    const categoryValues = selectedOptions.map((option) => option.value);
    setSelectedCategories(categoryValues);
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleCreateCommunity = async (data) => {
    let formdata = new FormData();
    formdata.append("name", data["community-name"]);
    formdata.append("description", data["community-description"]);
    formdata.append("community-category", JSON.stringify(selectedCategories));
    formdata.append("image-url", data["community-image"][0]);
    for (let [key, value] of formdata.entries()) {
      console.log(value);
    }
    let response = await fetch("http://127.0.0.1:8000/create-community/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken.refresh}`,
      },
      body: formdata,
    });
    navigate("/");
  };

  return (
    <div className="bg-[#0F2A36] h-screen">
      <div className="font-Inter text-white">
        <div className="pl-[16px] pt-4 pb-2 text-2xl">Create New Community</div>
        <form onSubmit={handleSubmit(handleCreateCommunity)}>
          <div className="name">
            <input
              className="name-input"
              placeholder="Name"
              type="text"
              {...register("community-name", { required: true })}
            />
          </div>
          <div className="description">
            <textarea
              className="description-input"
              placeholder="Description"
              type="text"
              {...register("community-description", { required: true })}
            />
          </div>
          <div className="community-category">
            <CreatableSelect
              className="select-categories"
              options={categories.map((category) => ({
                value: category.name,
                label: category.name,
              }))}
              placeholder="Select Community Category"
              value={selectedCategories.map((category) => ({
                value: category,
                label: category,
              }))}
              onChange={handleSelectCategories}
              isSearchable={true}
              isMulti
            />
          </div>
          <div className="community-image">
            <input
              className="community-image-input ml-3 mt-2"
              type="file"
              {...register("community-image", { required: true })}
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

export default CreateCommunity;
