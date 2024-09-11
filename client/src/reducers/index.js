const initialState = {
  articles: [], // all the articles
  stories: [], // all the stories
  story: null, // single story
  topPicks: [], // top-picked stories
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
        story: action.payload, // Handle single story payload
      };

    case "GET_TOP_PICKS":
      return {
        ...state,
        topPicks: action.payload.length > 0 ? action.payload : [], // Handle top picks payload
      };

    default:
      return state;
  }
};
