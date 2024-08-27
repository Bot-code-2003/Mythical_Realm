import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const handleLogin = (formData) => API.post("/user/login", formData);

export const handleArticle = (articleData) =>
  API.post("/article/submit", articleData);

export const handleStory = (storyData) => API.post("/story/submit", storyData);

export const getArticle = (genre) =>
  API.get(`/article/getArticle?genre=${genre}`);

export const getSingleArticle = (id) =>
  API.get(`/article/getSingleArticle/${id}`);

export const handleDelete = (id) => API.delete(`/article/delete/${id}`);

// New API calls for stories
export const getStories = (genre) =>
  API.get(`/story/getStories?genre=${genre}`);

export const getSingleStory = (id) => API.get(`/story/getSingleStory/${id}`);

export const getStoryChapter = (storyId, chapterId) =>
  API.get(`/story/getStoryChapter/${storyId}/${chapterId}`);

export const handleDeleteStory = (id) => API.delete(`/story/delete/${id}`);
