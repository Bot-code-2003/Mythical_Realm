import express from "express";
import { handleStory, getStories, handleDelete } from "../controllers/story.js";

const router = express.Router();

// Route to submit or update a story
router.post("/submit", handleStory);

// Route to get stories by genre
router.get("/getStories", getStories);

//////////////////////////////////////
// These are currently not in use.////
//////////////////////////////////////

export default router;

router.delete("/delete/:id", handleDelete);
