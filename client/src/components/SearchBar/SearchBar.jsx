import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../../redux/actions";
import "../Games/games.css";
import "../../img/lupa.png";

export default function SearchBar({ handlePage }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    setSearch(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getVideogamesByName(search));
    handlePage(1);
    setSearch("");
  }

  return (
    <div className="search">
      <div className="searchIcon"></div>
      <form className="formSearchBar">
        <input
          className="input"
          type="search"
          placeholder="Search games by name"
          autoComplete="off"
          value={search}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={handleSubmit}
          value="Search"
          className="searchButton"
        >
          Search
        </button>
      </form>
    </div>
  );
}
