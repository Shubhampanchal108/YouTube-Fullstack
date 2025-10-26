import React, { useContext, useEffect } from 'react';
import { FaEye, FaClock, FaComment, FaThumbsUp, FaEllipsisV } from 'react-icons/fa';
import img from '../../assets/images/images.jpeg';
import {AppContext} from '../../Contexts/AppContext'


const Content = () => {

    const {getVideos, videos,getComments, commnets,} = useContext(AppContext)

    useEffect(()=>{
        getVideos()
        // getComments()
    }, [])
    return (
        <div className="ml-56 min-h-screen bg-gray-100 p-6 space-y-5 font-sans">
            <h1 className="text-3xl font-bold text-gray-800">Your Videos</h1>

            <div className="bg-white p-4 rounded-lg shadow">
                <table className="w-full table-auto">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="text-left p-2">Video</th>
                            <th className="p-2">Views</th>
                            <th className="p-2">Comments</th>
                            <th className="p-2">Likes</th>
                            <th className="p-2">Uploaded</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videos.filter(video=> video.userId === localStorage.getItem("id")).map((video) =>{
                            // const comment = getComments(video._id)
                            return (
                            <tr key={video.id} className="border-b hover:bg-gray-50">
                                <td className="flex items-center space-x-4 p-3">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-20 h-12 rounded-sm object-cover"
                                    />
                                    <div>
                                        <div className="font-semibold text-gray-800">{video.title.slice(0, 40)}...</div>
                                        <div className="text-sm text-gray-600 flex items-center space-x-2">
                                            <FaClock className="text-gray-500" />
                                            <span>{video.duration}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center p-2">
                                    <div className="flex items-center justify-center space-x-1">
                                        <FaEye className="text-blue-500" />
                                        <span>{video.views}</span>
                                    </div>
                                </td>
                                <td className="text-center p-2">
                                    <div className="flex items-center justify-center space-x-1">
                                        <FaComment className="text-green-500" />
                                        <span>{commnets.length}</span>
                                    </div>
                                </td>
                                <td className="text-center p-2">
                                    <div className="flex items-center justify-center space-x-1">
                                        <FaThumbsUp className="text-red-500" />
                                        <span>{video.likes.length}</span>
                                    </div>
                                </td>
                                <td className="text-center p-2 text-gray-600">{video.createdAt.slice(0, 10)}</td>
                                <td className="text-center p-2">
                                    <button className="p-2 rounded-full hover:bg-gray-200">
                                        <FaEllipsisV />
                                    </button>
                                </td>
                            </tr>
                        )})}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Content;
