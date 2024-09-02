import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import CircularProgress from "@mui/material/CircularProgress";

import thinking from "../assets/thinking.jpg";

const categories = {
  genre: [
    "Cult",
    "Horror",
    "Fantasy",
    "Space",
    "Slice of Life",
    "Romance + Fantasy",
    "Space + Cult",
  ],
  timeSetting: [
    "Past",
    "Present",
    "Future",
    "Alternate Reality",
    "Timeless",
    "Multiverse",
  ],
  endingType: ["Happy", "Sad", "Open", "Bittersweet", "Tragic", "Twist"],
  protagonistType: [
    "Hero",
    "Anti-Hero",
    "Villain",
    "Outsider",
    "Rebel",
    "Pirate",
    "Romantic",
    "Techy",
    "Gangster",
    "Spy",
  ],
  tone: [
    "Dark",
    "Light-hearted",
    "Suspenseful",
    "Melancholic",
    "Mysterious",
    "Hopeful",
    "Surrealistic",
    "Sociable",
    "Tragic",
    "Futuristic",
    "Nostalgic",
  ],
  plotTwist: [
    "Identity Reveal",
    "Unexpected Ally",
    "Betrayal",
    "Time Loop",
    "False Villain",
    "Issekai",
    "Hidden Identity",
  ],
  theme: [
    "Power",
    "Survival",
    "Identity",
    "Love",
    "Fear",
    "Discovery",
    "Sacrifice",
    "Hope",
    "Hate",
    "War",
    "Death",
    "Rebirth",
  ],
};

const Gemini = () => {
  const [genre, setGenre] = useState("");
  const [timeSetting, setTimeSetting] = useState("");
  const [endingType, setEndingType] = useState("");
  const [protagonistType, setProtagonistType] = useState("");
  const [tone, setTone] = useState("");
  const [plotTwist, setPlotTwist] = useState("");
  const [theme, setTheme] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const generateContent = async () => {
    setLoading(true);
    const prompt = `Generate an inspiration for a ${tone} ${genre} story set in the ${timeSetting} era, featuring a ${protagonistType} as the protagonist, with a ${endingType} ending and a ${plotTwist} twist. The story should explore the theme of ${theme}. Use simple vocabulary.`;
    try {
      const result = await model.generateContent(prompt);
      setOutput(result.response.text);
    } catch (error) {
      setOutput(
        "An error occurred while generating the story. Please try again."
      );
    }
    setLoading(false);
  };

  const formatOutput = (text) => {
    // Use a regular expression to find text between ** and format it accordingly
    return text.split("\n").map((line, index) => {
      const parts = line.split("**").map((part, i) => {
        if (i % 2 === 1) {
          return (
            <span key={i} className="font-bold underline">
              {part}
            </span>
          );
        }
        return part;
      });

      return (
        <p key={index} className="mb-2">
          {parts}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 min-h-screen">
      <div className="flex flex-col gap-4 items-center bg-gradient-to-r from-green-400 to-blue-400 p-6 rounded-md">
        <h1 className="text-xl sm:text-5xl font-bold mb-2 text-center font-roboto text-gray-100">
          Welcome to Mythical Realm story generator
        </h1>
        <p className="text-center text-gray-100 text-md sm:text-xl  mb-4">
          * Here you can get some story inspirations and can co-author stories
          with help of our AI *
        </p>
        {/* <img src={thinking} className="h-[200px]" alt="" /> */}
      </div>

      <div className="flex flex-col flex-wrap gap-4">
        <div>
          <h2 className="font-semibold mb-2">Select Genre:</h2>
          <div className="flex flex-wrap gap-2">
            {categories.genre.map((item) => (
              <button
                key={item}
                className={`border border-gray-300 rounded-full px-4 py-2 transition-all ${
                  genre === item
                    ? "bg-gradient-to-r from-green-800 to-green-500 text-white"
                    : "bg-white"
                }`}
                onClick={() => setGenre(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Select Time Setting:</h2>
          <div className="flex flex-wrap gap-2">
            {categories.timeSetting.map((item) => (
              <button
                key={item}
                className={`border border-gray-300 rounded-full px-4 py-2 transition-all ${
                  timeSetting === item
                    ? "bg-gradient-to-r from-green-800 to-green-500 text-white"
                    : "bg-white"
                }`}
                onClick={() => setTimeSetting(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Select Ending Type:</h2>
          <div className="flex flex-wrap gap-2">
            {categories.endingType.map((item) => (
              <button
                key={item}
                className={`border border-gray-300 rounded-full px-4 py-2 transition-all ${
                  endingType === item
                    ? "bg-gradient-to-r from-green-800 to-green-500 text-white"
                    : "bg-white"
                }`}
                onClick={() => setEndingType(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Select Protagonist Type:</h2>
          <div className="flex flex-wrap gap-2">
            {categories.protagonistType.map((item) => (
              <button
                key={item}
                className={`border border-gray-300 rounded-full px-4 py-2 transition-all ${
                  protagonistType === item
                    ? "bg-gradient-to-r from-green-800 to-green-500 text-white"
                    : "bg-white"
                }`}
                onClick={() => setProtagonistType(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Select Tone:</h2>
          <div className="flex flex-wrap gap-2">
            {categories.tone.map((item) => (
              <button
                key={item}
                className={`border border-gray-300 rounded-full px-4 py-2 transition-all ${
                  tone === item
                    ? "bg-gradient-to-r from-green-800 to-green-500 text-white"
                    : "bg-white"
                }`}
                onClick={() => setTone(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Select Plot Twist:</h2>
          <div className="flex flex-wrap gap-2">
            {categories.plotTwist.map((item) => (
              <button
                key={item}
                className={`border border-gray-300 rounded-full px-4 py-2 transition-all ${
                  plotTwist === item
                    ? "bg-gradient-to-r from-green-800 to-green-500 text-white"
                    : "bg-white"
                }`}
                onClick={() => setPlotTwist(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Select Theme:</h2>
          <div className="flex flex-wrap gap-2">
            {categories.theme.map((item) => (
              <button
                key={item}
                className={`border border-gray-300 rounded-full px-4 py-2 transition-all ${
                  theme === item
                    ? "bg-gradient-to-r from-green-800 to-green-500 text-white"
                    : "bg-white"
                }`}
                onClick={() => setTheme(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={generateContent}
          className="border border-gray-300 rounded-full px-6 py-3 mt-4 bg-gradient-to-r from-green-400 to-blue-400 hover:bg-gradient-to-l text-white text-lg"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Generate Story Idea"}
        </button>
      </div>

      <div className="mt-8 p-4 w-[95%] sm:w-[80%] bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2 text-gray-600">
          Generated Story Idea:
        </h2>
        {/* <p className="font-crimson mt-4 text-gray-700">{output}</p> */}
        <p>{formatOutput(output)}</p>
      </div>
    </div>
  );
};

export default Gemini;
