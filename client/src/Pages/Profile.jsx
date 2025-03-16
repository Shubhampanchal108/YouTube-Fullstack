import React, { useState } from 'react';
import { useEffect, useContext } from 'react';
import {AppContext} from '../Contexts/AppContext';

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const {getVideos, videos} = useContext(AppContext);
    
    useEffect(()=>{
        getVideos();
    },[])

    return (
        <div className="ml-52 min-h-screen bg-gray-100">
            {/* Banner */}
            <div className="p-3">
            <div className="w-full h-52 bg-blue-500 rounded-2xl"></div>
            </div>

            {/* Channel Info */}
            <div className="max-w-5xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-6  p-6 rounded-lg">
          {/* Profile Picture */}
          {user.profilePic ? (
            <img
              className="h-32 w-32 rounded-full object-cover border-2 border-gray-500 shadow-md"
              src={user.profilePic}
              alt="Profile"
            />
          ) : (
            <div className="bg-blue-600 h-32 w-32 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-md">
              {user.name.slice(0, 1)}
            </div>
          )}

          {/* Channel Details */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              {user.name}
            </h1>
            <p className="text-md text-gray-600">
              {user.subscribers} subscribers
            </p>
          </div>

          <button className="ml-auto bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition">
            Subscribe
          </button>
        </div>

                {/* Tabs */}
                <div className="mt-6 border-b border-gray-300">
                    <div className="flex space-x-6 text-gray-600 font-medium">
                        <button className="py-3 border-b-2 border-black text-black">Videos</button>
                        <button className="py-3 hover:text-black">Playlists</button>
                        <button className="py-3 hover:text-black">Community</button>
                        <button className="py-3 hover:text-black">About</button>
                    </div>
                </div>

                {/* Video Grid */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {videos.filter(video=> video.userId === localStorage.getItem("id")).map(video => (
                        <div key={video._id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                            <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="font-semibold text-lg">{video.title}</h2>
                                <p className="text-sm text-gray-600">{video.views} views • {video.createdAt.slice(0,10)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
