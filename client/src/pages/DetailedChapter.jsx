import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Lottie from "lottie-react";
import emptyAnimation from "../Lottie/search.json";
import { useLocation, useNavigate } from "react-router-dom";

const DetailedChapter = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const story = useSelector((state) => state.singleStory); // Get the story from the state
  console.log("Story:", story);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const chapterId = queryParams.get("chapterId");

  const chapter = story?.chapters?.find((chapter) => chapter._id === chapterId); // Find the chapter in the story

  useEffect(() => {
    if (story && chapter) {
      setLoading(false); // Stop loading once the story and chapter data are available
      window.scrollTo(0, 0); // Scroll to top after loading
    }
  }, [story, chapter]);

  const slugify = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress color="primary" />
      </div>
    );
  }

  if (!story || !chapter) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Lottie
          animationData={emptyAnimation}
          loop={true}
          style={{ width: "50%" }}
        />
        <p className="text-xl font-bold text-gray-700">No chapter available</p>
      </div>
    );
  }

  const handleChapterChange = (event) => {
    const selectedChapterId = event.target.value;
    const selectedChapter = story.chapters.find(
      (chapter) => chapter._id === selectedChapterId
    );
    navigate(
      `/story/${slugify(story.storyCategory)}/${slugify(
        story.storyName
      )}/chapter/${slugify(
        selectedChapter.chapterName
      )}?chapterId=${selectedChapterId}`
    );
  };

  const goToNextChapter = () => {
    const currentIndex = story.chapters.findIndex(
      (chapter) => chapter._id === chapterId
    );
    if (currentIndex < story.chapters.length - 1) {
      const nextChapter = story.chapters[currentIndex + 1];
      navigate(
        `/story/${slugify(story.storyCategory)}/${slugify(
          story.storyName
        )}/chapter/${slugify(nextChapter.chapterName)}?chapterId=${
          nextChapter._id
        }`
      );
    }
  };

  const goToPreviousChapter = () => {
    const currentIndex = story.chapters.findIndex(
      (chapter) => chapter._id === chapterId
    );
    if (currentIndex > 0) {
      const previousChapter = story.chapters[currentIndex - 1];
      navigate(
        `/story/${slugify(story.storyCategory)}/${slugify(
          story.storyName
        )}/chapter/${slugify(previousChapter.chapterName)}?chapterId=${
          previousChapter._id
        }`
      );
    }
  };

  const formattedDate = chapter
    ? new Date(chapter.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-lg">
      {/* Dropdown for selecting chapters */}
      <div className="mb-4">
        <select
          value={chapterId} // Set the initial selected value that we got from the URL.
          onChange={handleChapterChange}
          className="px-4 py-2 border rounded"
        >
          {story.chapters.map((chapter) => (
            <option key={chapter._id} value={chapter._id}>
              {chapter.chapterName}
            </option>
          ))}
        </select>
      </div>

      {chapter && (
        <div className="flex flex-col font-roboto items-center gap-10 md:flex-row mb-8">
          <div className="md:w-1/2 text-center md:pr-8 mb-8 md:mb-0">
            <p className="text-sm text-red-500 mb-4">{chapter.storyName}</p>
            <h1 className="text-5xl mb-4">{chapter.chapterName}</h1>
            <p className="text-xl text-gray-500 font-kalam leading-relaxed mb-4">
              {chapter.chapterDesc}
            </p>
            <p className="font-bold">Published on {formattedDate}</p>
          </div>
          <div className="md:w-1/2">
            <img
              src={chapter.chapterImage}
              alt={chapter.chapterName}
              className="w-full h-auto rounded-md object-cover"
            />
          </div>
        </div>
      )}
      {chapter && (
        <div className="border-t border-gray-300 pt-6 p-4 sm:px-10">
          <div
            className="text-2xl leading-relaxed font-crimson mb-12 first-letter:text-5xl first-letter:font-bold"
            dangerouslySetInnerHTML={{ __html: chapter.chapterStory }}
          />
        </div>
      )}
      {/* Next and Previous Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={goToPreviousChapter}
          disabled={
            story.chapters.findIndex((chapter) => chapter._id === chapterId) ===
            0
          }
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous Chapter
        </button>
        <button
          onClick={goToNextChapter}
          disabled={
            story.chapters.findIndex((chapter) => chapter._id === chapterId) ===
            story.chapters.length - 1
          }
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next Chapter
        </button>
      </div>
    </div>
  );
};

export default DetailedChapter;
