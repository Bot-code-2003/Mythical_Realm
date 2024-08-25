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
