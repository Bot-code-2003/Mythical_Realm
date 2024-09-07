import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStories } from "../actions/story";
import { getArticle } from "../actions/article";

import { handleCheckboxChangeStory } from "../actions/story";

const AdminPage = () => {
  const dispatch = useDispatch();

  const stories = useSelector((state) => state.stories);
  const articles = useSelector((state) => state.articles);

  const [selectedItems, setSelectedItems] = useState({
    stories: {},
    articles: {},
  });

  useEffect(() => {
    dispatch(getStories());
    dispatch(getArticle());
  }, [dispatch]);

  const handleCheckboxChange = (type, id, action) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        [id]: {
          ...prevState[type][id],
          [action]: !prevState[type][id]?.[action],
        },
      },
    }));
  };

  const handleSubmit = () => {
    const selectedStories = Object.entries(selectedItems.stories)
      .filter(([_, actions]) => actions.homepage || actions.featured)
      .map(([id, actions]) => ({
        id: stories.find((story) => story._id === id)?._id,
        name: stories.find((story) => story._id === id)?.storyName,
        actions: Object.entries(actions)
          .filter(([_, value]) => value)
          .map(([action]) => action)
          .join(", "),
      }));

    const selectedArticles = Object.entries(selectedItems.articles)
      .filter(([_, actions]) => actions.homepage || actions.featured)
      .map(([id, actions]) => ({
        id: articles.find((article) => article._id === id)?._id,
        name: articles.find((article) => article._id === id)?.title,
        actions: Object.entries(actions)
          .filter(([_, value]) => value)
          .map(([action]) => action)
          .join(", "),
      }));

    dispatch(handleCheckboxChangeStory(selectedStories));

    console.log("Selected stories:", selectedStories);
    console.log("Selected articles:", selectedArticles);
  };

  return (
    <div className="flex">
      {/* Left Side */}
      <div className="w-full p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Page</h1>

        <div>
          <p className="font-semibold">Stories</p>
          {stories.map((story) => (
            <div
              key={story._id}
              className="flex items-center justify-between mb-4"
            >
              <div className="flex items-center">
                <p>{story.storyName}</p>
              </div>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="checkbox"
                    checked={!!selectedItems.stories[story._id]?.homepage}
                    onChange={() =>
                      handleCheckboxChange("stories", story._id, "homepage")
                    }
                    className="mr-2"
                  />
                  Homepage
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={!!selectedItems.stories[story._id]?.featured}
                    onChange={() =>
                      handleCheckboxChange("stories", story._id, "featured")
                    }
                    className="mr-2"
                  />
                  Featured
                </label>
              </div>
            </div>
          ))}

          <p className="font-semibold mt-6">Articles</p>
          {articles.map((article) => (
            <div
              key={article._id}
              className="flex items-center justify-between mb-4"
            >
              <div className="flex items-center">
                <p>{article.title}</p>
              </div>
              <div className="flex space-x-4">
                <label>
                  <input
                    type="checkbox"
                    checked={!!selectedItems.articles[article._id]?.homepage}
                    onChange={() =>
                      handleCheckboxChange("articles", article._id, "homepage")
                    }
                    className="mr-2"
                  />
                  Homepage
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={!!selectedItems.articles[article._id]?.featured}
                    onChange={() =>
                      handleCheckboxChange("articles", article._id, "featured")
                    }
                    className="mr-2"
                  />
                  Featured
                </label>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
