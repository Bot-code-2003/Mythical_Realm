import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const HeroSection = [
    {
      id: 1,
      className: "homePage_1",
      heading: "Welcome to Mythical Realm",
      description: "Where Ancient Legends and Timeless Mysteries Unfold.",
    },
    {
      id: 2,
      className: "homePage_2",
      heading: "Discover the Unknown",
      description: "Embark on a journey through the mystical and the arcane.",
    },
    {
      id: 3,
      className: "homePage_3",
      heading: "Stories Untold",
      description: "Share your own myths and legends with the world.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

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
    <div className="relative w-full h-[600px] flex justify-center items-center overflow-hidden">
      {HeroSection.map((obj, index) => (
        <div
          key={obj.id}
          className={`${
            obj.className
          } absolute w-[95%] p-5 h-full transition-opacity duration-[1s] ${
            index === currentIndex ? "opacity-100 " : "opacity-0 "
          } flex flex-col justify-center items-center `}
        >
          <h1 className="text-[45px] leading-tight sm:text-[55px] text-center text-white drop-shadow-lg">
            {obj.heading}
          </h1>
          <p className="text-[25px] text-white text-center drop-shadow-md">
            {obj.description}
          </p>
          <Link to="/explore">
            <button className="rounded-full transition-colors duration-300 bg-white px-8 py-2 mt-4 hover:bg-gray-300">
              Explore
            </button>
          </Link>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 z-30"
        onClick={handlePrev}
      >
        &#10094;
      </button>
      <button
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 z-30"
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
  );
};

export default HomePage;
