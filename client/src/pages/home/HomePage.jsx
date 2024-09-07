import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import LockIcon from "@mui/icons-material/Lock";
import { useDispatch } from "react-redux";
import HomePageNav from "./HomePageNav";
import HomepageStories from "./HomepageStories";

import { getHomepageStories } from "../../actions/story";

const HomePage = () => {
  const dispatch = useDispatch();
  const [stories, setStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    document.title = "The Mythical Realm";
  }, []);

  const HeroSection = [
    {
      id: 1,
      className: "homePage_1",
      heading: "Welcome to Mythical Realm",
      description: "Where Ancient Legends and Timeless Mysteries Unfold.",
      button: "Explore",
      linkTo: "/explore",
    },
    {
      id: 2,
      className: "homePage_2",
      heading: "Enter the World of Fantasy",
      description:
        "Dive into epic tales, mythical creatures, and enchanted worlds that spark the imagination and blur the lines between reality and magic.",
      button: "Discover Fantasy",
      linkTo: "/fantasy",
    },
    {
      id: 3,
      className: "homePage_5",
      heading: "Venture Into the Unknown",
      description:
        "Explore mind-bending tales of space, unravel time paradoxes, and face the terrors that lurk in the cosmic void.",
      button: "Cosmic Mysteries",
      linkTo: "/space",
    },
    {
      id: 4,
      className: "homePage_6",
      heading: "Whispers from the Shadows",
      description:
        "Venture into tales of forbidden magic, sinister rituals, and the haunting echoes of the paranormal. Discover stories where shadows hold secrets and the line between reality and the supernatural blurs.",
      button: "Dark Tales",
      linkTo: "/dark-tales",
    },
    {
      id: 5,
      className: "homePage_3",
      heading: "Discover Hidden Lore",
      description:
        "Unlock secret stories, hidden chapters, and exclusive content that delve deeper into the myths and mysteries of our universe.",
      button: "Unlock Lore",
      linkTo: "/hidden-lore",
      icon: "LockIcon",
    },
    {
      id: 6,
      className: "homePage_4",
      heading: "Mythics Untold",
      description: "Share your own myths and legends with the world.",
      button: "Publish",
      linkTo: "/publish",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === HeroSection.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount to avoid memory leaks.
  }, []);

  // Fetch homepage stories
  useEffect(() => {
    dispatch(getHomepageStories()).then((response) => {
      if (response && response.length > 0) {
        setStories(response);
      }
    });
  }, [dispatch]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === HeroSection.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? HeroSection.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="p-2">
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
            <h1 className="text-[45px] leading-tight sm:text-[55px] text-center text-white drop-shadow-2xl text-shadow-lg">
              {obj.heading}
            </h1>
            <p className="text-[25px] text-white text-center drop-shadow-md text-shadow-lg">
              {obj.description}
            </p>
            <Link id={obj.id} to={obj.linkTo}>
              <button className="rounded-full transition-colors duration-300 bg-white px-8 py-2 mt-4 hover:bg-gray-300 flex justify-center items-center">
                {obj.button}
                {obj.icon === "LockIcon" && <LockIcon fontSize="small" />}
              </button>
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

      <HomePageNav />
      {stories && stories.length > 0 ? (
        <HomepageStories stories={stories} />
      ) : (
        <p>Loading stories...</p>
      )}
    </div>
  );
};

export default HomePage;
