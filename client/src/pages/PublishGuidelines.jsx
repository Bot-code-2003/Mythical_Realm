import React, { useEffect } from "react";
import publish from "../assets/publish2.webp";

const PublishGuidelines = () => {
  useEffect(() => {
    document.title = "Publish Guidelines | Mythical Realm";
  }, []);

  const guidelines = [
    {
      genre: "Fantasy",
      instructions:
        "Submit stories and articles related to fantasy worlds, mythical creatures, and magical adventures.",
    },
    {
      genre: "Cosmic Mysteries",
      instructions:
        "Submit stories and articles exploring the universe, space, time, and the mysteries of the cosmos.",
    },
    {
      genre: "Dark Tales",
      instructions:
        "Submit stories and articles focused on dark, eerie, and paranormal themes, including forbidden magic and sinister rituals.",
    },
  ];

  return (
    <>
      <div className="p-10 flex flex-col items-center gap-5">
        <h2 className="text-5xl font-patrick mb-4 text-center sm:text-left text-gray-800">
          Publication Guidelines
        </h2>
        <img
          src={publish}
          className="max-h-[200px] sm:min-w-[550px]"
          alt="Publish"
        />
      </div>

      <div className="py-2 px-8 sm:px-60 flex flex-col items-center">
        <p className="text-gray-600 mb-6 text-center">
          Please carefully follow the guidelines below when submitting your work
          to ensure a smooth publication process. We welcome stories, articles,
          and poems for various genres:
        </p>

        <ul className="space-y-8 w-full">
          {guidelines.map((guideline, index) => (
            <li key={index} className="border-b border-gray-200 pb-4">
              <h3 className="text-2xl font-medium text-gray-700">
                {guideline.genre}
              </h3>
              <p className="text-gray-600 mt-2">
                <strong>Submission Guidelines:</strong> {guideline.instructions}
              </p>
            </li>
          ))}
        </ul>

        {/* Common instructions for all genres */}
        <div className="mt-8 w-full text-gray-600">
          <h3 className="text-2xl font-medium text-gray-700 mb-4">
            Story Format
          </h3>
          <p>
            If submitting a story, ensure the document includes the following
            details:
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>Story Name</li>
            <li>Story Description</li>
            <li>Pen Name (Author Name)</li>
            <li>
              Chapter Names in the format:{" "}
              <em>Chapter 1: &lt;Chapter Name&gt;</em>
            </li>
            <li>Chapter Descriptions</li>
            <li>Full Chapter Story Content</li>
          </ul>

          <h3 className="text-2xl font-medium text-gray-700 mt-6 mb-2">
            Preferred Illustration Sizes
          </h3>
          <ul className="list-disc ml-6">
            <li>
              Story Cover Image: <strong>340px by 420px</strong>
            </li>
            <li>
              Chapter Images:{" "}
              <strong>Square dimensions (e.g., 500px by 500px)</strong>
            </li>
          </ul>

          <h3 className="text-2xl font-medium text-gray-700 mt-6 mb-2">
            Submission Instructions
          </h3>
          <p className="text-gray-600 mb-4">
            Upload your document (preferably in Word format) and email it to the
            provided address. You may request illustrations to be added, or
            provide your own if preferred.
          </p>

          <p className="text-gray-600 mb-6">
            <strong>Email for Submissions:</strong>
            Send your work to the email below with the correct genre in the
            subject line:
          </p>

          <p className="text-blue-600 hover:underline">
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=dharmadeepmadisetty@gmail.com`}
              target="_blank"
              rel="noopener noreferrer"
            >
              dharmadeepmadisetty@gmail.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default PublishGuidelines;
