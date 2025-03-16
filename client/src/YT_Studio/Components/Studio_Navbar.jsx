import React, { useRef, useState } from "react";
import {
  Menu,
  Search,
  Upload,
  Bell,
  Home,
  Video,
  BarChart,
  Settings,
} from "lucide-react";
import logo from "../../assets/images/studioLogo.svg";
import { url } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import UploadImg from "../../assets/images/upload_song.png";
import uploaded_added from "../../assets/images/upload_added.png";
import videoUpload from "../../assets/images/upload_area.png";

const Studio_Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const img = user.profilePic

  const upload_ref = useRef(null);
  const thumbnail_ref = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [category, setCategory] = useState("");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleUploadModal = () => setShowUploadModal(!showUploadModal);

  const handleUpload = async (e) => {
    
    try {
      e.preventDefault();
      const userId = localStorage.getItem("id");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("thumbnail", thumbnail);
      formData.append("videoUrl", videos);
      formData.append("userId", userId);

      setLoading(true);

      const response = await axios.post(
        `${url}/api/main/uploadVideo`,
        formData
      );
      if (response) {
        toast.success("Video uploaded successfully!");
        setTitle("");
        setDescription("");
        setCategory("Technology");
        setThumbnail(null);
        setVideos(null);
        setShowUploadModal(false);
      } else {
        toast.error("Error uploading video!");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  return (
    <div className="flex bg-gray-50 fixed top-0 left-0 w-full z-10">
      <ToastContainer />
      {/* Sidebar */}
      <aside
        className={`fixed top-[4.7rem] left-0 h-full bg-white w-60 shadow-md border-r transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="rounded-full bg-green-500 w-20 h-20 flex items-center justify-center mx-auto mt-5">
         {img ?  <img src={img} className="rounded-full" alt="" /> : <p className="text-3xl text-white">{user.name.slice(0,1)}</p>}
        </div>
        <div className="ml-20 p-5 font-semibold text-lg border-b border-gray-200 text-gray-800">
          {user.name}
        </div>
        <nav className="mt-4 space-y-1">
          <Link to="/studio">
            <SidebarItem key="dashboard" icon={<Home />} label="Dashboard" />
          </Link>
          <Link to="/studio/content">
            <SidebarItem key="content" icon={<Video />} label="Content" />
          </Link>
          <Link to="/studio/analytics">
            <SidebarItem
              key="analytics"
              icon={<BarChart />}
              label="Analytics"
            />
          </Link>
          <SidebarItem key="settings" icon={<Settings />} label="Settings" />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        {/* Navbar */}
        <nav className="w-full bg-white text-gray-900 p-4 flex items-center justify-between shadow-sm border-b">
          <div className="flex items-center gap-4">
            <Menu
              className="w-6 h-6 cursor-pointer text-gray-700 hover:text-blue-600 transition"
              onClick={toggleSidebar}
            />
            <span className="text-xl font-semibold">
              <img className="h-6 w-24" src={logo} alt="Studio Logo" />
            </span>
          </div>

          <div className="hidden md:flex w-1/3 items-center border border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent focus:outline-none text-gray-800 placeholder-gray-500"
            />
            <Search className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700 transition" />
          </div>

          <div className="flex items-center gap-4">
            <Upload
              className="w-6 h-6 cursor-pointer text-gray-700 hover:text-blue-600 transition"
              onClick={toggleUploadModal}
            />
            <Bell className="w-6 h-6 cursor-pointer text-gray-700 hover:text-blue-600 transition" />
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-400 transition">
              {!img ? (<span className="text-sm font-semibold text-gray-700">{user.name.slice(0,1)}</span>):(<img src={img}/>)}
            </div>
          </div>
        </nav>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-[60%] h-[95%] shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Upload Video
                </h2>
                <button
                  className="w-6 h-6 cursor-pointer text-gray-600 hover:text-red-500 transition"
                  onClick={() => setShowUploadModal(false)}
                >
                  X
                </button>
              </div>

              {!loading ? (
                <form onSubmit={handleUpload} className="space-y-4">
                  <div className="flex justify-center items-center gap-4">
                    <input
                      type="file"
                      ref={upload_ref}
                      style={{ display: "none" }}
                      onChange={(e) => setVideos(e.target.files[0])}
                    />
                    <input
                      type="file"
                      ref={thumbnail_ref}
                      style={{ display: "none" }}
                      onChange={(e) => setThumbnail(e.target.files[0])}
                    />
                    <label
                      onClick={() => upload_ref.current.click()}
                      className="cursor-pointer"
                    >
                      <img
                        src={videos ? uploaded_added : videoUpload}
                        className="w-24 h-24 object-cover rounded-lg shadow-md"
                        alt="Upload Video"
                      />
                      <p className="text-gray-600 my-2">Upload Video</p>
                    </label>
                    <label
                      onClick={() => thumbnail_ref.current.click()}
                      className="cursor-pointer"
                    >
                      <img
                        src={
                          thumbnail ? URL.createObjectURL(thumbnail) : UploadImg
                        }
                        className="w-24 h-24 object-cover rounded-lg shadow-md"
                        alt="Upload Thumbnail"
                      />

                      <p className="text-gray-600 m-2">Thumbnail</p>
                    </label>
                  </div>

                  <UploadInput
                    label="Video Title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter video title"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Video Description
                    </label>
                    <textarea
                      placeholder="Enter video description"
                      className="w-full h-24 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <div class="w-64">
                    <label
                      for="dropdown"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Category
                    </label>
                    <select
                      id="dropdown"
                      name="options"
                      class="mb-5 w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      value={category}
                      onChange={(e)=>setCategory(e.target.value)}
                    >
                      <option value="" className="">Select a category</option>
                      <option value="Technology">Technology</option>
                      <option value="Education">Education</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Music">Music</option>
                      <option value="Gaming">Gaming</option>
                      <option value="Sports">Sports</option>
                      <option value="News">News</option>
                      <option value="Vlogs">Vlogs</option>
                      <option value="Comedy">comedy</option>
                      <option value="Science">Science</option>
                      <option value="Lifestyle">Lifestyle</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-10"
                  >
                    Upload
                  </button>
                </form>
              ) : (
                <Loader />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 text-gray-800 hover:text-blue-600 transition duration-200">
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const UploadInput = ({ label, type, placeholder, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default Studio_Navbar;
