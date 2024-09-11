import React from "react";
import Story from "../../components/Story"; // Assuming Story is in the same folder

const HomepageStories = ({ stories }) => {
  return (
    <div className="homepage-stories container mx-auto p-4">
      {/* Grid for stories - Responsive layout */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {stories.map((story) => (
          <Story key={story._id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default HomepageStories;
