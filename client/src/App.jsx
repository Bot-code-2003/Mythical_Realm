//Dependencies
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";

//Components and Pages
import ImageInput from "./components/ImageInput";
import RichEditor from "./components/RichEditor";
import HomePage from "./pages/home/HomePage";
import Section from "./pages/Section";
// import Story from "./pages/Story";
import Navbar from "./components/Navbar";
import PublishGuidelines from "./pages/PublishGuidelines";
import HomePageNav from "./pages/home/HomePageNav";
import Footer from "./components/Footer";
import Auth from "./pages/auth/Auth";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import Article from "./pages/Article";
import UploadStory from "./pages/UploadStory";
import StoryList from "./pages/StoryList";
import DetailedStory from "./pages/DetailedStory";
import DetailedChapter from "./pages/DetailedChapter";
import Blogs from "./pages/Blogs";
import Gemini from "./components/Gemini";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
              <Footer />
            </>
          }
        />
        <Route
          path="/publish"
          element={
            <>
              <Navbar />
              <HomePageNav />
              <PublishGuidelines />
              <Footer />
            </>
          }
        />

        <Route
          path="/allPosts"
          element={
            <>
              <Navbar />
              <Section genre="All" />
              <Footer />
            </>
          }
        />

        <Route
          path="/fantasy"
          element={
            <>
              <Navbar />
              <Section genre="Fantasy" />
              <Footer />
            </>
          }
        />

        <Route
          path="/dark-tales"
          element={
            <>
              <Navbar />
              <Section genre="Dark Fantasy" />

              <Footer />
            </>
          }
        />

        <Route
          path="/space"
          element={
            <>
              <Navbar />
              <Section genre="Space" />

              <Footer />
            </>
          }
        />

        <Route
          path="/auth"
          element={
            <>
              <Auth />
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <Navbar />
              <HomePageNav />
              <Profile />

              <Footer />
            </>
          }
        />

        <Route
          path="/article/:slugTitle/:slugGenre/:id"
          element={
            <>
              <Navbar />
              <HomePageNav />
              <Article />
              <Footer />
            </>
          }
        />

        <Route
          path="allBlogs"
          element={
            <>
              <Navbar />
              <HomePageNav />
              <Blogs genre="All" />

              <Footer />
            </>
          }
        />

        <Route path="/upload" element={<Upload />} />
        <Route path="/saved" />
        <Route path="/testing" element={<UploadStory />} />
        <Route
          path="/allStories"
          element={
            <>
              <Navbar />
              <HomePageNav />
              <StoryList genre="All" />

              <Footer />
            </>
          }
        />
        <Route
          path="/story/:storyCategory/:storyName/:storyId"
          element={
            <>
              <Navbar />
              <HomePageNav />
              <DetailedStory />

              <Footer />
            </>
          }
        />
        <Route
          path="/story/:storyCategory/:storyName/chapter/:chapterName"
          element={
            <>
              <Navbar />
              <HomePageNav />
              <DetailedChapter />
              <Footer />
            </>
          }
        />

        <Route
          path="/gemini"
          element={
            <>
              <Navbar />
              <HomePageNav />
              <Gemini />

              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
