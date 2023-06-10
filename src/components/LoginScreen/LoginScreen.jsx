import React, { useContext } from "react";
import "./LoginScreen.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
function LoginScreen() {
  const { loginUser } = useContext(AuthContext);
  const login = (data) => {
    if (data.username !== "" && data.password !== "") {
      loginUser(data.username, data.password);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="bg-[#14142E] h-screen">
      <div
        className="text-white font-Inter font-semibold brand-heading px-16 py-4"
        href="#home"
      >
        BeCommunity
      </div>
      <div className="flex justify-center mt-2">
        <div className="bg-[#0C0C22] h-[440px] flex flex-row w-[80%] sm:w-[64%] rounded-[24px]">
          <div className="welcome-info w-[40%] flex flex-col h-full justify-center  border-r border-[#606b7a] text-white font-Inter hidden md:flex">
            <div className="text-2xl text-left px-4 font-semibold">
              {" "}
              Welcome Back to BeCommunity.
            </div>
            <div className="text-2xl align-left m-4 rounded h-[8px] bg-[#6C63FF] w-[120px]"></div>
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
                      autocomplete="off"
                    />
                  </div>
                  <div className="pass-input">
                    <input
                      type="password"
                      id="password"
                      className="password-input"
                      {...register("password", { required: true })}
                      placeholder="Password"
                    />
                  </div>
                  <button type="submit" className="w-[90%] login-btn">
                    <div className=" bg-[#6C63FF] hover:bg-[#5f58e6] text-center font-semibold text-md p-2 rounded-[8px]">
                      Log in
                    </div>
                  </button>
                </form>
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
