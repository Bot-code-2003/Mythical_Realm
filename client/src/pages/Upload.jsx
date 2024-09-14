// This page is used for uploading an article.

import React, { useState, useEffect } from "react";
import Compressor from "compressorjs";
import { useDispatch } from "react-redux";
import { handleArticle } from "../actions/article";
import { useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles

const Upload = () => {
  const location = useLocation();
  const articleToEdit = location.state?.article || {};

  const [coverImage, setCoverImage] = useState(
    articleToEdit.coverImage || null
  );
  const [title, setTitle] = useState(articleToEdit.title || "");
  const [description, setDescription] = useState(
    articleToEdit.description || ""
  );
  const [author, setAuthor] = useState(articleToEdit.author || "");
  const [category, setCategory] = useState(articleToEdit.category || "");
  const [article, setArticle] = useState(articleToEdit.article || "");
  const [uploadError, setUploadError] = useState("");

  const dispatch = useDispatch();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file && file.size > 300 * 1024) {
      new Compressor(file, {
        quality: 0.5,
        success: (compressedFile) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setCoverImage(reader.result);
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
        setCoverImage(reader.result);
        console.log("File converted to Base64:", reader.result);
      };
      reader.onerror = () => {
        setUploadError("Failed to read file. Please try again.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (status) => {
    dispatch(
      handleArticle({
        coverImage,
        title,
        description,
        author,
        category,
        article,
        status,
        _id: articleToEdit._id,
      })
    );
    console.log(`Article ${status}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {articleToEdit._id ? "Edit Article" : "Upload Article"}
      </h2>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Cover Image</label>
        <input type="file" onChange={handleImageUpload} />
      </div>
      {coverImage && <img src={coverImage} alt="Cover" />}
      {uploadError && <p className="text-red-500">{uploadError}</p>}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border border-gray-300"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Article</label>
        <ReactQuill value={article} onChange={setArticle} className="h-64" />
      </div>
      <div className="flex gap-4">
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

export default Upload;
