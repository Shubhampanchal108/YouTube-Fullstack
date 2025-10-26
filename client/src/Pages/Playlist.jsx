import React from "react";
import demo from '../assets/images/images.jpeg'

export default function YouTubePlaylistPage() {
  const playlists = [
    {
      title: "Frontend Development",
      videos: 12,
      thumbnail: demo,
    },
    {
      title: "React Tutorials",
      videos: 24,
      thumbnail: demo,
    },
    {
      title: "AI Tools",
      videos: 8,
      thumbnail: demo,
    },
    {
      title: "Music & LoFi",
      videos: 15,
      thumbnail: demo,
    },
  ];

  return (
    <div className="mt-12 ml-64 min-h-screen bg-white text-gray-900 p-6">
        <div className="flex flex-row items-start justify-between mb-8 mt-5">

      <h1 className="text-3xl font-bold ">Your Playlists</h1>
      <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition">
        ➕ New Playlist
      </button>
        </div>
      

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {playlists.map((playlist, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow hover:shadow-md transition duration-300 border border-gray-200"
          >
            <img
              src={playlist.thumbnail}
              alt={playlist.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{playlist.title}</h2>
              <p className="text-sm text-gray-500">{playlist.videos} videos</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
