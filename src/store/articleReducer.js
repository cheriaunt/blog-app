import { CREATE_ARTICLE, DELETE_ARTICLE, ERROR_ARTICLE, GET_ARTICLE } from "./typesAction";

const initialState = {
    loading: true,
    article: false,
    error: false,
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
      case ERROR_ARTICLE:
        return{
        ...state,
        loading: false,
      }
      case DELETE_ARTICLE:
        return {
          ...state,
          loading: false,

        }

    default:
      return state
  }
};