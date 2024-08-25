import React, { useEffect } from "react";
import publish from "../assets/publish2.webp";

const PublishGuidelines = () => {
  useEffect(() => {
    document.title = "Publish Guidelines | Mythical Realm";
  }, []);

  const guidelines = [
    {
      genre: "Fantasy",
      email: "dharmadeepmadisetty@gmail.com",
      instructions: "Submit fantasy-related stories, articles, and poems here.",
    },
    {
      genre: "Cosmic Mysteries",
      email: "dharmadeepmadisetty@gmail.com",
      instructions:
        "Submit stories, articles, and poems related to space, time, and the universe.",
    },
    {
      genre: "Dark Tales",
      email: "dharmadeepmadisetty@gmail.com",
      instructions:
        "Send your dark and paranormal stories, articles, and poems focusing on forbidden magic and sinister rituals.",
    },
  ];

  return (
    <>
      <div className="p-10 flex flex-col items-center gap-5 ">
        <h2 className="text-5xl font-patrick mb-4 text-center sm:text-left text-gray-800">
          Publication Guidelines
        </h2>
        <img src={publish} className="max-h-[200px] sm:min-w-[550px]" alt="" />
      </div>
      <div className="py-2 px-14 sm:px-60 flex flex-col items-center">
        <p className="text-gray-600 mb-6">
          Please follow the guidelines below for submitting your work:
        </p>
        <ul className="text-gray-600 mb-6">
          <li>- Ensure that the content is appropriate for the genre.</li>
          <li>
            - Can publish your own stories, poems and articles or researched
            works.
          </li>
          <li>
            - Ensure that the content is well-written and well-structured.
          </li>
        </ul>
        <ul className="space-y-6">
          {guidelines.map((guideline, index) => (
            <li key={index} className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-medium text-gray-700">
                {guideline.genre}
              </h3>
              <p className="text-gray-600 mt-2">
                <strong>Instructions:</strong> {guideline.instructions}
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong>{" "}
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${guideline.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {guideline.email}
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PublishGuidelines;
