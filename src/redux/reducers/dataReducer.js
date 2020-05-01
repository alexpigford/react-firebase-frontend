import {
  SET_CHIRPS,
  LIKE_CHIRP,
  UNLIKE_CHIRP,
  LOADING_DATA,
  DELETE_CHIRP,
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
    case LIKE_CHIRP:
    case UNLIKE_CHIRP:
      let index = state.chirps.findIndex(
        (chirp) => chirp.chirpId === action.payload.chirpId
      );
      state.chirps[index] = action.payload;
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
    default:
      return state;
  }
}
