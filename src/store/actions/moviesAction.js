import {
  MOVIES,
  LOADING,
  MOVIE_DETAILS,
  MOVIE_SUGGESTIONS,
  MOVIE_FAVOURITE
} from '../actionTypes';
import axios from 'axios';

const base_url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=4b5c7fb11eafda923721aee648ccb005'
export const image_base_url = 'https://image.tmdb.org/t/p/original'
    // /movie/{movie_id}/rating


export const getMovies = (page= 1) => async (dispatch) => {
  try {
    dispatch(loading(true))
    const res = await axios.get(`${base_url}&page=${page}`);
    dispatch({
        type: MOVIES,
        payload: res.data,
      });
      dispatch(loading(false))
  } catch (err) {
    dispatch(loading(false))
    alert(err.response.data)
  }
};

export const getMovieDetails = (id) => async (dispatch) => {
  try {
    dispatch(loading(true))
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=4b5c7fb11eafda923721aee648ccb005`);
    await dispatch(getMovieSuggestions(id))
    dispatch({
      type: MOVIE_DETAILS,
      payload: res.data,
    });
    dispatch(loading(false))
  } catch (err) {
    dispatch(loading(false))
    alert(err.response.data)
  }
};


export const loading = (data) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING,
      payload: data,
    });
  } catch (err) {
  }
};


export const rateMovie = (id, value) => async (dispatch) => {
  try {
    const res = await axios.get(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=4b5c7fb11eafda923721aee648ccb005`);
    await axios.post(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=4b5c7fb11eafda923721aee648ccb005&guest_session_id=${res.data.guest_session_id}`, {value});
    dispatch(getMovieDetails(id))
  } catch (err) {
   console.log(err)
  }
};


export const getMovieSuggestions = (id) => async (dispatch) => {
  try {
    const res =  await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=4b5c7fb11eafda923721aee648ccb005`);
    dispatch({
      type: MOVIE_SUGGESTIONS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err)
  }
};

export const addMovieFavourite = (data, favourites= []) => async (dispatch) => {
  try {
    let newFavourite = favourites
    const isFavourite = newFavourite.some(el => el.id === data.id)
    if(isFavourite) {
      newFavourite = favourites.filter(element => element.id !== data.id)
    } else {
      newFavourite.push(data)
    }

    dispatch({
      type: MOVIE_FAVOURITE,
      payload: newFavourite,
    });
  } catch (err) {
    console.log(err)
  }
};

export const removeMovieFavourite = (id, favourites= []) => async (dispatch) => {
  try {
    const newFavourite = favourites.filter(item => item.id !== id)
    dispatch({
      type: MOVIE_FAVOURITE,
      payload: newFavourite,
    });
  } catch (err) {
    console.log(err)
  }
};


