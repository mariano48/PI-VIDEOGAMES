import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  filterBy,
  sortGames,
  resetFilters,
  releasedYear,
} from "../../redux/actions";
import CustomSelect from "../CustomSelect/CustomSelect.jsx";

export default function Filters({ genres, handlePage }) {
  const dispatch = useDispatch();
  const [filterValues, setFilterValues] = useState({
    genre: "All",
    created: "All",
  });

  const [sortValues, setSortValues] = useState("AZ");

  function handleSelectFilter(e) {
    const values = { ...filterValues, [e.target.name]: e.target.value };
    setFilterValues(values);
    dispatch(filterBy(values));
    dispatch(sortGames(sortValues));
    handlePage(1);
  }

  function handleSelectSort(e) {
    const value = e.target.value;
    setSortValues(value);
    dispatch(sortGames(value));
    handlePage(1);
  }

  function handleResetFilters() {
    dispatch(resetFilters());
    setFilterValues({ genre: "All", created: "All" });
    setSortValues("AZ");
  }

  return (
    <div className="filters">
      <div>
        <div className="genresFilters">
          <CustomSelect
            name="genre"
            onSelect={handleSelectFilter}
            value={filterValues.genre}
            label="Filter games by genre:"
          >
            <option value="All" key="all">
              All
            </option>
            {genres.length
              ? genres.map((g) => (
                  <option key={g.id} value={g.name}>
                    {g.name}
                  </option>
                ))
              : null}
          </CustomSelect>
          <CustomSelect
            name="created"
            onSelect={handleSelectFilter}
            value={filterValues.created}
            label={"Filter by source(api/db):"}
          >
            <option value="All">All</option>
            <option value="api">Api results</option>
            <option value="db">Db results</option>
          </CustomSelect>
        </div>
      </div>
      <div className="sortAndReset">
        <CustomSelect
          name={"order"}
          onSelect={handleSelectSort}
          value={sortValues}
          label={"Sort results by:"}
        >
          <option value="AZ">A-Z</option>
          <option value="ZA">Z-A</option>
          <option value="rDESC">Best rated</option>
          <option value="rASC">Worst rated</option>
        </CustomSelect>
        <button onClick={handleResetFilters} className="buttonReset">
          Reset Filters
        </button>
      </div>
    </div>
  );
}
