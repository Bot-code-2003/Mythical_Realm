import React from "react";
import Story from "../../components/Story"; // Assuming Story is in the same folder

const HomepageStories = ({ stories }) => {
  return (
    <div className="homepage-stories container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Homepage Stories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
          <Story key={story._id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default HomepageStories;
