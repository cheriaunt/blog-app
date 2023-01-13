import { LOG_IN, GET_USER, EDIT_PROFILE, ERROR, LOG_OUT } from './typesAction'

const initialState = {
  user: null,
  errors: '',
}

export const userReducer = (state = initialState, action) => {
  switch (action?.type) {
    case LOG_IN:
      return {
        ...state,
        user: action.payload,
        errors: '',
      }
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        errors: '',
      }
    case EDIT_PROFILE:
      return {
        ...state,
        errors: '',
      }
    case ERROR:
      return {
        ...state,
        errors: action.payload,
      }
    case LOG_OUT:
      return {
        ...state,
        user: null,
        erros: '',
      }

    default:
      return state
  }
}
