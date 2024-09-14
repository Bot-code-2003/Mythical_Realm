/**
 * This page has detailed chapter like it contains the chapter desc, image and story.
 */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getStory } from "../actions/story";
import { CircularProgress } from "@mui/material";

const DetailedChapter = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const storyId = queryParams.get("storyId");
  const chapterId = queryParams.get("chapterId");

  const story = useSelector(
    (state) => state.stories.find((s) => s._id === storyId) || state.story // Either find it in stories or use the fetched single story
  );

  // State to track the current chapter index
  const [currentChapterIndex, setCurrentChapterIndex] = useState(null);

  // Fetch story when it is not found in Redux
  useEffect(() => {
    if (!story) {
      dispatch(getStory(storyId));
    }
  }, [dispatch, storyId, story]);

  // Update currentChapterIndex based on chapterId from URL
  useEffect(() => {
    if (story && chapterId && currentChapterIndex === null) {
      const chapterIndex = story.chapters.findIndex(
        (chapter) => chapter._id === chapterId
      );
      if (chapterIndex !== -1) {
        setCurrentChapterIndex(chapterIndex);
      } else {
        setCurrentChapterIndex(0); // Set to first chapter if not found
      }
    }
  }, [story, chapterId, currentChapterIndex]);

  // Scroll to the top when the current chapter changes
  useEffect(() => {
    if (currentChapterIndex !== null) {
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
  }, [currentChapterIndex]);

  // Update URL based on currentChapterIndex change
  useEffect(() => {
    if (story && currentChapterIndex !== null) {
      const currentChapter = story.chapters[currentChapterIndex];
      const newUrl = `/story/${slugify(story.storyCategory)}/${slugify(
        story.storyName
      )}/chapter/${slugify(
        currentChapter.chapterName
      )}?storyId=${storyId}&chapterId=${currentChapter._id}`;
      navigate(newUrl, { replace: true });
    }
  }, [currentChapterIndex, story, navigate, storyId]);

  const currentChapter = story?.chapters?.[currentChapterIndex];

  const formattedDate = currentChapter
    ? new Date(currentChapter.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  if (!story || currentChapterIndex === null) {
    return (
      <div className="flex flex-col justify-center min-h-[50vh] items-center">
        <CircularProgress />
      </div>
    );
  }

  const goToNextChapter = () => {
    if (currentChapterIndex < story.chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
  };

  const goToPreviousChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  };

  const slugify = (name) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-lg">
      {/* Dropdown for selecting chapters */}
      <div className="mb-4">
        <select
          value={currentChapterIndex}
          onChange={(e) => setCurrentChapterIndex(Number(e.target.value))}
          className="px-4 py-2 border rounded"
        >
          {story.chapters.map((chapter, index) => (
            <option key={chapter._id} value={index}>
              {chapter.chapterName}
            </option>
          ))}
        </select>
      </div>

      {currentChapter && (
        <div
          className={`flex flex-col font-roboto items-center gap-10 ${
            currentChapter.chapterImage ? "md:flex-row" : ""
          } mb-8`}
        >
          <div
            className={`text-center mb-8 md:mb-0 ${
              currentChapter.chapterImage ? "md:w-1/2 md:pr-8" : "w-full"
            }`}
          >
            <p className="text-sm text-red-500 mb-4">{story.storyName}</p>
            <h1 className="text-5xl mb-4">{currentChapter.chapterName}</h1>
            <p className="text-xl text-gray-500 font-kalam leading-relaxed mb-4">
              {currentChapter.chapterDesc}
            </p>
            <p className="font-bold">Published on {formattedDate}</p>
          </div>
          {currentChapter.chapterImage && (
            <div className="md:w-1/2">
              <img
                src={currentChapter.chapterImage}
                alt={currentChapter.chapterName}
                className="w-full h-auto rounded-md object-cover"
              />
            </div>
          )}
        </div>
      )}

      {currentChapter && (
        <div className="border-t border-gray-300 pt-6 p-4 sm:px-10">
          <div
            className="text-2xl leading-relaxed font-crimson mb-12 first-letter:text-5xl first-letter:font-bold"
            dangerouslySetInnerHTML={{ __html: currentChapter.chapterStory }}
          />
        </div>
      )}
      {/* Next and Previous Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={goToPreviousChapter}
          disabled={currentChapterIndex === 0}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous Chapter
        </button>
        <button
          onClick={goToNextChapter}
          disabled={currentChapterIndex === story.chapters.length - 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next Chapter
        </button>
      </div>
    </div>
  );
};

export default DetailedChapter;
