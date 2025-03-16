import React, { useContext, useEffect, useState } from "react";
import VideoCard from "../Components/VideoCard";
import { AppContext } from "../Contexts/AppContext";
import banner from '../assets/images/banner.png'

const Home = () => {
  const categories = [
    "Technology",
    "Education",
    "Entertainment",
    "Gaming",
    "Music",
    "Sports",
    "News",
    "Vlogs",
    "Comedy",
    "Science",
  ];

  const { getVideos, videos, users, getUsers, SingleVideo, showChannel, addHistory} = useContext(AppContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getVideos();
    getUsers(); // ✅ Fetch all users
  }, []);

  useEffect(() => {
    // ✅ Create a map of userId -> user details for quick lookup
    const userMap = {};
    users.forEach(user => {
      userMap[user._id] = user;
    });
    setUserData(userMap);
  }, [users]);

  return (
    <>
      <div className="mt-16 ml-60 flex overflow-x-auto whitespace-nowrap px-4 py-2 bg-white ">
        {categories.map((category, index) => (
          <button
            key={index}
            className="px-4 py-2 mx-1 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="banner p-3">
        <img src={banner} className="w-[1050px] rounded-xl mr-3 ml-64"/>
      </div>

      <div className="grid grid-flow-row grid-cols-3 ml-64 ">
        {videos.map((video) => {
          const uploader = userData[video.userId]; // ✅ Find user by ID
          return (
            <VideoCard
              key={video._id}
              thumbnail={video.thumbnail}
              title={video.title}
              description={video.description}
              views={video.views}
              channelProfile={uploader?.profilePic ? uploader.profilePic : <div className="bg-blue-700 rounded-full w-11 h-11 mt-1 mr-3"><p className="ml-4 mb-1 mt-2 text-xl text-white ">{uploader?.name.slice(0,1)}</p></div>}  
              channelName={uploader?.name || "Unknown User"}  
              onClick={()=>{
                SingleVideo(video._id)
                addHistory(user._id, video._id)
              }}
              onChannelClick={()=>showChannel(video.
                userId)}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
