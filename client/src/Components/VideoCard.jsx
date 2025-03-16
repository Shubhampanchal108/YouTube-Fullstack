import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";


const VideoCard = ({
  thumbnail,
  title,
  channelProfile,
  channelName,
  views,
  onClick,
  onChannelClick,
}) => {

  // const {SingleVideo} = useContext(AppContext)
  return (
    <div className="border my-2 w-full sm:w-[22rem] p-2 cursor-pointer hover:bg-gray-200 rounded-lg">
      {/* Thumbnail */}
      <img src={thumbnail} alt={title} className="w-full h-44 object-cover rounded-lg" onClick={onClick}/>
      
      {/* Video Info */}
      <Link to='/otherChannel'><div className="flex mt-2">
        {/* Channel Profile */}
        {channelProfile ? <img
          src={channelProfile}
          className="w-10 h-10 rounded-full mr-3 object-fit"
        onClick={onChannelClick}/>: <div onClick={onChannelClick} className="bg-blue-700 rounded-full w-11 h-11 mt-1 mr-3"><p className="ml-4 mb-1 mt-2 text-xl text-white">{channelName.slice(0,1)}</p></div>}
        
        {/* Video Details */}
        <div className="flex-1">
          <h3 className="text-sm font-semibold line-clamp-2">{title}</h3>
          <p className="text-xs text-gray-500 flex items-center">
            {channelName} <FaCheckCircle className="text-blue-500 ml-1" />
          </p>
          <p className="text-xs text-gray-500">
            {views} views • {}
          </p>
          {/* {description && (
            <p className="text-xs text-gray-400 line-clamp-2 mt-1">{description}</p>
          )} */}
        </div>
      </div></Link>

    </div>
  );
};

export default VideoCard;
