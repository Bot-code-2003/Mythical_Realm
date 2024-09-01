import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

//////////////////////////////////////////
//////////////// AUTH ////////////////////
//////////////////////////////////////////
export const handleLogin = (formData) => API.post("/user/login", formData);

//////////////////////////////////////////
///////////// ARTICLE ////////////////////
//////////////////////////////////////////
export const handleArticle = (articleData) =>
  API.post("/article/submit", articleData);

export const getArticle = (genre) =>
  API.get(`/article/getArticle?genre=${genre}`);

export const handleDelete = (id) => API.delete(`/article/delete/${id}`);

//////////////////////////////////////////
///////////// Story //////////////////////
//////////////////////////////////////////
export const handleStory = (storyData) => API.post("/story/submit", storyData);

export const getStories = (genre) =>
  API.get(`/story/getStories?genre=${genre}`);

export const handleDeleteStory = (id) => API.delete(`/story/delete/${id}`);
