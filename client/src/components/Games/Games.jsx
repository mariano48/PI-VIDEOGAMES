import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres, getAllVideogames } from "../../redux/actions";
import Error from "../Error/Error";
import GameCards from "../GameCards/GameCards";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";
import "./games.css";

export default function Games() {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.gamesFiltered);
  const genres = useSelector((state) => state.genres);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const currentList = useMemo(() => {
    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = indexOfFirstItem + itemsPerPage;
    return games.slice(indexOfFirstItem, indexOfLastItem);
  }, [games, currentPage, itemsPerPage]);

  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(getAllVideogames());
  }, [dispatch]);

  function handlePage(n) {
    setCurrentPage(n);
  }

  return (
    <div>
      <NavBar />
      <div className="navigationContainer">
        <SearchBar handlePage={handlePage} />
        <Filters genres={genres} handlePage={handlePage} />
        <Pagination
          games={games}
          itemsPerPage={itemsPerPage}
          handlePage={handlePage}
          currentPage={currentPage}
        />
      </div>
      {error ? (
        <Error error={error} />
      ) : loading ? (
        <Loading />
      ) : (
        <div>
          <div className="home">
            <GameCards games={currentList} />
          </div>
        </div>
      )}
    </div>
  );
}
