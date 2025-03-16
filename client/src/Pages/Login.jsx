import React, { useState } from "react";
import { FaYoutube } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../App";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const Navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async(e) => {
    e.preventDefault();
    console.log("Email Submitted:", email);
    console.log("Password Submitted:", password);

    const formData = { email, password };

    const response = await axios.post(`${URL}/api/main/login`, formData);
    console.log(response)

    if (response.data.success) {
      setEmail("");
      setPassword("");
      toast.success("Login Successfully ");

      localStorage.setItem("token", response.data.jwt)
      localStorage.setItem("name", response.data.user.name)
      localStorage.setItem("username", response.data.user.username)
      localStorage.setItem("email", response.data.user.email)
      localStorage.setItem("id", response.data.user._id)
      localStorage.setItem("user", JSON.stringify(response.data.user))

      setTimeout(()=>{
        Navigate("/")
      }, 2000)

    }
    else{
      toast.error("Email or passowrd is incorrect")
    }
    
  };

  return (
    <>
    <ToastContainer/>
    
    <div className="mx-[27rem] my-24 bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
      {/* YouTube Logo */}
      <div className="flex justify-center">
        <FaYoutube className="text-red-600 text-6xl" />
      </div>
      <h2 className="text-2xl font-semibold text-center mt-4">Sign in</h2>
      <p className="text-center text-gray-600 mb-6">to continue to YouTube</p>

      {/* Email Input */}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email or phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Forgot Email Link */}
        <div className="mb-4 text-right">
          <a href="#" className="text-blue-600 text-sm hover:underline">
            Forgot email?
          </a>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <Link to="/signUp" className="text-blue-600 text-sm hover:underline">
            Create account
          </Link>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default Login;
