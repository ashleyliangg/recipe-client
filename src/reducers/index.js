// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from '@reduxjs/toolkit';
import recipeReducer from './recipe_reducer';

const rootReducer = combineReducers({
  posts: recipeReducer,
});

export default rootReducer;
