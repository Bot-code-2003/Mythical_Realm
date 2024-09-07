import express from "express";
import {
  handleStory,
  getStories,
  getStory,
  handleDelete,
  handleCheckboxChangeStory,
  getHomepageStories,
} from "../controllers/story.js";

const router = express.Router();

// Route to submit or update a story
router.post("/submit", handleStory);

// Route to get stories by genre
router.get("/getStories", getStories);

// Route to get a single story
router.get("/getStory/:id", getStory);

router.get("/getHomepageStories", getHomepageStories);

router.patch("/:id", handleCheckboxChangeStory);

//////////////////////////////////////
// These are currently not in use.////
//////////////////////////////////////

router.delete("/delete/:id", handleDelete);

export default router;
