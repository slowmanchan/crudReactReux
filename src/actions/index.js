import axios from 'axios';

export const CREATE_POST = 'CREATE_POST';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';
// must export actions !!!
const ROOT_URL = 'http://reduxblog.herokuapp.com/api'
const API_KEY = '?key=norman1234'

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts/${API_KEY}`)

  return {
    type: FETCH_POSTS,
    payload: request
  }
}
// callback passed in for path redirection (after success post, call
// the callback for the redirection)
export function createPost(values, callback) {
  const request = axios.post(`${ROOT_URL}/posts/${API_KEY}`, values)
    .then(() => callback());

  return {
    type: CREATE_POST,
    payload: request
  }
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)
  return {
    type: FETCH_POST,
    payload: request
  }
}

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(() => callback());
  // just return the id in payload(instead of whole post)
  // we dont need the post (since its being deleted)
  // the reducer just needs the id to update the GLOBAL state
  return {
    type: DELETE_POST,
    payload: id
  }
}
