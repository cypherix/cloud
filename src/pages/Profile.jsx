import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/UserSlice";
import toast from "react-hot-toast";
const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login")
    toast.success("Logout Successful");
    dispatch(logout());
      
  }
  return (
    <div className="w-full min-h-fit p-10 md:p-20">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Profile Details</h1>
        
        {/* Profile Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side Content */}
          <div>
            <h2 className="text-xl font-medium mb-2">Personal Info</h2>
            <p>Name: {user.user.username}</p>
            <p>Email: {user.user.email}</p>
            <p>Location: {user.user.location}</p>
          </div>
          
          {/* Right Side Content */}
          <div>
            <h2 className="text-xl font-medium mb-2">Additional Details</h2>
            <p>Member Since: January 2020</p>
            <p>Subscription: Premium</p>
            <p>Interests: Running, Hiking</p>
          </div>
        </div>
        
        {/* Profile Actions */}
        <div className="mt-6">
          <button onClick={handleLogout} className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
