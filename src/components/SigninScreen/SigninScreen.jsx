import React, { useContext } from "react";
import "./SigninScreen.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
function SigninScreen() {
  const { signupUser } = useContext(AuthContext);
  const Signin = (data) => {
    if (
      data.username !== "" &&
      data.password !== "" &&
      data.email !== "" &&
      data.name !== ""
    ) {
      signupUser(data.email, data.username, data.name, data.password);
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
        className="text-black font-Inter font-semibold brand-heading px-16 py-4"
        href="#home"
      >
        <Link to="/" className="navbar-logo">BeCommunity</Link>
      </div>
      <div className="flex justify-center mt-2">
        <div className="bg-[#0F2A36] h-[480px] flex flex-row w-[80%] sm:w-[64%] rounded-[24px]">
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
            <div className="font-semibold text-2xl text-center">Sign In</div>
            <div className="signin-form flex justify-center">
              <div className="w-[94%] sm:w-[80%] flex flex-col justify-center">
                <form onSubmit={handleSubmit(Signin)}>
                  <div className="user-email-input">
                    <input
                      type="email"
                      id="email"
                      className="email-input"
                      {...register("email", { required: true })}
                      placeholder="Email"
                    />
                  </div>
                  <div className="user-name-input">
                    <input
                      type="text"
                      id="name"
                      className="name-input"
                      {...register("name", { required: true })}
                      placeholder="Name"
                    />
                  </div>
                  <div className="user-input">
                    <input
                      type="text"
                      id="username"
                      className="username-signin-input"
                      {...register("username", { required: true })}
                      placeholder="Username"
                      autocomplete="off"
                    />
                  </div>
                  <div className="pass-input">
                    <input
                      type="password"
                      id="password"
                      className="password-signin-input"
                      {...register("password", { required: true })}
                      placeholder="Password"
                    />
                  </div>
                  <button type="submit" className="w-[90%] login-btn">
                    <div className="  bg-[#03C988] hover:bg-[#08a36f] text-center font-semibold text-md p-2 rounded-[8px]">
                      Sign in
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
