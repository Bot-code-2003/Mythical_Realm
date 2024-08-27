import * as api from "../api";

export const handleLogin =
  (formData, navigate, setEmail, setPassword) => async (dispatch) => {
    try {
      const { data } = await api.handleLogin(formData);
      const action = {
        type: "LOGIN",
        payload: data,
      };

      dispatch(action);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Show an alert with the error message
        alert("Invalid credentials. Please try again.");
        setEmail("");
        setPassword("");
        navigate("/auth");
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

// Action to handle both saving as draft and publishing an articleimport * as api from "../api";

//To publish an article
export const handleArticle = (articleData) => async (dispatch) => {
  try {
    const { data } = await api.handleArticle(articleData);

    const action = {
      type: articleData.status === "published" ? "PUBLISH" : "SAVE_DRAFT",
      payload: data.savedArticle, // Use the saved or updated article
    };
    dispatch(action);
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};

//To publish a story
export const handleStory = (storyData) => async (dispatch) => {
  try {
    // console.log(" storyData ", storyData);
    const { data } = await api.handleStory(storyData);

    const action = {
      type: storyData.status === "published" ? "PUBLISH" : "SAVE_DRAFT",
      payload: data.savedStory, // Use the saved or updated story
    };
    dispatch(action);
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};

export const getArticle = (genre) => async (dispatch) => {
  try {
    const { data } = await api.getArticle(genre);
    const action = {
      type: "GET_ARTICLE",
      payload: data, // Ensure 'data' is an array
    };
    dispatch(action);
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};

export const getSingleArticle = (id) => async (dispatch) => {
  try {
    const { data } = await api.getSingleArticle(id);
    const action = {
      type: "GET_SINGLE_ARTICLE",
      payload: data, // Ensure 'data' is an array
    };
    dispatch(action);
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};

export const clearSingleArticle = () => ({
  type: "CLEAR_SINGLE_ARTICLE",
});

export const handleDelete = (id) => async (dispatch) => {
  try {
    await api.handleDelete(id);
    const action = {
      type: "DELETE_ARTICLE",
      payload: id,
    };
    dispatch(action);
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};

// Story

export const getStories = (genre) => async (dispatch) => {
  try {
    const { data } = await api.getStories(genre);
    const action = {
      type: "GET_STORIES",
      payload: data, // Ensure 'data' is an array
    };
    dispatch(action);
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};

export const getSingleStory = (story) => async (dispatch) => {
  try {
    // console.log("id", id);

    // const { data } = await api.getSingleStory(id);
    const action = {
      type: "GET_SINGLE_STORY",
      payload: story,
    };
    dispatch(action);
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};

// No needed as of now as everything is being handled from the stories state.
export const getStoryChapter = (storyId, chapterId) => async (dispatch) => {
  try {
    // console.log("genre, storyName, id ===>", genre, storyName, id);

    const { data } = await api.getStoryChapter(storyId, chapterId);
    const action = {
      type: "GET_STORY_CHAPTER",
      payload: data,
    };

    dispatch(action);
  } catch (error) {
    console.log("An unexpected error occurred:", error);
  }
};

export const clearSingleStory = () => ({
  type: "CLEAR_SINGLE_STORY",
});

export const handleDeleteStory = (id) => async (dispatch) => {
  try {
    await api.handleDeleteStory(id);
    const action = {
      type: "DELETE_STORY",
      payload: id,
    };
    dispatch(action);
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};
