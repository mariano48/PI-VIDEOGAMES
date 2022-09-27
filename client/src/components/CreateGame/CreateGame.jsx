import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createGame, getAllGenres, getAllPlatforms } from "../../redux/actions";
import { validateForm } from "../common/utils";
import GameCard from "../GameCard/GameCard";
import NavBar from "../NavBar/NavBar";
import "./createGame.css";
import CustomDatalist from "./CustomDatalist";
import SelectedList from "./SelectedList";

export default function CreateGame() {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const response = useSelector((state) => state.response);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const genresNames = genres.map((g) => g.name);
  const [errors, setErrors] = useState({});
  const [game, setGame] = useState({
    name: "",
    description: "",
    released: "",
    rating: 0,
    image: "",
    platforms: [],
    genres: [],
  });

  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(getAllPlatforms());
  }, [dispatch]);

  useEffect(() => {
    setErrors(validateForm(game));
  }, [game]);

  function handleChange(e) {
    const value = { ...game, [e.target.name]: e.target.value };
    setGame(value);
  }

  function handleList(v, name) {
    const value = { ...game, [name]: [...game[name], v] };
    setGame(value);
  }
  function deleteFromList(v, name) {
    const newList = game[name].filter((e) => e !== v);
    const value = { ...game, [name]: newList };
    setGame(value);
  }

  function submitCreation(e) {
    e.preventDefault();
    dispatch(createGame(game));
  }
  return (
    <div className="createGame">
      <NavBar />
      <form className="form">
        <div className="gameInputs">
          <div className="firstFive">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              autoComplete="off"
              onChange={handleChange}
              className="inputRegular"
            />
            {errors.name ? <p>{errors.name}</p> : null}
          </div>
          <div className="firstFive">
            <label>Description:</label>
            <input
              type="text"
              name="description"
              autoComplete="off"
              onChange={handleChange}
              className="inputRegular"
            />
            {errors.description ? <p>{errors.description}</p> : null}
          </div>
          <div className="firstFive">
            <label>Date of release:</label>
            <input
              type="date"
              name="released"
              autoComplete="off"
              onChange={handleChange}
              className="inputRegular"
            />
            {errors.released ? <p>{errors.released}</p> : null}
          </div>
          <div className="firstFive">
            <label>Rating:</label>
            <input
              type="number"
              name="rating"
              onChange={handleChange}
              className="inputRegular"
            />
            {errors.rating ? <p>{errors.rating}</p> : null}
          </div>
          <div className="firstFive">
            <label>Image:</label>
            <input
              type="text"
              name="image"
              autoComplete="off"
              onChange={handleChange}
              className="inputRegular"
            />
            {errors.image ? <p>{errors.image}</p> : null}
          </div>
          <div className="selectList">
            <label>Select genres for this game:</label>
            <CustomDatalist
              name="genres"
              list={genresNames}
              selectedList={game.genres}
              onSelect={(v) => {
                handleList(v, "genres");
              }}
            />
            {game.genres ? (
              <SelectedList
                name="genres"
                selected={game.genres}
                onDelete={(v) => {
                  deleteFromList(v, "genres");
                }}
              />
            ) : null}
            {errors.genres ? <p>{errors.genres}</p> : null}
          </div>
          <div className="selectList">
            Select platforms for this game:
            <CustomDatalist
              name="platforms"
              list={platforms}
              selectedList={game.platforms}
              onSelect={(v) => {
                handleList(v, "platforms");
              }}
            />
            {game.platforms ? (
              <SelectedList
                selected={game.platforms}
                onDelete={(v) => deleteFromList(v, "platforms")}
              />
            ) : null}
            {errors.platforms ? <p>{errors.platforms}</p> : null}
          </div>
          {response ? <p>{response}</p> : null}
          {error ? <p>{error}</p> : null}
        </div>
        <div className="formInfo">
          <p>Game card Preview:</p>
          <GameCard
            name={game.name !== "" ? game.name : "<Name>"}
            image={game.image !== "" ? game.image : "<Image>"}
            genres={game.genres.length ? game.genres : ["<Genres>"]}
            rating={game.rating !== 0 ? game.rating : "??"}
          />
          <p>Aditional Info:</p>
          <p>Released date: {game.released}</p>
          <p>Description: {game.description}</p>
          <p>
            Platforms:{" "}
            {game.platforms.map((p, i) =>
              i === game.platforms.length + 1 ? p : `${p}, `
            )}
          </p>
        </div>
      </form>
      <div className="submitDiv">
        <button
          type="submit"
          onClick={(e) => submitCreation(e)}
          value="Create"
          disabled={Object.keys(errors).length ? true : false}
          className="submitButton"
        >
          Create
        </button>
        {loading ? (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : null}
      </div>
      {response ? <p className="successP">{response}</p> : null}
      {error ? <p className="errorP">{error}</p> : null}
    </div>
  );
}
