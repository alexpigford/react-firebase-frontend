import {
  SET_CHIRPS,
  LOADING_DATA,
  LIKE_CHIRP,
  UNLIKE_CHIRP
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
