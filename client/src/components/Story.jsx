import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { handleDeleteStory } from "../actions/story";
import { useDispatch } from "react-redux";

const Story = ({ story }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [Admin, setAdmin] = useState(false); // Use useState for Admin

  const dispatch = useDispatch();

  useEffect(() => {
    // Scroll to top when the component mounts
    const storedUser = JSON.parse(localStorage.getItem("Profile"));
    const token = storedUser?.token;
    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.email === import.meta.env.VITE_ADMIN_EMAIL) {
        setAdmin(true); // Update the Admin state
      }
    }
  }, [location, Admin]);

  const slug = (name) => {
    return name
      .toLowerCase() // Convert to lowercase
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, "") // Remove all non-word characters except hyphens
      .replace(/\-\-+/g, "-") // Replace multiple hyphens with a single hyphen
      .replace(/^-+/, "") // Trim hyphens from the start
      .replace(/-+$/, ""); // Trim hyphens from the end
  };

  const handleStoryClick = () => {
    const storyCategory = slug(story.storyCategory);
    const storyName = slug(story.storyName);
    const storyId = story._id;
    // Navigate to the detailed story page
    navigate(`/story/${storyCategory}/${storyName}/${storyId}`);
  };

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
    <div className="flex flex-col">
      <div
        className="story-card hover:cursor-pointer"
        onClick={handleStoryClick}
      >
        <img
          src={story.storyImage}
          alt={story.storyName}
          className="object-cover min-h-[480px] max-h-[480px] sm:min-h-[360px] sm:max-h-[360px] w-full rounded-sm mb-4"
        />
        <div className="flex flex-col font-crimson">
          <p className="text-red-500 font-patrick text-lg">
            {story.storyCategory}
          </p>
          <h2 className="text-2xl mb-1 hover:underline">{story.storyName}</h2>
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
      </div>
      {Admin && (
        <div>
          <p onClick={() => (console.log("clicked"), handleDelete(story._id))}>
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default Story;
