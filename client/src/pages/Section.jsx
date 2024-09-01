import React from "react";
import StoryList from "./StoryList";

const Section = ({ genre }) => {
  return (
    <>
      {/*  */}
      <h1 className="text-center p-4 text-2xl mt-5 font-crimson">
        {genre} Stories
      </h1>
      <StoryList genre={genre} />
    </>
  );
};

export default Section;
