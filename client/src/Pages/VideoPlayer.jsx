import React, { useContext, useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaShare, FaEye } from "react-icons/fa";
import { AppContext } from "../Contexts/AppContext";
import like from "../assets/images/like.png";
import Liked from "../assets/images/liked.png";
import dislike from "../assets/images/dislike.png";

function VideoPlayer() {
  const [liked, setLiked] = useState(false);
  const [userData, setUserData] = useState({});

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    { user: "User1", text: "Amazing video! Learnt a lot." },
    { user: "CoderX", text: "Thanks for the explanation!" },
    { user: "TechFan", text: "React + Tailwind = Love 😍" },
  ]);

  const {
    getVideos,
    videos,
    SingleVideo,
    subscribeBtn,
    setSubscribeBtn,
    subscribe,
    unSubscribe,
    Like,
    removeLike,
    users,
    addComment,
    getComments,
    commnets,
  } = useContext(AppContext);

  const videoData = JSON.parse(localStorage.getItem("singleVideoData")) || {};
  const user = JSON.parse(localStorage.getItem("user")) || {
    subscribedUsers: [],
  };
  const channel = JSON.parse(localStorage.getItem("channel")) || {};
  const subscriberId = localStorage.getItem("id") || "";
  const channelId = channel?._id || "";

  useEffect(() => {
    getVideos();
    getComments(videoData._id);
  }, []);

  useEffect(() => {
    // ✅ Create a map of userId -> user details for quick lookup
    const userMap = {};
    users.forEach((user) => {
      userMap[user._id] = user;
    });
    setUserData(userMap);
  }, [users]);

  useEffect(() => {
    if (user?.subscribedUsers?.includes(channelId)) {
      setSubscribeBtn(true);
    } else {
      setSubscribeBtn(false);
    }

    if (videoData?.likes?.includes(user._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  });

  const toogleLike = () => {
    setLiked(!liked);
  };

  const handleAddComment = async () => {
    try {
      await addComment(videoData._id, user._id, newComment);
      setNewComment("");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="mb-2 p-2 mt-20 flex flex-col bg-gray-100">
      <div className="flex flex-1 p-4 gap-6 max-w-9xl">
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
          <video controls className="w-full rounded-lg shadow-lg">
            <source src={localStorage.getItem("videoLink")} type="video/mp4" />
          </video>

          <h2 className="text-2xl font-bold mt-4">
            {videoData?.title || "Untitled Video"}
          </h2>
          <p className="text-gray-600 mt-2">
            {videoData?.description || "No description available."}
          </p>

          <div className="mt-2 flex items-center gap-6 text-gray-700">
            <button
              onClick={toogleLike}
              className="flex items-center gap-2 hover:text-blue-600 transition duration-200"
            >
              {liked ? (
                <img
                  src={Liked}
                  className="h-6 mt-1"
                  onClick={() => removeLike(user._id, videoData._id)}
                />
              ) : (
                <img
                  src={like}
                  className="h-6 mt-1"
                  onClick={(e) => Like(user._id, videoData._id)}
                />
              )}{" "}
              <p className="h-6 mt-1">{videoData.likes.length}</p>
            </button>
            <button className="flex items-center gap-2 hover:text-red-600 transition duration-200">
              <img src={dislike} className="h-6 mt-2" /> Dislike
            </button>
            <button className="flex items-center gap-2 hover:text-green-600 transition duration-200">
              <FaShare /> Share
            </button>
            <FaEye /> {videoData?.views || 0} views
          </div>

          <div className="border mt-6 flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-4">
              {videoData?.userId?.profilePic ? (
                <img
                  src={videoData.userId.profilePic}
                  alt="Channel Logo"
                  className="w-14 h-14 rounded-full border object-cover cursor-pointer"
                />
              ) : (
                <div className="bg-blue-700 w-12 h-12 rounded-full border object-cover cursor-pointer">
                  <p className="mt-2 ml-4 text-xl text-white cursor-pointer">
                    {videoData?.userId?.name?.charAt(0) || "C"}
                  </p>
                </div>
              )}
              <div>
                <p className="font-semibold text-lg">
                  {videoData?.userId?.name || "Unknown Channel"}
                </p>
                <p className="text-sm text-gray-500">
                  {videoData?.userId?.subscribers || 0} Subscribers
                </p>
              </div>
            </div>
            {!subscribeBtn ? (
              <button
                onClick={() => subscribe(subscriberId, channelId)}
                className="ml-auto bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
              >
                Subscribe
              </button>
            ) : (
              <button
                onClick={() => unSubscribe(subscriberId, channelId)}
                className="ml-auto bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-700 transition"
              >
                Subscribed
              </button>
            )}
          </div>

          <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a public comment..."
              />
              <button
                onClick={handleAddComment}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Comment
              </button>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Comments</h3>
            <div className="space-y-5 bg-white p-4 rounded-2xl border border-gray-200">
              {commnets.map((comment, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 border-b pb-3 last:border-none"
                >
                  {comment.userId.profilePic ? (
                    <img
                      src={comment.userId.profilePic}
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full border object-cover cursor-pointer"
                    />
                  ) : (
                    <div className="bg-blue-700 w-12 h-12 rounded-full border object-cover cursor-pointer">
                      <p className="mt-2 ml-4 text-xl text-white cursor-pointer">
                        {comment.userId.name.charAt(0) || "U"}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-base font-semibold text-gray-800">
                      {comment.userId.name}
                    </p>
                    <p className="text-md text-gray-800 mt-1">
                      {comment.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="w-1/3 max-w-sm space-y-4 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold border-b pb-2">
            Suggested Videos
          </h3>
          {videos.map((video, index) => {
            const uploader = userData[video.userId];
            return (
              <div
                key={index}
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition duration-200"
                onClick={() => SingleVideo(video._id)}
              >
                <img
                  src={video.thumbnail}
                  alt="Thumbnail"
                  className="w-24 h-16 object-cover rounded-md"
                />
                <div>
                  <p className="text-sm font-medium">{video.title}</p>
                  <p className="text-xs text-gray-500">
                    {uploader?.name || "Undefined"}
                  </p>
                  <p className="text-xs text-gray-500">{video.views} views</p>
                </div>
              </div>
            );
          })}
        </aside>
      </div>
    </div>
  );
}

export default VideoPlayer;
