import React from "react";
import intro from "../../assets/about.jpeg";

const About = () => {
  return (
    <div className="flex flex-col md:flex-row justify-around gap-8 p-6 items-center bg-custom-dark-gradient bg-black text-white rounded-md">
      {/* <div className="md:w-[40%] p-4  flex justify-center">
        <img
          className="rounded-lg shadow-lg sm:max-h-[450px]"
          src={intro}
          alt="Mythic Realm Introduction"
        />
      </div> */}
      <div className=" p-2 sm:p-4 text-center w-full text-gray-300 ">
        <h1 className="text-4xl font-bold text-center text-gray-100 mb-6">
          The Chronicles of Us
        </h1>
        <p className="text-lg sm:text-2xl leading-relaxed mb-4">
          <b>Welcome to MythicRealm</b>—your gateway to the world of myths and
          legends. Born from a passion for ancient tales and rare myths, our
          platform brings these stories to life like never before. Discover a
          curated collection of enchanting myths and fantastical tales that
          spark the imagination. Whether you're a casual reader or a devoted
          myth enthusiast, MythicRealm offers a unique space where the mystical
          and the ancient meet. Enjoy the stories, share your thoughts, and let
          the magic of myths inspire you.
        </p>
      </div>
    </div>
  );
};

export default About;
