const initialState = {
  loading: true,
  articles: [],
};

export const GET_ALL_ARTICLES = 'GET_ALL_ARTICLES';
  
export const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ARTICLES:
      return {
        articles: [...state.articles, ...action.payload],
        loading: false,
      }

    default:
      return state
  }
};
  
export const getAllArticles = (payload) => ({ type: GET_ALL_ARTICLES, payload });