import axios from 'axios';

const ROOT_URL = 'https://recipe-api-knja.onrender.com/api';
const API_KEY = '?key=l_liang';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
};

export function fetchPosts() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/posts${API_KEY}`);
      dispatch({
        type: ActionTypes.FETCH_POSTS,
        payload: response.data,
      });
    } catch (error) {
      console.log(`fetch posts api error: ${error}`);
      throw error;
    }
  };
}

export function fetchFavoritePosts() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/posts${API_KEY}`);
      dispatch({
        type: ActionTypes.FETCH_POSTS,
        payload: response.data,
      });
    } catch (error) {
      console.log(`fetch posts api error: ${error}`);
      throw error;
    }
  };
}

export function fetchPost(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/posts/${id}/${API_KEY}`);
      // do something with response.data  (some json)
      dispatch({
        type: ActionTypes.FETCH_POST,
        payload: response.data,
      });
    } catch (error) {
      console.log(`fetch post api error: ${error}`);
      throw error;
    }
  };
}

export function createPost(post, navigate) {
  // assumption: takes post in as hashmap
  return async (dispatch) => {
    try {
      await axios.post(`${ROOT_URL}/posts${API_KEY}`, post);
      const response = await axios.get(`${ROOT_URL}/posts${API_KEY}`);
      dispatch({
        type: ActionTypes.FETCH_POSTS,
        payload: response.data,
      });
      // then navigate!!
      navigate('/posts/');
    } catch (error) {
      dispatch(new Error(`failed to create post: ${error}`));
    }
  };
}

export function updatePost(post, id) {
  // assumption: takes post in as hashmap
  return async (dispatch) => {
    try {
      const response = await axios.put(`${ROOT_URL}/posts/${id}/${API_KEY}`, post);
      // do something with response.data  (some json)
      dispatch({
        type: ActionTypes.FETCH_POST,
        payload: response.data,
      });
      const response2 = await axios.get(`${ROOT_URL}/posts${API_KEY}`);
      dispatch({
        type: ActionTypes.FETCH_POSTS,
        payload: response2.data,
      });
    } catch (error) {
      console.log(`failed to update post: ${error}`);
      throw error;
    }
  };
}

export function deletePost(id, navigate) {
  return async (dispatch) => {
    try {
      await axios.delete(`${ROOT_URL}/posts/${id}/${API_KEY}`);
      const response = await axios.get(`${ROOT_URL}/posts${API_KEY}`);
      // do something with response.data  (some json)
      await dispatch({
        type: ActionTypes.FETCH_POSTS,
        payload: response.data,
      });
      navigate('/posts/');
    } catch (error) {
      console.log(`delete post api error: ${error}`);
      throw error;
    }
  };
}
