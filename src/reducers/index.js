// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from '@reduxjs/toolkit';
import postsReducer from './post_reducer';

const rootReducer = combineReducers({
  posts: postsReducer,
});

export default rootReducer;
