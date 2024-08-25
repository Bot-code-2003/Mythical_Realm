const initialState = {
  article: [], // Initialize as an array
  singleArticle: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("Profile", JSON.stringify(action.payload));
      return state; // Make sure to return the state here

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

    default:
      return state;
  }
};
