import React, { useEffect, useState } from "react";
import auth from "../../assets/auth1.webp";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../actions/auth";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      // Attempt to login
      await dispatch(handleLogin(data, navigate, setEmail, setPassword));
      // If successful, navigate to home
    } catch (error) {
      // If there is an error, check if it's due to invalid credentials
      if (error.response && error.response.status === 400) {
        alert("Invalid credentials. Please try again.");
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }

    console.log("submitted");
  };

  useEffect(() => {
    document.title = `Authentication | Mythical Realm`;
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 px-16 sm:px-32 py-10">
      <div className="navBar text-center mb-2">
        <p
          onClick={() => navigate("/")}
          className="inline-block cursor-pointer"
        >
          THE <br />
          <span className="text-xl">MYTHICAL REALM</span>
        </p>
      </div>
      <div className="flex justify-center mb-5">
        <img src={auth} alt="auth" className="w-[300px]" />
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="navBar text-2xl sm:text-4xl ">
          Sign in or create an account
        </h1>
        <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail address"
            className="border border-gray-500 p-3 mb-1"
          />

          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-500 p-3 mb-1"
          />

          <button
            type="submit"
            className="bg-black hover:bg-green-600 transition-colors duration-300 text-white p-3"
          >
            Sign in
          </button>
        </form>

        {/* Note about account creation */}
        <p className="text-gray-500 text-sm text-center mt-2">
          Don’t have an account? No problem! Your account will be created
          automatically when you sign in.
        </p>
      </div>

      {/* Google login button (UNDER DEVELOPMENT) */}
      {/*      
      <div className="flex items-center justify-center my-5 w-full">
        <div className="flex-1 border-t border-dashed border-gray-400"></div>
        <p className="px-4 text-gray-600">or</p>
        <div className="flex-1 border-t border-dashed border-gray-400"></div>
      </div> 

       <div className="custom-google-login">
        <GoogleLogin
          size="large"
          type="standard"
          theme="filled_black"
          width={isMobile ? "300px" : "450px"}
          shape="circle"
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div> */}
    </div>
  );
};

export default Auth;
