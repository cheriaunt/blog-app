import { LOG_IN,GET_USER, EDIT_PROFILE, ERROR_LOG_IN } from "./typesAction";

const initialState = {
    user : null,
    error : '',
};
  
export const userReducer = (state = initialState, action) => {
  switch (action?.type) {
    case LOG_IN:
        return {
            ...state,
            user: action.payload,
            error: '',
        };
    case  GET_USER:
        return {
            ...state,
            error: '',
        };
    case  EDIT_PROFILE:
        return {
            ...state,
            user: action.payload,
            error: '',
        };
    case ERROR_LOG_IN:
        return {
            ...state,
            error: action.payload,
            
        }

    default:
      return state;
  }
};