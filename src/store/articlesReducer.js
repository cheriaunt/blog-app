const initialState = {
  loading: true,
  articles: [],
  articlesCount: 0,
  offset: 0,
};

export const GET_ALL_ARTICLES = 'GET_ALL_ARTICLES';
  
export const articlesReducer = (state = initialState, action) => {
  switch (action?.type) {
    case GET_ALL_ARTICLES:
      return {
        ...state,
        articles: [...action.payload],
        loading: false,
        articlesCount: action.articlesCount,
      }

    default:
      return state
  }
};