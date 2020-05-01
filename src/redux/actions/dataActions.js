import {
  SET_CHIRPS,
  LOADING_DATA,
  LIKE_CHIRP,
  UNLIKE_CHIRP,
  DELETE_CHIRP,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
  POST_CHIRP,
} from "../types";
import axios from "axios";

// get all chirps
export const getChirps = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/chirps")
    .then((res) => {
      dispatch({
        type: SET_CHIRPS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_CHIRPS,
        payload: [],
      });
    });
};

// post a chirp
export const postChirp = (newChirp) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/chirp", newChirp)
    .then((res) => {
      dispatch({
        type: POST_CHIRP,
        payload: res.data,
      });
      dispatch({
        type: CLEAR_ERRORS,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// like a chirp
export const likeChirp = (chirpId) => (dispatch) => {
  axios
    .get(`/chirp/${chirpId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_CHIRP,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// unlike a chirp
export const unlikeChirp = (chirpId) => (dispatch) => {
  axios
    .get(`/chirp/${chirpId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_CHIRP,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// delete a chirp
export const deleteChirp = (chirpId) => (dispatch) => {
  axios
    .delete(`/chirp/${chirpId}`)
    .then(() => {
      dispatch({ type: DELETE_CHIRP, payload: chirpId });
    })
    .catch((err) => console.log(err));
};
