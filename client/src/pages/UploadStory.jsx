import React, { useState, useEffect } from "react";
import Compressor from "compressorjs";
import { useDispatch } from "react-redux";
import { handleStory } from "../actions/auth";
import { useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS

const UploadStory = () => {
  const location = useLocation();
  const storyToEdit = location.state?.story || {};

  const [storyName, setStoryName] = useState(storyToEdit.storyName || "");
  const [storyImage, setStoryImage] = useState(storyToEdit.storyImage || null);
  const [storyCategory, setStoryCategory] = useState(
    storyToEdit.storyCategory || ""
  );
  const [storyDescription, setStoryDescription] = useState(
    storyToEdit.storyDescription || ""
  );
  const [chapters, setChapters] = useState(storyToEdit.chapters || []);
  const [chapterName, setChapterName] = useState("");
  const [chapterImage, setChapterImage] = useState(null);
  const [chapterDesc, setChapterDesc] = useState("");
  const [chapterStory, setChapterStory] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [storyAuthor, setStoryAuthor] = useState(""); // New state for storyAuthor

  const dispatch = useDispatch();

  useEffect(() => {
    // Retrieve the story author from localStorage or Redux state (e.g., user info)
    const author = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).name
      : "Unknown Author";
    setStoryAuthor(author);
  }, []);

  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];

    if (file && file.size > 300 * 1024) {
      new Compressor(file, {
        quality: 0.5,
        success: (compressedFile) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result);
            console.log(
              "File compressed and converted to Base64:",
              reader.result
            );
          };
          reader.onerror = () => {
            setUploadError("Failed to read file. Please try again.");
          };
          reader.readAsDataURL(compressedFile);
        },
        error(err) {
          console.error("Compression error:", err.message);
          setUploadError("Compression error: " + err.message);
        },
      });
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        console.log("File converted to Base64:", reader.result);
      };
      reader.onerror = () => {
        setUploadError("Failed to read file. Please try again.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddChapter = () => {
    if (!chapterName || !chapterDesc || !chapterStory) {
      console.log("Please fill in all required fields.");
      return;
    }
    setChapters([
      ...chapters,
      {
        chapterName,
        chapterImage,
        chapterDesc,
        chapterStory,
        createdAt: new Date(),
      },
    ]);

    console.log("Chapter added:", {
      chapters,
    });

    setChapterName("");
    setChapterImage(null);
    setChapterDesc("");
    setChapterStory("");
  };

  const handleSubmit = (status) => {
    dispatch(
      handleStory({
        storyName,
        storyImage,
        storyCategory,
        storyDescription,
        chapters,
        status,
        storyAuthor, // Include storyAuthor in the submission data
        _id: storyToEdit._id,
      })
    );
    console.log(`Story ${status}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {storyToEdit._id ? "Edit Story" : "Upload Story"}
      </h2>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Story Image</label>
        <input
          type="file"
          onChange={(e) => handleImageUpload(e, setStoryImage)}
        />
      </div>
      {storyImage && <img src={storyImage} alt="Story Cover" />}
      {uploadError && <p className="text-red-500">{uploadError}</p>}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Story Name</label>
        <input
          type="text"
          value={storyName}
          onChange={(e) => setStoryName(e.target.value)}
          className="w-full p-2 border border-gray-300"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Category</label>
        <input
          type="text"
          value={storyCategory}
          onChange={(e) => setStoryCategory(e.target.value)}
          className="w-full p-2 border border-gray-300"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold" htmlFor="storyAuthor">
          {" "}
          Story Author{" "}
        </label>
        <input
          type="text"
          id="storyAuthor"
          value={storyAuthor}
          onChange={(e) => setStoryAuthor(e.target.value)}
          className="w-full p-2 border border-gray-300"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Description</label>
        <textarea
          value={storyDescription}
          onChange={(e) => setStoryDescription(e.target.value)}
          className="w-full p-2 border border-gray-300"
        ></textarea>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Add Chapters</h3>
        <label className="block mb-2 font-semibold">Chapter Name</label>
        <input
          type="text"
          value={chapterName}
          onChange={(e) => setChapterName(e.target.value)}
          className="w-full p-2 border border-gray-300"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Chapter Image</label>
        <input
          type="file"
          onChange={(e) => handleImageUpload(e, setChapterImage)}
        />
      </div>
      {chapterImage && <img src={chapterImage} alt="Chapter Image" />}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Chapter Description</label>
        <textarea
          value={chapterDesc}
          onChange={(e) => setChapterDesc(e.target.value)}
          className="w-full p-2 border border-gray-300"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Chapter Story</label>
        <ReactQuill
          value={chapterStory}
          onChange={setChapterStory}
          className="w-full border border-gray-300 h-64"
        />
      </div>
      <button
        onClick={handleAddChapter}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add Chapter
      </button>

      <div className="flex gap-4">
        <button
          onClick={() => handleSubmit("draft")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save as Draft
        </button>
        <button
          onClick={() => handleSubmit("published")}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default UploadStory;
