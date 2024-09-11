import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the schema for a chapter
const ChapterSchema = new Schema({
  chapterName: {
    type: String,
    required: true,
  },
  chapterImage: {
    type: String,
    required: false,
  },
  chapterDesc: {
    type: String,
    required: true,
  },
  chapterStory: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the schema for a story
const StorySchema = new Schema(
  {
    storyName: {
      type: String,
      required: true,
      trim: true,
    },
    storyImage: {
      type: String,
      required: false,
    },
    storyCategory: {
      type: String,
      required: true,
      trim: true,
    },
    storyDescription: {
      type: String,
      required: true,
      trim: true,
    },
    storyAuthor: {
      type: String,
      required: true,
      trim: true,
    },
    isTopPick: {
      type: Boolean,
      default: false,
    },
    chapters: [ChapterSchema], // Array of chapters
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Story = mongoose.model("Story", StorySchema);

export default Story;
