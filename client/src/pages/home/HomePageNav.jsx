import React from "react";
import { useNavigate } from "react-router-dom";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import ScheduleIcon from "@mui/icons-material/Schedule";
import BookIcon from "@mui/icons-material/Book";
import HailIcon from "@mui/icons-material/Hail";

const HomePageNav = () => {
  const navigate = useNavigate();
  return (
    <div className="width-[100%] text-sm font-semibold text-gray-800 hidden sm:flex justify-center gap-3 items-center p-3 border-gray-300 border-b-[1px] mb-3">
      {/* <p className="hover:underline cursor-pointer flex justify-between items-center gap-1">The Latest</p> */}
      <p
        onClick={() => navigate("/allStories")}
        className="hover:underline cursor-pointer flex justify-between items-center gap-1"
      >
        <AutoStoriesIcon fontSize="small" />
        Stories
      </p>
      {/* <p className="hover:underline cursor-pointer flex justify-between items-center gap-1">
        <ScheduleIcon fontSize="small" /> Latest Stories
      </p>
      <p className="hover:underline cursor-pointer flex justify-between items-center gap-1">
        <HailIcon fontSize="small" /> Our Top-picks
      </p>
      <p className="hover:underline cursor-pointer flex justify-between items-center gap-1">
        <WhatshotIcon fontSize="small" /> Trending
      </p> */}
      <p
        onClick={() => navigate("/allBlogs")}
        className="hover:underline cursor-pointer flex justify-between items-center gap-1"
      >
        <BookIcon fontSize="small" />
        Blogs
      </p>
      {/* <p className="hover:underline cursor-pointer flex justify-between items-center gap-1">Top picks</p> */}
    </div>
  );
};

export default HomePageNav;
