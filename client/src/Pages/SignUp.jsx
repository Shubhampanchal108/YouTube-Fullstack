import React, { useState } from "react";
import { FaYoutube } from "react-icons/fa";
import { URL } from "../App";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const Navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("Sign Up Details:", { name, username, email, password, profilePic });
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }
    
    try {
      const response = await axios.post(`${URL}/api/main/signUp`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.data.success) {
        setName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setProfilePic(null);
        toast.success(response.data.msg);

        const token = response.data.jwt;
        localStorage.setItem("token", token);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("profilePic", response.data.user.profilePic);
        localStorage.setItem("user", JSON.stringify(response.data.user))

        setTimeout(() => {
          Navigate("/");
        }, 2000);
      } else {
        toast.error("Account creation failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="mx-[27rem] my-24 bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-center">
          <FaYoutube className="text-red-600 text-6xl" />
        </div>
        <h2 className="text-2xl font-semibold text-center mt-4">Create your Google Account</h2>
        <p className="text-center text-gray-600 mb-6">to continue to YouTube</p>

        <form onSubmit={handleSignUp}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div className="mb-4">
            <input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div className="mb-4">
            <input type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div className="mb-4">
            <input type="file" accept="image/*" onChange={(e) => setProfilePic(e.target.files[0])} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">Sign Up</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
