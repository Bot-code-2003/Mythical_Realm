import Article from "../models/article.js";

// Controller to handle both saving as draft and publishing an article
export const handleArticle = async (req, res) => {
  const {
    title,
    description,
    author,
    category,
    article,
    coverImage,
    status,
    _id,
  } = req.body;

  try {
    let savedArticle;

    if (_id) {
      // If _id exists, update the existing article
      savedArticle = await Article.findByIdAndUpdate(
        _id,
        { title, description, author, category, article, coverImage, status },
        { new: true }
      );
    } else {
      // If no _id, create a new article
      const newArticle = new Article({
        title,
        description,
        author,
        category,
        article,
        coverImage, // Base64 string of the image
        status,
      });
      savedArticle = await newArticle.save();
    }

    res
      .status(201)
      .json({ message: `Article ${status} successfully`, savedArticle });
  } catch (error) {
    console.error(`Error ${status} article:`, error);
    res
      .status(500)
      .json({ message: `An error occurred while ${status} the article` });
  }
};

export const handleStory = async (req, res) => {
  const {
    mainStory,
    title,
    description,
    author,
    category,
    article,
    coverImage,
    status,
    _id,
  } = req.body;

  try {
    let savedStory;

    if (_id) {
      // If _id exists, update the existing article
      savedStory = await Article.findByIdAndUpdate(
        _id,
        {
          mainStory,
          title,
          description,
          author,
          category,
          article,
          coverImage,
          status,
        },
        { new: true }
      );
    } else {
      // If no _id, create a new article
      const newStory = new Article({
        mainStory,
        title,
        description,
        author,
        category,
        article,
        coverImage, // Base64 string of the image
        status,
      });
      savedStory = await newStory.save();
    }

    res
      .status(201)
      .json({ message: `Story ${status} successfully`, savedStory });
  } catch (error) {
    console.error(`Error ${status} article:`, error);
    res
      .status(500)
      .json({ message: `An error occurred while ${status} the article` });
  }
};

// Controller to get articles based on status and category
export const getArticle = async (req, res) => {
  const { genre } = req.query; // Retrieve genre from query parameters

  try {
    // Build the query object dynamically
    const query = {
      status: "published",
    };

    if (genre) {
      query.category = genre; // Add genre to the query if it is provided
    }

    if (genre === "All") {
      const articles = await Article.find();
      res.status(200).json(articles);
    } else {
      // Find articles that match the query
      const articles = await Article.find(query);

      // Return the found articles or an empty array if no articles were found
      res.status(200).json(articles);
    }
  } catch (error) {
    console.error("Error fetching articles:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the articles" });
  }
};

// Controller to delete an article
export const handleDelete = async (req, res) => {
  const { id } = req.params;
  try {
    await Article.findByIdAndDelete(id);
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the article" });
  }
};

// Controller to get a single article
export const getSingleArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the article" });
  }
};
