import * as api from "../api";

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

//To get articles.
export const getArticle = (genre) => async (dispatch) => {
  try {
    if (!genre) genre = "All";
    const { data } = await api.getArticle(genre);
    // console.log("data ", data);
    const action = {
      type: "GET_ARTICLE",
      payload: data, // Ensure 'data' is an array
    };
    dispatch(action);
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};

//To delete an article
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
