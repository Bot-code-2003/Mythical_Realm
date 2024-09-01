import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const DetailedStory = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();

  const story = useSelector((state) =>
    state.stories.find((s) => s._id === storyId)
  );

  console.log(story);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    // If story is available in state, stop loading
    if (story) {
      setLoading(false);
    }
  }, []);

  const slug = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  const handleChapterClick = (
    storyId,
    storyCategory,
    storyName,
    chapterName,
    chapterId
  ) => {
    const slugifiedChapterName = slug(chapterName);
    const slugifiedStoryName = slug(storyName);
    const slugifiedStoryCategory = slug(storyCategory);

    navigate(
      `/story/${slugifiedStoryCategory}/${slugifiedStoryName}/chapter/${slugifiedChapterName}?storyId=${storyId}&chapterId=${chapterId}`
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress color="primary" />
      </div>
    );
  }

  if (!story) {
    return <div>Story not found.</div>;
  }

  if (story.chapters.length === 0) {
    return <div>No chapters available for this story.</div>;
  }

  return (
    <div className="detailed-story container font-crimson mx-auto p-4">
      <div className=" sm:flex items-center mb-10">
        <div className="sm:w-1/2">
          <img
            src={story.storyImage}
            alt={story.storyName}
            className="object-cover h-[500px] w-auto rounded-sm mb-4"
          />
        </div>
        <div className="sm:w-1/2">
          <h1 className="text-4xl font-semibold text-center mb-1">
            {story.storyName}
          </h1>
          <p className="text-md text-red-500 text-center font-kalam mb-3">
            {story.storyCategory}
          </p>
          <p className="story-description p-2 text-center text-gray-600 text-2xl mb-4">
            {story.storyDescription}
          </p>
          <p className="text-center font-inter text-xl font-semibold">
            By {story.storyAuthor}
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-4">Chapters</h2>
      <div className="chapter-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {story.chapters.map((chapter) => (
          <div
            key={chapter._id}
            className="chapter-card cursor-pointer"
            onClick={() =>
              handleChapterClick(
                story._id, // Pass the story ID first
                story.storyCategory, // Then pass the story category
                story.storyName, // Then pass the story name
                chapter.chapterName, // Then pass the chapter name
                chapter._id
              )
            }
          >
            {chapter.chapterImage && (
              <img
                src={chapter.chapterImage}
                alt={chapter.chapterName}
                className="chapter-image w-full h-48 object-cover rounded mb-2"
              />
            )}
            <h3 className="chapter-name text-2xl font-semibold hover:underline">
              {chapter.chapterName}
            </h3>
            <p className="chapter-desc text-md">{chapter.chapterDesc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedStory;
