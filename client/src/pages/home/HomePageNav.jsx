import React from "react";
import { useNavigate } from "react-router-dom";

const HomePageNav = () => {
  const navigate = useNavigate();
  return (
    <div className="width-[100%] text-sm font-semibold text-gray-800 hidden sm:flex justify-center gap-3 items-center p-3 border-gray-300 border-b-[1px] mb-3">
      {/* <p className="hover:underline cursor-pointer">The Latest</p> */}
      <p
        onClick={() => navigate("/allStories")}
        className="hover:underline cursor-pointer"
      >
        Stories
      </p>
      <p
        onClick={() => navigate("/allBlogs")}
        className="hover:underline cursor-pointer"
      >
        Blogs
      </p>
      <p className="hover:underline cursor-pointer">Poetry</p>
      {/* <p className="hover:underline cursor-pointer">Top picks</p> */}
    </div>
  );
};

export default HomePageNav;
