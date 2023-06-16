import React, { useContext, useState, useEffect } from "react";
import "./LoginScreen.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
function LoginScreen() {
  const [loginResponse, setResponse] = useState(0);
  const [loading, setLoading] = useState(false);

  const { loginUser } = useContext(AuthContext);
  const login = async (data) => {
    if (data.username !== "" && data.password !== "") {
      setLoading(true);
      let response = await loginUser(data.username, data.password);
      setResponse(response.status);
      setLoading(false);
    }
  };
  const {
    register,
    handleSubmit,
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
        <div className="bg-[#0F2A36] h-[440px] flex flex-row w-[80%] sm:w-[64%] rounded-[24px]">
          <div className="welcome-info w-[40%] flex flex-col h-full justify-center  border-r border-[#606b7a] text-white font-Inter hidden md:flex">
            <div className="text-2xl text-left px-4 font-semibold">
              {" "}
              Welcome Back to BeCommunity.
            </div>
            <div className="text-2xl align-left m-4 rounded h-[8px] bg-[#03C988] w-[120px]"></div>
            <div className="text-lg my-2 mx-4">
              Log in to continue to your account
            </div>
          </div>
          <div className="w-[100%]  md:w-[60%] text-white font-Inter flex flex-col h-full justify-center">
            <div className="font-semibold text-2xl text-center">Log In</div>
            <div className="login-form flex justify-center">
              <div className="w-[94%] sm:w-[80%] flex flex-col justify-center">
                <form onSubmit={handleSubmit(login)}>
                  <div className="user-input">
                    <input
                      type="text"
                      id="username"
                      className="username-input"
                      {...register("username", { required: true })}
                      placeholder="Username"
                      autoComplete="off"
                    />
                    <br />
                    {errors.username && (
                      <span className="font-Inter mx-4 my-2 text-red-400 text-sm	">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="pass-input">
                    <input
                      type="password"
                      id="password"
                      className="password-input"
                      {...register("password", { required: true })}
                      placeholder="Password"
                    />
                    <br />
                    {errors.password && (
                      <span className="font-Inter mx-4 my-2 text-red-400 text-sm	">
                        This field is required
                      </span>
                    )}
                  </div>
                  <button type="submit" className="w-[90%] login-btn">
                    <div className=" bg-[#03C988] hover:bg-[#08a36f] text-center font-semibold text-md p-2 rounded-[8px]">
                      {loading ? (
                        <LoadingSpinner height="18px" width="18px" />
                      ) : (
                        <span>Log In</span>
                      )}
                    </div>
                  </button>
                </form>
                {loginResponse === 401 ? (
                  <span className="font-Inter mx-[16px] my-0 text-red-400 text-sm	">
                    User not Registered.
                  </span>
                ) : null}

                <div className="mt-2 ml-4">
                  Not a member? <Link to="/signin">Sign Up</Link>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
