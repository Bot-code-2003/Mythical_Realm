import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStories, updateTopPicks } from "../actions/story"; // Assuming you have updateTopPicks action for updating top picks

const AdminPage = () => {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.stories);

  const [selectedStories, setSelectedStories] = useState([]);
  const [topPicks, setTopPicks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const storyRefs = useRef({}); // To store refs for each story

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);

  // Load stories already in Top Picks
  useEffect(() => {
    if (stories) {
      const initialTopPicks = stories
        .filter((story) => story.isTopPick)
        .map((story) => story._id);
      setTopPicks(initialTopPicks);
    }
  }, [stories]);

  const handleStorySelect = (id) => {
    setSelectedStories((prev) =>
      prev.includes(id)
        ? prev.filter((storyId) => storyId !== id)
        : [...prev, id]
    );
  };

  const handleAddToTopPicks = () => {
    const updatedTopPicks = [...topPicks, ...selectedStories];
    setTopPicks(updatedTopPicks);
    console.log(updatedTopPicks);

    dispatch(updateTopPicks(updatedTopPicks)); // Assuming an action to update top picks
    setSelectedStories([]); // Clear selection
  };

  const handleRemoveFromTopPicks = () => {
    const updatedTopPicks = topPicks.filter(
      (id) => !selectedStories.includes(id)
    );
    setTopPicks(updatedTopPicks);
    console.log(updatedTopPicks);

    dispatch(updateTopPicks(updatedTopPicks)); // Update top picks
    setSelectedStories([]); // Clear selection
  };

  // Scroll to the searched story
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      const foundStory = stories.find((story) =>
        story.storyName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (foundStory && storyRefs.current[foundStory._id]) {
        storyRefs.current[foundStory._id].scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Page</h1>

      {/* Search Bar */}
      <div className="mb-6 w-full max-w-lg">
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search story by name..."
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Search
          </button>
        </form>
      </div>

      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Stories</h2>
        <div className="flex flex-wrap gap-2">
          {stories.map((story) => (
            <div
              key={story._id}
              ref={(el) => (storyRefs.current[story._id] = el)} // Assign refs for scrolling
              className={`flex items-start p-2 gap-2 rounded-md shadow-md bg-gray-100 ${
                topPicks.includes(story._id)
                  ? "underline font-bold border-2 border-blue-500"
                  : ""
              } ${
                searchQuery &&
                story.storyName
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
                  ? "bg-yellow-100"
                  : ""
              }`} // Highlighting searched story
            >
              <p className="text-lg">{story.storyName}</p>
              <input
                type="checkbox"
                checked={selectedStories.includes(story._id)}
                onChange={() => handleStorySelect(story._id)}
                className="form-checkbox w-5 h-5 text-blue-600 mt-auto"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleAddToTopPicks}
            className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition ${
              selectedStories.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={selectedStories.length === 0}
          >
            Add to Top Picks
          </button>

          <button
            onClick={handleRemoveFromTopPicks}
            className={`bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition ${
              selectedStories.every((id) => !topPicks.includes(id)) ||
              selectedStories.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={
              selectedStories.every((id) => !topPicks.includes(id)) ||
              selectedStories.length === 0
            }
          >
            Remove from Top Picks
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
