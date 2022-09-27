import {
  GET_ALL_VIDEOGAMES,
  GET_ALL_GENRES,
  GET_GAME_BY_ID,
  GET_GAMES_BY_NAME,
  GET_ALL_PLATFORMS,
  FILTER_BY,
  SORT_GAMES,
  CREATE_GAME,
  RESET_FILTERS,
  LOADING,
  ERROR,
} from "./common/constants";
import { filter, sort } from "./common/utils";

const initialState = {
  games: [],
  gamesFiltered: [],
  genres: [],
  gameDetail: [],
  platforms: [],
  loading: true,
  error: null,
  response: null,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        games: action.payload,
        gamesFiltered: sort(action.payload, "AZ"),
        gameDetail: [],
        error: null,
        loading: false,
        response: null,
      };

    case GET_ALL_GENRES:
      return {
        ...state,
        genres: action.payload,
        error: null,
      };

    case GET_GAME_BY_ID:
      return {
        ...state,
        gameDetail: action.payload,
        loading: false,
        error: null,
      };

    case GET_GAMES_BY_NAME:
      return {
        ...state,
        gamesFiltered: action.payload,
        loading: false,
        error: null,
      };

    case GET_ALL_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
        loading: false,
        error: null,
      };

    case FILTER_BY:
      const gamesToFilter = state.games;
      const gamesFiltered = filter(gamesToFilter, action.payload);
      if (!gamesFiltered.length) {
        return {
          ...state,
          gamesFiltered: gamesFiltered,
          error: "No results match the filters",
        };
      } else {
        return {
          ...state,
          gamesFiltered: gamesFiltered,
        };
      }

    case SORT_GAMES:
      const gamesToSort = state.gamesFiltered;
      return {
        ...state,
        gamesFiltered: sort(gamesToSort, action.payload),
      };

    case RESET_FILTERS:
      const filtersReseted = state.games;
      return {
        ...state,
        gamesFiltered: sort(filtersReseted, "AZ"),
        error: null,
      };

    case CREATE_GAME:
      return {
        ...state,
        response: action.payload,
        loading: false,
        error: null,
      };

    case LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
