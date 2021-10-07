import {
  LOADING,
  MOVIE_DETAILS, MOVIE_FAVOURITE,
  MOVIE_SUGGESTIONS, MOVIES,
} from "../actionTypes";


const initialState = {
 movies: {results: []},
  movieDetails: {genres: []},
  loading: false,
  movieSuggestions: {results: []},
  favourites: []
};

function moviesReducer(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case MOVIES: {
      return {
        ...state,
        movies: payload,
      };
    }
    case MOVIE_DETAILS: {
      return {
        ...state,
        movieDetails: payload
      };
    }
    case LOADING: {
      return {
        ...state,
        loading: payload,
      };
    }
    case MOVIE_SUGGESTIONS: {
      return {
        ...state,
        movieSuggestions: payload,
      };
    }
    case MOVIE_FAVOURITE: {
      return {
        ...state,
        favourites: payload,
      };
    }
    default:
      return state;
  }
}

export default moviesReducer;
