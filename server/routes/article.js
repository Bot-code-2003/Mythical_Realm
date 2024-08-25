import express from "express";
import {
  handleArticle,
  getArticle,
  handleDelete,
  getSingleArticle,
} from "../controllers/article.js";

const router = express.Router();

router.post("/submit", handleArticle);

router.get("/getArticle", getArticle);

router.get("/getSingleArticle/:id", getSingleArticle);

router.delete("/delete/:id", handleDelete);

export default router;
