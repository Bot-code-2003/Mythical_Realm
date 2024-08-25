//Dependencies
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";

//Components and Pages
import ImageInput from "./components/ImageInput";
import RichEditor from "./components/RichEditor";
import HomePage from "./pages/home/HomePage";
import Blog from "./pages/Blog";
import Story from "./pages/Story";
import Navbar from "./components/Navbar";
import PublishGuidelines from "./pages/PublishGuidelines";
import HomePageNav from "./pages/home/HomePageNav";
import Footer from "./components/Footer";
import Auth from "./pages/auth/Auth";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import Article from "./pages/Article";

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
              <Blog genre="All" />
              <Footer />
            </>
          }
        />

        <Route
          path="/fantasy"
          element={
            <>
              <Navbar />
              <Blog genre="Fantasy" />
              <Footer />
            </>
          }
        />

        <Route
          path="/dark-tales"
          element={
            <>
              <Navbar />
              <Blog genre="Dark Fantasy" />

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

        <Route path="/upload" element={<Upload />} />
        <Route path="/saved" />
      </Routes>
    </div>
  );
};

export default App;
