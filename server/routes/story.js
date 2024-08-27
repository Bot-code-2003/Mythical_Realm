import express from "express";
import {
  handleStory,
  getStories,
  getSingleStory,
  getStoryChapter,
  handleDelete,
} from "../controllers/story.js";

const router = express.Router();

// Route to submit or update a story
router.post("/submit", handleStory);

// Route to get stories by genre
router.get("/getStories", getStories);

//////////////////////////////////////
// These are currently not in use.////
//////////////////////////////////////

// Route to get a single story by ID
router.get("/getSingleStory/:id", getSingleStory);

router.get("/getStoryChapter/:storyId/:chapterId", getStoryChapter);
export default router;

router.delete("/delete/:id", handleDelete);
