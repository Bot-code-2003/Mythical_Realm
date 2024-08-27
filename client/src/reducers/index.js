const initialState = {
  article: [], // Initialize as an array
  singleArticle: [],
  stories: [], // Add stories state
  singleStory: null, // Add singleStory state
  chapter: null, // Add chapter state
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("Profile", JSON.stringify(action.payload));
      return state;

    case "GET_ARTICLE":
      return {
        ...state,
        article:
          action.payload && action.payload.length > 0 ? action.payload : [], // Set to [] if payload is empty
      };

    case "GET_SINGLE_ARTICLE":
      return {
        ...state,
        singleArticle: action.payload,
      };

    case "GET_STORIES":
      return {
        ...state,
        stories: action.payload.length > 0 ? action.payload : [], // Handle stories payload
      };

    case "GET_SINGLE_STORY":
      return {
        ...state,
        singleStory: action.payload,
      };

    case "GET_STORY_CHAPTER":
      return {
        ...state,
        chapter: action.payload, // Update the chapter state with the payload
      };

    case "CLEAR_SINGLE_STORY":
      return {
        ...state,
        singleStory: null,
      };

    default:
      return state;
  }
};
