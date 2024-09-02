const initialState = {
  articles: [], // all the articles
  // singleArticle: [], // single article
  stories: [], // all the stories
  // singleStory: null, // single story
  story: null,

  // Add chapter state as of now not in use.
  // chapter: null, // Add chapter state
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("Profile", JSON.stringify(action.payload));
      return state;

    case "GET_ARTICLE":
      return {
        ...state,
        articles:
          action.payload && action.payload.length > 0 ? action.payload : [], // Set to [] if payload is empty
      };

    case "GET_STORIES":
      return {
        ...state,
        stories: action.payload.length > 0 ? action.payload : [], // Handle stories payload
      };

    case "GET_STORY":
      return {
        ...state,
        story: action.payload, // Handle story payload
      };

    default:
      return state;
  }
};
