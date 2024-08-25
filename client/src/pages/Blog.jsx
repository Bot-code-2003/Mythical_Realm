import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticle, handleDelete } from "../actions/auth";
import testPic from "../assets/blog.webp";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress"; // MUI Circular Progress component for loading
import Lottie from "lottie-react";
import emptyAnimation from "../Lottie/search.json";

const Blog = ({ genre }) => {
  const [loading, setLoading] = useState(true); // Add loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch articles from Redux store
  const articles = useSelector((state) => state.article);

  useEffect(() => {
    document.title = `Mythical Realm | ${genre}`;
    const fetchData = async () => {
      try {
        await dispatch(getArticle(genre)); // Dispatch action to get articles on mount
        setLoading(false); // Set loading to false after articles are fetched
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchData();
  }, [dispatch, genre]);

  const handleDeleteArticle = (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      dispatch(handleDelete(id));
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace spaces and special characters with hyphens
      .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
  };

  const handleArticleClick = (id, slugTitle, slugGenre) => {
    navigate(`/article/${slugTitle}/${slugGenre}/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress color="primary" />
      </div>
    );
  }

  return (
    <>
      {articles.length === 0 && (
        <div className="flex flex-col justify-center items-center">
          <Lottie
            animationData={emptyAnimation}
            loop={true}
            style={{ width: "50%" }}
          />
          <p className="text-4xl font-kalam text-gray-500">
            No articles available
          </p>
        </div>
      )}

      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {articles.map((obj) => {
          const slugTitle = generateSlug(obj.title);
          const slugGenre = generateSlug(obj.category);
          return (
            <div
              onClick={() => handleArticleClick(obj._id, slugTitle, slugGenre)}
              className="flex flex-col w-min-[400px] font-crimson cursor-pointer"
              key={obj._id}
            >
              <img
                className="w-full h-auto object-cover rounded-sm mb-4"
                src={obj.coverImage || testPic} // Use a fallback image if coverImage is not available
                alt={obj.title}
              />
              <div className="flex flex-col space-y-2">
                <p className="text-red-500 font-patrick text-lg">
                  {obj.category}
                </p>
                <h2 className="text-2xl mb-1 hover:underline">{obj.title}</h2>
                <p className="text-gray-700 text-md">{obj.description}</p>
                <p className="font-inter font-semibold text-gray-900 text-sm">
                  By {obj.author}
                </p>
              </div>
              <div className="flex gap-5">
                <p
                  onClick={() =>
                    navigate(`/upload`, { state: { article: obj } })
                  }
                >
                  Edit
                </p>
                <p onClick={() => handleDeleteArticle(obj._id)}>Delete</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Blog;
