import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { FaUser, FaEye, FaClock, FaDollarSign } from 'react-icons/fa';

const data = [
    { day: 'Mon', views: 400 },
    { day: 'Tue', views: 600 },
    { day: 'Wed', views: 300 },
    { day: 'Thu', views: 700 },
    { day: 'Fri', views: 500 },
    { day: 'Sat', views: 800 },
    { day: 'Sun', views: 650 },
];



const Charts = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const subscriber = user.subscribers

    const stats = [
        { title: 'Subscribers', value: subscriber, icon: <FaUser className="text-white text-2xl" />, color: 'from-red-500 to-red-600' },
        { title: 'Total Views', value: '56.3K', icon: <FaEye className="text-white text-2xl" />, color: 'from-blue-500 to-blue-600' },
        { title: 'Watch Time (Hours)', value: '4.8K', icon: <FaClock className="text-white text-2xl" />, color: 'from-green-500 to-green-600' },
        { title: 'Estimated Revenue', value: '$1,250', icon: <FaDollarSign className="text-white text-2xl" />, color: 'from-yellow-500 to-yellow-600' },
    ];
    return (
        <div className="min-h-screen bg-gray-100 p-6 space-y-6 ml-60">
            {/* Header */}
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className={`h-36 p-6 rounded-lg shadow-lg bg-gradient-to-r ${stat.color} text-white flex items-center space-x-4`}>
                        <div className="p-3 bg-white bg-opacity-30 rounded-full">
                            {stat.icon}
                        </div>
                        <div>
                            <div className="text-sm">{stat.title}</div>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Views Graph */}
            <div className="bg-white p-6 shadow rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Views in Last 7 Days</h2>
                <LineChart width={1000} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="#FF0000" strokeWidth={2} />
                </LineChart>
            </div>

            {/* Recent Videos Section */}
            <div className="bg-white p-6 shadow rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Recent Videos</h2>
                <div className="space-y-4">
                    {[
                        { title: 'How to Build React Dashboard', views: '2.1K', time: '2 days ago' },
                        { title: 'Understanding Recharts in React', views: '1.5K', time: '5 days ago' },
                        { title: 'Tailwind CSS Crash Course', views: '3.2K', time: '1 week ago' }
                    ].map((video, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border-b hover:bg-gray-50 transition">
                            <div className="text-sm">
                                <div className="font-semibold">{video.title}</div>
                                <div className="text-gray-500">{video.views} views · {video.time}</div>
                            </div>
                            <div className="text-blue-500 cursor-pointer">View Details</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Charts;
