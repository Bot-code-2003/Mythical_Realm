import * as api from "../api";

//To publish a story
export const handleStory = (storyData) => async (dispatch) => {
  try {
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

//To get stories.
export const getStories = (genre) => async (dispatch) => {
  try {
    if (!genre) genre = "All";
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

//get a single story
export const getStory = (id) => async (dispatch) => {
  try {
    const { data } = await api.getStory(id);
    const action = {
      type: "GET_STORY",
      payload: data,
    };
    dispatch(action);
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};

//To delete a story
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

export const handleCheckboxChangeStory = (data) => async (dispatch) => {
  try {
    const status = data[0].actions; //either homepage or featured
    const id = data[0].id;
    // console.log("In actions :", status);
    await api.handleCheckboxChangeStory(id, status);
    const action = {
      type: "HANDLE_CHECKBOX_CHANGE_STORY",
      payload: data,
    };
    dispatch(action);
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};

export const getHomepageStories = () => async (dispatch) => {
  try {
    console.log("getHomepageStories called");

    const { data } = await api.getHomepageStories();
    console.log("Home page Stories fetched");
    return data;
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};
