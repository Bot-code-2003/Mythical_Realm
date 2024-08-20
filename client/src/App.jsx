//Dependencies
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";

//Components and Pages
import ImageInput from "./components/ImageInput";
import RichEditor from "./components/RichEditor";
import HomePage from "./pages/HomePage";
import Blog from "./pages/Blog";
import Story from "./pages/Story";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/story" element={<Story />} />
      </Routes>
    </div>
  );
};

export default App;
