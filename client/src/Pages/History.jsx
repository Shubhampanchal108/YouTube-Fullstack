import React, { useState, useEffect, useContext } from "react";
import { PlayCircle } from "lucide-react";
import img from '../assets/images/images.jpeg'
import { AppContext } from "../Contexts/AppContext";

const History = () => {
  const {GetHistory,history} = useContext(AppContext);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(()=>{
    GetHistory(user._id);
  },[])

 
  return (
    <div className="mt-10 p-10 max-w-4xl ml-20">
      <h1 className="text-4xl font-bold mb-8 ml-44">Watch History</h1>
      <hr className="mb-3"/>
      <div className="grid grid-cols-1 gap-8  max-w-lg mx-auto">
        {/* {history.length > 0 ? ( */}
          {history.map((video, index) => (
            <div key={index} className="p-1 flex items-center gap-4 rounded-lg border-r-2">
              <img
                src={video.videoId.thumbnail}
                alt={video.title}
                className="w-48 h-28 rounded-md object-cover"
              />
              <div className="text-left">
                <h2 className="text-lg font-semibold">{video.videoId.title}</h2>
                <p className="text-sm text-gray-500">{video.videoId.description.slice(0,40)}</p>
                <button className="bg-blue-500 mt-2 flex rounded-md p-1 items-center gap-1 text-white">
                  <PlayCircle size={16} /> Watch Again
                </button>
              </div>
            </div>
          ))}
         
      </div>
    </div>
  );
};

export default History;
