import React, { useContext, useState } from "react";
import "./SigninScreen.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function SigninScreen() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const validateEmail = (input) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const isValidEmail = regex.test(input);

    setIsValid(isValidEmail);
  };

  const handleEmailInputChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
    validateEmail(inputValue);
  };
  const { signupUser } = useContext(AuthContext);
  const Signin = (data) => {
    setLoading(true);
    if (
      data.username !== "" &&
      data.password !== "" &&
      data.email !== "" &&
      data.name !== ""
    ) {
      signupUser(data.email, data.username, data.name, data.password);
    }
    setLoading(false);
  };
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();
  return (
    <div className="bg-[#fff] h-screen">
      <div
        className="text-black font-Inter font-semibold brand-heading px-12 py-4"
        href="#home"
      >
        <Link to="/" className="navbar-logo">
          BeCommunity
        </Link>
      </div>
      <div className="flex justify-center mt-2">
        <div className="bg-[#0F2A36] h-[500px] flex flex-row w-[80%] sm:w-[64%] rounded-[24px]">
          <div className="welcome-info w-[40%] flex flex-col h-full justify-center  border-r border-[#606b7a] text-white font-Inter hidden md:flex">
            <div className="text-2xl text-left px-4 font-semibold">
              {" "}
              Join BeCommunity for Free.
            </div>
            <div className="text-2xl align-left m-4 rounded h-[8px] bg-[#03C988] w-[120px]"></div>
            <div className="text-lg my-2 mx-4">
              Discover, Connect, and Thrive: Explore, Join, and Engage with
              Communities of Your Interest!
            </div>
          </div>
          <div className="w-[100%]  md:w-[60%] text-white font-Inter flex flex-col h-full justify-center">
            <div className="font-semibold text-2xl text-center">Sign Up</div>
            <div className="signin-form flex justify-center">
              <div className="w-[94%] sm:w-[80%] flex flex-col justify-center">
                <form onSubmit={handleSubmit(Signin)}>
                  <div className="user-email-input">
                    <input
                      type="email"
                      id="email"
                      className="email-input"
                      onChange={handleEmailInputChange}
                      {...register("email", { required: "Email is required" })}
                      placeholder="Email"
                      required={true}
                    />
                    <br />
                    {email.length > 0 && !isValid && (
                      <span className="font-Inter mx-4 text-red-400 text-sm">
                        Invalid email
                      </span>
                    )}
                  </div>
                  <div className="user-name-input">
                    <input
                      type="text"
                      id="name"
                      className="name-input"
                      {...register("name", { required: "Name is required" })}
                      placeholder="Name"
                    />
                    <br />
                    {errors.name && (
                      <span className="font-Inter mx-4 text-red-400 text-sm">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div className="user-input">
                    <input
                      type="text"
                      id="username"
                      className="username-signin-input"
                      {...register("username", {
                        required: "username is required",
                      })}
                      placeholder="Username"
                      autoComplete="off"
                    />
                    <br />
                    {errors.username && (
                      <span className="font-Inter mx-4 text-red-400 text-sm">
                        {errors.username.message}
                      </span>
                    )}
                  </div>
                  <div className="pass-input">
                    <input
                      type="password"
                      id="password"
                      className="password-signin-input"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      placeholder="Password"
                    />
                    <br />
                    {errors.password && (
                      <span className="font-Inter mx-4 text-red-400 text-sm">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  <button type="submit" className="w-[90%] login-btn">
                    <div className="  bg-[#03C988] hover:bg-[#08a36f] text-center font-semibold text-md p-2 rounded-[8px]">
                    {loading ? (
                        <LoadingSpinner height="18px" width="18px" />
                      ) : (
                        <span>Sign Up</span>
                      )}
                    </div>
                  </button>
                </form>
                <div className="mt-2 ml-4">
                  Already a member? <Link to="/login">Log in</Link>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninScreen;
