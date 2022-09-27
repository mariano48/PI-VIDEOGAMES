import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGameById } from "../../redux/actions";
import Loading from "../Loading/Loading";
import NavBar from "../NavBar/NavBar";
import "./gameDetail.css";

export default function GameDetail(id) {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.gameDetail);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(getGameById(id));
  }, [dispatch, id]);

  return (
    <div>
      <NavBar />
      {loading ? (
        <Loading />
      ) : (
        <div className="gameDetail">
          <h1>{game.name}</h1>
          <img src={game.image} alt="NOTFOUND" />
          <div className="gameInfo">
            <p>Released in: {game.released}</p>
            <p>Rating: {game.rating} / 5⭐</p>
          </div>
          <div className="description">
            <h2>Description: </h2>
            <p>{game.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
