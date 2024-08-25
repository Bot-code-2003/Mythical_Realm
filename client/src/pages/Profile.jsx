import React from "react";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const token = localStorage.getItem("Profile");
  const decodedToken = jwtDecode(token);
  const email = decodedToken.email;
  return (
    <div className="p-10 flex flex-col justify-center items-center">
      <h1 className="text-5xl font-kalam mb-5">Hello User</h1>
      <div className="border border-gray-200 p-10">
        <p className="text-sm text-gray-500 font-inter">Email</p>
        <p className="text-lg font-libre">{email}</p>
      </div>
    </div>
  );
};

export default Profile;
