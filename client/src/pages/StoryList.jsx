import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStories } from "../actions/auth"; // Ensure the path is correct
import Story from "../components/Story";
import Lottie from "lottie-react";
import emptyAnimation from "../Lottie/search.json";
import { CircularProgress } from "@mui/material";

const StoryList = ({ genre }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const stories = useSelector((state) => state.stories);

  console.log("Stories:", stories);

  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Ensure the page scrolls to the top after the content is fully loaded
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100); // Slight delay to allow the page to fully load
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getStories(genre)); // Fetch stories based on genre
        setLoading(false); // Set loading to false after fetching stories
      } catch (error) {
        console.error("Error fetching stories:", error);
        setLoading(false); // Also set loading to false in case of an error
      }
    };

    fetchData();
  }, [dispatch, genre]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <CircularProgress color="primary" />
      </div>
    );
  }

  return (
    <>
      {stories.length === 0 ? (
        <div>
          <div className="flex flex-col justify-center items-center">
            <Lottie
              animationData={emptyAnimation}
              loop
              className="w-[50%] sm:w-[20%]"
            />
            <p className="text-xl font-kalam text-gray-500">
              No {genre} stories found
            </p>
          </div>
        </div>
      ) : (
        <div className="story-list container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {stories.map((story) => (
            <Story key={story._id} story={story} />
          ))}
        </div>
      )}
    </>
  );
};

export default StoryList;
