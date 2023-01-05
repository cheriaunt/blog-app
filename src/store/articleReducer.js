const initialState = {
    loading: true,
    article: false,
  };
  
  export const GET_ARTICLE = 'GET_ARTICLE';
    
  export const articleReducer = (state = initialState, action={}) => {
    switch (action.type) {
      case GET_ARTICLE:
        return {
            ...state,
            article: action.payload,
            loading: false,
        }
  
      default:
        return state
    }
  };
    
//   export const getArticle = (payload) => ({ type: GET_ARTICLE, payload: body.article });