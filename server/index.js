import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import articleRoutes from "./routes/article.js";
import storyRoutes from "./routes/story.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// Configure CORS
const corsOptions = {
  origin: process.env.CLIENT_URL || "*", // Replace with your client's URL
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Routes
app.use("/user", userRoutes);
app.use("/article", articleRoutes);
app.use("/story", storyRoutes);

app.get("/", (req, res) => {
  res.send("Mythical Realm Server");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    })
  )
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err.message);
  });
