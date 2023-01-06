import { combineReducers } from 'redux';
import { articleReducer } from './articleReducer';
import { articlesReducer } from './articlesReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  articles: articlesReducer,
  article: articleReducer,
  articlesCount: articlesReducer,
  user : userReducer,
  error : userReducer,
//   username: userReducer, 
//   image : userReducer,
//   password: userReducer,
});

export default rootReducer;