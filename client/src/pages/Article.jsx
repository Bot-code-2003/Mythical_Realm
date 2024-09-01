import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Import useParams
import CircularProgress from "@mui/material/CircularProgress";
import Lottie from "lottie-react";
import emptyAnimation from "../Lottie/search.json";

const Article = () => {
  const { id } = useParams(); // Get params from URL
  const [loading, setLoading] = useState(true);

  // Get the array of articles from the Redux store
  const articles = useSelector((state) => state.article);

  // Find the article that matches the id from the URL params
  const article = articles.find((article) => article._id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate loading for effect (remove if not needed)
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const formattedDate = article
    ? new Date(article.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress color="primary" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Lottie
          animationData={emptyAnimation}
          loop={true}
          style={{ width: "50%" }}
        />
        <p className="text-xl font-bold text-gray-700">No articles available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-lg">
      {article && (
        <div className="flex flex-col font-roboto items-center gap-10 md:flex-row mb-8">
          <div className="md:w-1/2 text-center md:pr-8 mb-8 md:mb-0">
            <p className="text-sm text-red-500 mb-4">{article.category}</p>
            <h1 className="text-5xl mb-4">{article.title}</h1>
            <p className="text-xl text-gray-500 font-kalam leading-relaxed mb-4">
              {article.description}
            </p>
            <p className="font-bold">By {article.author}</p>
            <p className="text-sm">{formattedDate}</p>
          </div>
          <div className="md:w-1/2">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-auto rounded-md object-cover"
            />
          </div>
        </div>
      )}
      {article && (
        <div className="border-t border-gray-300 pt-6 px-2 sm:px-10">
          <div
            className="text-2xl leading-relaxed font-crimson mb-12 first-letter:text-5xl first-letter:font-bold"
            dangerouslySetInnerHTML={{ __html: article.article }}
          />
        </div>
      )}
      {article && (
        <div className="border-t-2 border-black pt-10">
          <h2 className="text-3xl font-semibold mb-6">Similar Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {article.similarArticles &&
              article.similarArticles.map((similarArticle) => (
                <div key={similarArticle.id} className="text-center">
                  <img
                    src={similarArticle.coverImage}
                    alt={similarArticle.title}
                    className="w-full h-auto rounded-md mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold">{similarArticle.title}</h3>
                  <p className="text-gray-600">{similarArticle.category}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Article;
