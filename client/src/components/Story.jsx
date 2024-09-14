/**
 * This is the base story component that is used where ever it is needed.
 */

import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Corrected import
import { handleDeleteStory } from "../actions/story";
import { useDispatch } from "react-redux";

const Story = ({ story }) => {
  const location = useLocation();
  const [Admin, setAdmin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the user is admin so we can show the delete button.
    const storedUser = JSON.parse(localStorage.getItem("Profile"));
    const token = storedUser?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.email === import.meta.env.VITE_ADMIN_EMAIL) {
        setAdmin(true);
      }
    }
  }, [location, Admin]);

  const slug = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  // Handle delete story
  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this story?")) {
        await dispatch(handleDeleteStory(id));
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className="flex flex-col p-4">
      {/* Mobile View - flex-row for details and image side by side */}
      <Link
        key={`${story._id}-mobile`} // Unique key for mobile
        className="chapter-card cursor-pointer flex flex-row sm:hidden"
        to={`/story/${slug(story.storyCategory)}/${slug(
          story.storyName
        )}?storyId=${story._id}`}
      >
        {/* Story Details - Left Side in Mobile */}
        <div className="w-2/3 flex flex-col justify-center gap-1 pr-4">
          <p className="text-red-500 font-patrick text-sm">
            {story.storyCategory}
          </p>
          <h2 className="text-lg mb-1 hover:underline">{story.storyName}</h2>
          <p className="text-gray-700 text-sm mb-2 ">
            {story.storyDescription.length > 90 ? (
              <>
                {story.storyDescription.slice(0, 90)}
                <span className="text-blue-500">... Read more</span>
              </>
            ) : (
              story.storyDescription
            )}
          </p>
          <p className="font-inter font-semibold text-gray-900 text-xs">
            By {story.storyAuthor ? story.storyAuthor : "Anonymous"}
          </p>
        </div>
        {/* Image - Right Side in Mobile */}
        <div className="w-1/3 flex justify-center items-center">
          <img
            src={story.storyImage}
            alt={story.storyName}
            className="object-cover w-[100%] h-[90%] rounded-sm"
          />
        </div>
      </Link>

      {/* Desktop View - flex-col for details and image stacked */}
      <Link
        key={`${story._id}-desktop`} // Unique key for desktop
        className="chapter-card cursor-pointer hidden sm:flex sm:flex-col"
        to={`/story/${slug(story.storyCategory)}/${slug(
          story.storyName
        )}?storyId=${story._id}`}
      >
        <img
          src={story.storyImage}
          alt={story.storyName}
          className="object-cover w-full max-h-[415px] rounded-sm mb-4"
        />
        <div className="flex flex-col font-crimson">
          <p className="text-red-500 font-patrick text-lg">
            {story.storyCategory}
          </p>
          <h2 className="text-xl lg:text-2xl mb-1 hover:underline">
            {story.storyName}
          </h2>
          <p className="text-gray-700 text-md mb-2 ">
            {story.storyDescription.length > 100 ? (
              <>
                {story.storyDescription.slice(0, 100)}
                <span className="text-blue-500">... Read more</span>
              </>
            ) : (
              story.storyDescription
            )}
          </p>
          <p className="font-inter font-semibold text-gray-900 text-sm">
            By {story.storyAuthor ? story.storyAuthor : "Anonymous"}
          </p>
        </div>
      </Link>

      {Admin && (
        <div className="mt-2">
          <button
            className="text-red-500 hover:underline"
            onClick={() => handleDelete(story._id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Story;
