import React, { useState, useEffect } from "react";
import { FaFire } from "react-icons/fa";


const Trending = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setVideos([
        {
          id: 1,
          title: "AI Revolution: What's Next?",
          channel: "TechWorld",
          views: "1.2M",
          thumbnail: "https://source.unsplash.com/400x250/?technology",
        },
        {
          id: 2,
          title: "10 Life-Changing Productivity Hacks",
          channel: "SelfGrowth",
          views: "850K",
          thumbnail: "https://source.unsplash.com/400x250/?motivation",
        },
        {
          id: 3,
          title: "The Future of Electric Cars",
          channel: "AutoTech",
          views: "620K",
          thumbnail: "https://source.unsplash.com/400x250/?car",
        },
      ]);
      setChannels([
        {
          id: 1,
          name: "TechWorld",
          logo: "https://source.unsplash.com/50x50/?tech",
          subscribers: "3.5M",
        },
        {
          id: 2,
          name: "SelfGrowth",
          logo: "https://source.unsplash.com/50x50/?motivation",
          subscribers: "2.1M",
        },
        {
          id: 3,
          name: "AutoTech",
          logo: "https://source.unsplash.com/50x50/?car",
          subscribers: "1.8M",
        },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="p-6 ml-60 mt-2 ">
        <div className="mt-16 ">
        <h2 className="text-3xl font-bold mb-8">Trending Channels</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading
            ? Array(3)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="w-full h-[100px] rounded-lg bg-gray-300 animate-pulse"></div>
                ))
            : channels.map((channel) => (
                <div
                  key={channel.id}
                  className="p-3 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer bg-white flex items-center"
                >
                  <img
                    src={channel.logo}
                    alt={channel.name}
                    className="rounded-full w-12 h-12 mr-3"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{channel.name}</h3>
                    <p className="text-sm text-gray-500">{channel.subscribers} subscribers</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <hr/>
      <div className="flex items-center text-2xl font-bold mt-16 mb-6">
        <FaFire className="text-red-500 mr-2" /> Trending Now
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="w-full h-[200px] rounded-lg bg-gray-300 animate-pulse"></div>
              ))
          : videos.map((video) => (
              <div
                key={video.id}
                className="p-3 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer bg-white"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="rounded-lg w-full h-44 object-cover"
                />
                <div className="mt-3">
                  <h3 className="font-semibold text-lg">{video.title}</h3>
                  <p className="text-sm text-gray-500">{video.channel}</p>
                  <p className="text-sm text-gray-400">{video.views} views</p>
                </div>
              </div>
            ))}
      </div>
      
    </div>
  );
};

export default Trending;
