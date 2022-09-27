import axios from "axios";
import {
  CREATE_GAME,
  FILTER_BY,
  GET_ALL_GENRES,
  GET_ALL_PLATFORMS,
  GET_ALL_VIDEOGAMES,
  GET_GAMES_BY_NAME,
  GET_GAME_BY_ID,
  LOADING,
  ERROR,
  RESET_FILTERS,
  SORT_GAMES,
} from "./common/constants";

export function getAllVideogames() {
  return async function (dispatch) {
    dispatch({ type: LOADING });
    try {
      const response = await axios.get(`http://localhost:3001/videogames`);
      return dispatch({
        type: GET_ALL_VIDEOGAMES,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
}

export function getAllGenres() {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/genres`);
    return dispatch({
      type: GET_ALL_GENRES,
      payload: response.data,
    });
  };
}

export function getGameById(value) {
  const id = value.match.params.id;
  return async function (dispatch) {
    dispatch({ type: LOADING });
    try {
      const response = await axios.get(
        `http://localhost:3001/videogames/${id}`
      );
      return dispatch({
        type: GET_GAME_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
}

export function getVideogamesByName(value) {
  return async function (dispatch) {
    dispatch({ type: LOADING });
    try {
      const response = await axios.get(`http://localhost:3001/videogames`, {
        params: { search: value },
      });
      return dispatch({
        type: GET_GAMES_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
}

export function getAllPlatforms() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/platforms`);
      return dispatch({
        type: GET_ALL_PLATFORMS,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
}

export function filterBy(values) {
  return function (dispatch) {
    return dispatch({
      type: FILTER_BY,
      payload: values,
    });
  };
}

export function sortGames(values) {
  return function (dispatch) {
    return dispatch({
      type: SORT_GAMES,
      payload: values,
    });
  };
}

export function createGame(values) {
  return async function (dispatch) {
    dispatch({ type: LOADING });
    try {
      const response = await axios.post(`http://localhost:3001/videogames`, {
        name: values.name[0].toUpperCase() + values.name.slice(1).toLowerCase(),
        description: values.description,
        released: values.released,
        rating: values.rating,
        image: values.image,
        platforms: values.platforms,
        genres: values.genres,
      });
      return dispatch({
        type: CREATE_GAME,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
}

export function resetFilters(payload) {
  return function (dispatch) {
    return dispatch({
      type: RESET_FILTERS,
      payload,
    });
  };
}
