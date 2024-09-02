import express from "express";
import {
  handleStory,
  getStories,
  getStory,
  handleDelete,
} from "../controllers/story.js";

const router = express.Router();

// Route to submit or update a story
router.post("/submit", handleStory);

// Route to get stories by genre
router.get("/getStories", getStories);

// Route to get a single story
router.get("/getStory/:id", getStory);

//////////////////////////////////////
// These are currently not in use.////
//////////////////////////////////////

export default router;

router.delete("/delete/:id", handleDelete);
