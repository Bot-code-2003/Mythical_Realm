/**
 * This component is used to show the stories
 * Each story is a seperate component found in the components folder.
 * It fetched the stories from the state called "stories" and maps each story to the Story.jsx component
 * If genre="All" the it fetches all the stories.
 * If genre is a specific like Fantasy, etc it only shows them.
 */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStories } from "../actions/story"; // Ensure the path is correct
import Story from "../components/Story";
import Lottie from "lottie-react";
import emptyAnimation from "../Lottie/search.json";
import { CircularProgress } from "@mui/material";

const StoryList = ({ genre }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const stories = useSelector((state) => state.stories);

  // Change the browser tab name resembeling to the page and scroll to top after content is loaded.
  useEffect(() => {
    document.title = `Mythical Realm | ${genre} Stories`;
    // Disable browser's automatic scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Ensure the page scrolls to the top after the content is fully loaded
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100); // Slight delay to allow the page to fully load
  }, []);

  //the getStories sets state "stories" with the stories of specified {genre}.
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
        <div className="container mx-auto p-4">
          {/* Grid for stories - Responsive layout */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {stories.map((story) => (
              <Story key={story._id} story={story} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default StoryList;
