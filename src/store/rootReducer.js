import { combineReducers } from 'redux';
import { articleReducer } from './articleReducer';

import { articlesReducer } from './articlesReducer';

const rootReducer = combineReducers({
  articles: articlesReducer,
  article: articleReducer,
});

export default rootReducer;