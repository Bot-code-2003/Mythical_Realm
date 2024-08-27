import Story from "../models/story.js";

// Controller to handle story submission
export const handleStory = async (req, res) => {
  console.log("handleStory controller called");
  const {
    storyName,
    storyImage,
    storyCategory,
    storyDescription,
    storyAuthor,
    chapters,
    status,
    _id,
  } = req.body;

  try {
    let savedStory;

    if (_id) {
      // If the story ID exists, update the existing story
      savedStory = await Story.findByIdAndUpdate(
        _id,
        {
          storyName,
          storyImage,
          storyCategory,
          storyDescription,
          storyAuthor,
          chapters,
          status,
        },
        { new: true }
      );
    } else {
      // Otherwise, create a new story
      const newStory = new Story({
        storyName,
        storyImage,
        storyCategory,
        storyDescription,
        storyAuthor,
        chapters,
        status,
      });
      savedStory = await newStory.save();
    }

    res.status(200).json({ savedStory });
  } catch (error) {
    console.error("An unexpected error occurred in handleStory:", error);
    res.status(500).json({ message: "Failed to save the story", error });
  }
};

export const getStories = async (req, res) => {
  const { genre } = req.query;

  try {
    if (genre === "All") {
      const stories = await Story.find();
      res.status(200).json(stories);
    } else {
      const stories = await Story.find({ storyCategory: genre });
      res.status(200).json(stories);
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    res.status(500).json({ message: "Failed to retrieve stories", error });
  }
};

// Controller to get a single story by ID
export const getSingleStory = async (req, res) => {
  const { id } = req.params;

  try {
    const story = await Story.findById(id);
    if (story) {
      res.status(200).json(story);
    } else {
      res.status(404).json({ message: "Story not found" });
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    res.status(500).json({ message: "Failed to retrieve the story", error });
  }
};

export const getStoryChapter = async (req, res) => {
  const { storyId, chapterId } = req.params;
  console.log("storyId, chapterId", storyId, chapterId);

  try {
    // Find the story by ID
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    } else {
      console.log("story found");
    }

    // Find the chapter within the story's chapters array
    const chapter = story.chapters.id(chapterId);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    } else {
      console.log("chapter found");
    }

    res.json(chapter);
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    res.status(500).json({ message: "Failed to retrieve the chapter", error });
  }
};

export const handleDelete = async (req, res) => {
  const { id } = req.params;
  try {
    await Story.findByIdAndDelete(id);
    res.status(200).json({ message: "Story deleted successfully" });
  } catch (error) {
    console.error("Error deleting story:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the story" });
  }
};
