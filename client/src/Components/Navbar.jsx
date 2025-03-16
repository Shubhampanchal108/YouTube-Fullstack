import { useContext, useState } from "react";
import { FaBars, FaSearch, FaVideo, FaBell, FaUserCircle, FaHome, FaFire, FaPlayCircle, FaBookmark, FaHistory } from "react-icons/fa";
import ytLogo from '../assets/images/youtube.png'
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { AppContext } from "../Contexts/AppContext";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const Navigate = useNavigate();
  const profilePic = localStorage.getItem("profilePic");
  const {sidebarOpen, setSidebarOpen} = useContext(AppContext)

  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [uploadVideo, setUploadVideo] = useState(false);

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("user")
    localStorage.removeItem("videoLink")
    localStorage.removeItem("channel")
    

    toast.success("Logout Successfully");

    setTimeout(()=>{
      Navigate("/login")
    }, 2000)
  }


  return (
    <><ToastContainer/>
    <div className="flex flex-col">
      {/* Sidebar */}
      <div className={`shadow-lg fixed top-0 left-0 h-full w-64 bg-white  transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
        <ul className="mt-16 p-4">
          <Link to='/' className="flex items-center gap-4 py-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md"><FaHome />Home</Link>
          <Link to='/trending'><li className="flex items-center gap-4 py-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md"><FaFire /> Trending</li></Link>
          <Link to='/subscribedChannel'><li className="flex items-center gap-4 py-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md"><FaPlayCircle /> Subscriptions</li></Link>
          <li className="flex items-center gap-4 py-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md"><FaBookmark /> Library</li>
          <Link to='/history'><li className="flex items-center gap-4 py-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md"><FaHistory /> History</li></Link>
        </ul>
      </div>
      
      <div className="flex-1">
        {/* Navbar */}
        <nav className="shadow-md flex items-center justify-between px-4 py-2 bg-white text-black  relative">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <FaBars className="text-xl cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)} />
            <h1 className="text-2xl font-bold text-red-500">
                <img src={ytLogo} className="ml-4 h-7 w-32" />
            </h1>
          </div>
          
          {/* Center Section (Search Bar) */}
          <div className="flex items-center border border-gray-300 rounded-full overflow-hidden w-1/2">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 w-full text-black outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="p-3 bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
              <FaSearch className="text-black text-lg" />
            </button>
          </div>
          
          {/* Right Section */}
          <div className="flex items-center gap-5 relative">
            <FaVideo className="text-xl cursor-pointer" onClick={()=> setUploadVideo(!uploadVideo)}/>
            <FaBell className="text-xl cursor-pointer" />
            <div className="relative cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
            {(user.profilePic) ? <img src={user.profilePic} className="object-cover max-h-10 max-w-10 rounded-full"/>: <div className="bg-purple-700 border rounded-full w-[1.6rem]"><p className="text-white ml-[6px]">{(user.name)? user.name.slice(0,1): ""}</p></div>}
              
              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-md z-10">
                  <ul className="py-2">
                   <li  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"> <Link to='/yourChannel'>My Channel</Link></li>
                   <li  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"> <Link to='/studio'>YT Studio</Link></li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={logout}>Logout</li>
                  </ul>
                </div>
              )}
              {uploadVideo && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-md z-10">
                  <ul className="py-2">
                  <li  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"> <Link to='/studio'>Upload Video</Link></li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Go Live</li>
                    {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={logout}>Logout</li> */}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Categories Section */}
      
      </div>
    </div>
    </>
  );
};

export default Navbar;
