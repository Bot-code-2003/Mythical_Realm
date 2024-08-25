import mongoose from "mongoose";

const articleSchema = mongoose.Schema({
  title: String,
  description: String,
  author: String,
  category: String,
  article: String,
  coverImage: String, // Store Base64 image as a string
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Article = mongoose.model("Article", articleSchema);

export default Article;
