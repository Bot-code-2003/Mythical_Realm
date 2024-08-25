import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const handleLogin = (formData) => API.post("/user/login", formData);

export const handleArticle = (articleData) =>
  API.post("/article/submit", articleData);

export const getArticle = (genre) =>
  API.get(`/article/getArticle?genre=${genre}`);

export const getSingleArticle = (id) =>
  API.get(`/article/getSingleArticle/${id}`);

export const handleDelete = (id) => API.delete(`/article/delete/${id}`);
