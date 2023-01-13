import { combineReducers } from 'redux'

import { articleReducer } from './articleReducer'
import { articlesReducer } from './articlesReducer'
import { userReducer } from './userReducer'

const rootReducer = combineReducers({
  articles: articlesReducer,
  article: articleReducer,
  user: userReducer,
})

export default rootReducer
