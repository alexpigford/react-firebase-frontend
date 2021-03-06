import {
  SET_CHIRPS,
  LIKE_CHIRP,
  UNLIKE_CHIRP,
  LOADING_DATA,
  DELETE_CHIRP,
  POST_CHIRP,
  SET_CHIRP,
  SUBMIT_REPLY,
} from "../types";

const initialState = {
  chirps: [],
  chirp: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_CHIRPS:
      return {
        ...state,
        chirps: action.payload,
        loading: false,
      };
    case SET_CHIRP:
      return {
        ...state,
        chirp: action.payload,
      };
    case LIKE_CHIRP:
    case UNLIKE_CHIRP:
      let index = state.chirps.findIndex(
        (chirp) => chirp.chirpId === action.payload.chirpId
      );
      state.chirps[index] = action.payload;
      if (state.chirp.chirpId === action.payload.chirpId) {
        state.chirp = { ...state.chirp, ...action.payload };
      }
      return {
        ...state,
      };
    case DELETE_CHIRP:
      return {
        ...state,
        chirps: state.chirps.filter(
          (chirp) => chirp.chirpId !== action.payload
        ),
      };
    case POST_CHIRP:
      return {
        ...state,
        chirps: [action.payload, ...state.chirps],
      };
    case SUBMIT_REPLY:
      return {
        ...state,
        chirp: {
          ...state.chirp,
          replies: [action.payload, ...state.chirp.replies],
        },
      };
    default:
      return state;
  }
}
