import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const watchTimeData = [
    { day: 'Mon', watchTime: 120 },
    { day: 'Tue', watchTime: 200 },
    { day: 'Wed', watchTime: 150 },
    { day: 'Thu', watchTime: 300 },
    { day: 'Fri', watchTime: 250 },
    { day: 'Sat', watchTime: 400 },
    { day: 'Sun', watchTime: 350 },
];

const stats = [
    { label: 'Views', value: '56.3K', color: 'bg-blue-500' },
    { label: 'Watch Time (Hours)', value: '4.8K', color: 'bg-green-500' },
    { label: 'Subscribers', value: '+320', color: 'bg-yellow-500' },
    { label: 'Estimated Revenue', value: '$1,250', color: 'bg-red-500' },
];

const Analytics = () => {
    return (
        <div className="ml-60 min-h-screen bg-gray-100 p-6 space-y-6 font-sans">
            {/* Header */}
            <h1 className="text-3xl font-bold text-gray-800">Analytics Overview</h1>

            {/* Performance Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className={`p-6 rounded-lg shadow-lg ${stat.color} text-white flex flex-col items-center`}>
                        <div className="text-sm font-medium">{stat.label}</div>
                        <div className="text-3xl font-bold mt-2">{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Watch Time Graph */}
            <div className="bg-white p-6 shadow rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Watch Time (Last 7 Days)</h2>
                <LineChart width={1000} height={300} data={watchTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="watchTime" stroke="#FF0000" strokeWidth={2} />
                </LineChart>
            </div>

            {/* Real-time Views */}
            <div className="bg-white p-6 shadow rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Real-Time Views (Last 48 Hours)</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="p-4 rounded-lg text-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md">
                            <div className="text-sm">Hour {i + 1}</div>
                            <div className="text-2xl font-bold mt-1">{Math.floor(Math.random() * 500)}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Performing Videos */}
            <div className="bg-white p-6 shadow rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Performing Videos</h2>
                <div className="space-y-4">
                    {[
                        { title: 'React Dashboard Full Tutorial', views: '12K', watchTime: '850 hours' },
                        { title: 'Tailwind CSS Complete Guide', views: '9.4K', watchTime: '640 hours' },
                        { title: 'Recharts Deep Dive', views: '7.1K', watchTime: '520 hours' },
                    ].map((video, index) => (
                        <div key={index} className="flex justify-between items-center p-4 border-b bg-gray-50 hover:bg-gray-100 transition rounded-md">
                            <div>
                                <div className="font-semibold text-gray-800">{video.title}</div>
                                <div className="text-gray-600 text-sm">{video.views} views · {video.watchTime}</div>
                            </div>
                            <div className="text-blue-500 cursor-pointer hover:underline">View Details</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
