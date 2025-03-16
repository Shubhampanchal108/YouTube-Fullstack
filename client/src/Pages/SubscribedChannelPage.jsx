import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Contexts/AppContext";

const SubscribedChannels = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const {getSubscribedChannels, subscription} = useContext(AppContext)

  useEffect(()=>{
    getSubscribedChannels(user._id)
  },[])

  return (
    <div className="mt-20 ml-60 bg-white text-gray-900 p-6 max-w-screen">
      <h1 className="text-3xl font-bold mb-6">Subscribed Channels</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">
        {subscription.map((channel) => (
          <div
            key={channel._id}
            className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 cursor-pointer"
          >
            {channel.channelId.profilePic ? <img
              src={channel.channelId.profilePic}
              className="w-24 h-24 rounded-full object-cover mr-4 border-2"
            /> : (<div className="bg-blue-700 rounded-full h-24 w-24 mr-5 "><p className="text-4xl text-white mt-7 ml-9">{channel.channelId.name.slice(0,1)}</p></div>)}
            <div>
              <span className="text-lg font-semibold block">{channel.channelId.name}</span>
              <span className="text-sm text-gray-800 font-semibold block">Username: {channel.channelId.username}</span>
              <span className="text-sm text-gray-600">{channel.channelId.subscribers} Subscribers</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscribedChannels;
