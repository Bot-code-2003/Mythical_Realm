import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticle, handleDelete } from "../actions/article";
import { useNavigate, useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Lottie from "lottie-react";
import emptyAnimation from "../Lottie/search.json";
import { jwtDecode } from "jwt-decode"; // Corrected import statement

const Blogs = ({ genre }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Admin, setAdmin] = useState(false);

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
    const storedUser = JSON.parse(localStorage.getItem("Profile"));
    const token = storedUser?.token;
    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.email === import.meta.env.VITE_ADMIN_EMAIL) {
        setAdmin(true); // Update the Admin state
      }

      console.log("Admin status:", Admin);
    }
  }, [location, Admin]);

  const articles = useSelector((state) => state.articles);
  console.log("articles", articles);

  useEffect(() => {
    document.title = `Mythical Realm | ${genre} Articles`;
    const fetchData = async () => {
      try {
        await dispatch(getArticle(genre)); // Dispatch action to get articles "All, dont get confused by name getArticle, its plural" on mount
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
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
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
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
      <h1 className="mx-auto p-4 text-2xl text-center">Articles</h1>
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
                className="object-cover min-h-[300px] max-h-[300px] w-full rounded-sm mb-4"
                src={obj.coverImage || testPic}
                alt={obj.title}
              />
              <div className="flex flex-col space-y-2">
                <p className="text-red-500 font-patrick text-lg">
                  {obj.category}
                </p>
                <h2 className="text-2xl mb-1 hover:underline">{obj.title}</h2>
                <p className="text-gray-700 text-md">
                  {obj.description.length > 100 ? (
                    <>
                      {obj.description.slice(0, 100)}
                      <span className="text-blue-500">... Read more</span>
                    </>
                  ) : (
                    obj.description
                  )}
                </p>

                <p className="font-inter font-semibold text-gray-900 text-sm">
                  By {obj.author}
                </p>
              </div>
              {Admin && (
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
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Blogs;
