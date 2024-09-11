import Story from "../models/story.js";

// Controller to handle story submission
export const handleStory = async (req, res) => {
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

export const getStory = async (req, res) => {
  const { id } = req.params;
  try {
    const story = await Story.findById(id);
    res.status(200).json(story);
  } catch (error) {
    console.error("Error retrieving story:", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the story" });
  }
};

export const handleCheckboxChangeStory = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    // Find the story by its ID
    let story = await Story.findById(id);

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    // Update the status and set homePage to true if status is 'homepage'
    story.status = status;
    story.homePage = status === "homepage";

    // Save the updated story
    await story.save();

    res.status(200).json({ message: "Story updated successfully", story });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getHomepageStories = async (req, res) => {
  try {
    // Find all stories where homePage is true
    const stories = await Story.find({ homePage: true });

    if (!stories || stories.length === 0) {
      return res.status(404).json({ message: "No homepage stories found" });
    }

    // Send the stories in the response
    res.status(200).json(stories);
  } catch (error) {
    console.error("Error fetching homepage stories:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to update top picks
export const updateTopPicks = async (req, res) => {
  try {
    const { topPicks } = req.body;

    // Set isTopPick to false for all stories
    await Story.updateMany({}, { isTopPick: false });

    // Set isTopPick to true for the selected top picks
    await Story.updateMany({ _id: { $in: topPicks } }, { isTopPick: true });

    // Return updated stories
    const updatedStories = await Story.find({ _id: { $in: topPicks } });

    res.status(200).json(updatedStories);
  } catch (error) {
    console.error("Error updating top picks:", error);
    res.status(500).json({ message: "Failed to update top picks" });
  }
};

export const getTopPicks = async (req, res) => {
  try {
    // Fetch all stories where isTopPick is true
    const topPicks = await Story.find({ isTopPick: true });
    res.status(200).json(topPicks);
  } catch (error) {
    console.error("Error fetching top picks:", error);
    res.status(500).json({ message: "Failed to fetch top picks" });
  }
};
