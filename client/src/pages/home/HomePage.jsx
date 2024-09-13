import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import LockIcon from "@mui/icons-material/Lock";
import { useDispatch, useSelector } from "react-redux";
import HomePageNav from "./HomePageNav";
import HomepageStories from "./HomepageStories";
import { getTopPicks } from "../../actions/story";
import { CircularProgress } from "@mui/material";

const HomePage = () => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0); // For controlling the HeroSection carousel

  // Use useSelector to get the top picks from the Redux store
  const topPicks = useSelector((state) => state.topPicks);

  // Set the document title when the component mounts
  useEffect(() => {
    document.title = "The Mythical Realm";
  }, []);

  // HeroSection array containing data for each section of the carousel
  const HeroSection = [
    {
      id: 1,
      className: "homePage_1",
      heading: "Welcome to Mythical Realm",
      description: "Explore timeless legends and ancient mysteries.",
    },
    {
      id: 2,
      className: "homePage_2",
      heading: "Enter the World of Fantasy",
      description: "Discover epic stories filled with magic and wonder.",
      button: "Discover Fantasy",
      linkTo: "/fantasy",
    },
    {
      id: 3,
      className: "homePage_5",
      heading: "Venture Into the Unknown",
      description: "Explore space tales and cosmic mysteries.",
      button: "Cosmic Mysteries",
      linkTo: "/space",
    },
    {
      id: 4,
      className: "homePage_6",
      heading: "Whispers from the Shadows",
      description: "Unveil dark stories and supernatural secrets.",
      button: "Dark Tales",
      linkTo: "/dark-tales",
    },
    {
      id: 5,
      className: "homePage_3",
      heading: "Discover Hidden Lore",
      description: "Unlock hidden stories and exclusive content.",
      button: "Unlock Lore",
      linkTo: "/hidden-lore",
      icon: "LockIcon",
    },
    {
      id: 6,
      className: "homePage_4",
      heading: "Mythics Untold",
      description: "Share your own myths and stories.",
      button: "Publish",
      linkTo: "/publish",
    },
  ];

  // Carousel auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === HeroSection.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // Change every 5 seconds

    return () => clearInterval(interval); // Clear interval to prevent memory leaks
  }, []);

  // Fetch top picks from the server when the component mounts
  useEffect(() => {
    const fetchTopPicks = async () => {
      try {
        await dispatch(getTopPicks()); // Fetch the top picks from the Redux action
      } catch (error) {
        console.error("Error fetching top picks:", error);
      }
    };

    fetchTopPicks();
  }, [dispatch]);

  // Manually navigate to the next item in the carousel
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === HeroSection.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Manually navigate to the previous item in the carousel
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? HeroSection.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="p-2">
      {/* Hero Section Carousel */}
      <div className="relative w-full h-[600px] sm:h-[500px] flex justify-center items-center overflow-hidden">
        {HeroSection.map((obj, index) => (
          <div
            key={obj.id}
            className={`${
              obj.className
            } absolute w-[95%] py-5 px-5 sm:px-28 h-full transition-opacity duration-[1.2s] ${
              index === currentIndex
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            } flex flex-col justify-center items-center `}
          >
            <h1 className="text-[35px] leading-tight sm:text-[55px] text-center text-white drop-shadow-2xl text-shadow-lg">
              {obj.heading}
            </h1>
            <p className="text-[20px] text-white text-center drop-shadow-md text-shadow-lg">
              {obj.description}
            </p>
            <Link id={obj.id} to={obj.linkTo}>
              {obj.button && (
                <button className="rounded-full transition-colors duration-300 bg-white px-8 py-2 mt-4 hover:bg-gray-300 flex justify-center items-center">
                  {obj.button}
                  {obj.icon === "LockIcon" && <LockIcon fontSize="small" />}
                </button>
              )}
            </Link>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          className="absolute left-0 sm:left-5 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 z-30"
          onClick={handlePrev}
        >
          &#10094;
        </button>
        <button
          className="absolute right-0 sm:right-5 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 z-30"
          onClick={handleNext}
        >
          &#10095;
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-5 flex justify-center items-center space-x-2 z-30">
          {HeroSection.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full  ${
                index === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* HomePage Navigation */}
      <HomePageNav />

      {/* Top Picks Section */}
      <div className="mt-8">
        <h2 className="text-3xl sm:mb-4 text-center underline font-crimson">
          Top Picks
        </h2>
        {topPicks && topPicks.length > 0 ? (
          <HomepageStories stories={topPicks} /> // Display top picks if available
        ) : (
          <div className="flex justify-center items-center h-96">
            <CircularProgress />{" "}
            {/* Show loading spinner if top picks are still loading */}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
