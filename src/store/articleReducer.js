import { CREATE_ARTICLE, ERROR_CREATE_ARTICLE, GET_ARTICLE } from "./typesAction";

const initialState = {
    loading: true,
    article: false,
  };
  

    
  export const articleReducer = (state = initialState, action={}) => {
    switch (action.type) {
      case GET_ARTICLE:
        return {
            ...state,
            article: action.payload,
            loading: false,
        }
      case CREATE_ARTICLE:
        return {
          ...state,
          article: action.payload,
          loading: false,
        }
        case ERROR_CREATE_ARTICLE:
          return {}
  
      default:
        return state
    }
  };
    
//   export const getArticle = (payload) => ({ type: GET_ARTICLE, payload: body.article });