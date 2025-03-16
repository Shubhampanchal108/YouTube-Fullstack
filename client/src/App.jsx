import React, { useEffect } from "react";
import Navbar from "./Components/Navbar";
import Profile from "./Pages/Profile";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Studio_Navbar from "./YT_Studio/Components/Studio_Navbar";
import Dashboard from "./YT_Studio/Pages/Dashboard";
import Analytics from "./YT_Studio/Pages/Analytics";
import Content from "./YT_Studio/Pages/Content";
import VideoPlayer from "./Pages/VideoPlayer";
import History from "./Pages/History";
import ChannelPage from "./Pages/ChannelPage";
import SubscribedChannels from "./Pages/SubscribedChannelPage";
import Trending from "./Pages/Trending";

export const URL = `http://localhost:5000`;
export const url = `http://localhost:5000`;

const App = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signUp";
  const isStudioPage = location.pathname.startsWith("/studio");

  useEffect(() => {
    if (!token && !isAuthPage) {
      navigate("/login");
    }
  }, [token, isAuthPage, navigate]);

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    );
  }

  if (isStudioPage) {
    return (
      <>
      <Studio_Navbar />
      <Routes>
        <Route path="/studio" element={<Dashboard/>} />
        <Route path="/studio/analytics" element={<Analytics/>} />
        <Route path="/studio/content" element={<Content/>} />
      </Routes>
      </>
    );
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full">
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/yourChannel" element={<Profile />} />
        <Route path="/otherChannel" element={<ChannelPage />} />
        <Route path="/videoPlayer" element={<VideoPlayer />} />
        <Route path="/history" element={<History/>} />
        <Route path="/subscribedChannel" element={<SubscribedChannels/>} />
        <Route path="/trending" element={<Trending/>} />
      </Routes>
    </>
  );
};

export default App;