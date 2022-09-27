import React from "react";
import { Link } from "react-router-dom";
import GameCard from "../GameCard/GameCard";
import "./gamesCards.css";
export default function GameCards({ games }) {
  return (
    <div className="cardGrid">
      {games.map((g) => {
        return (
          <div key={g.id}>
            <Link to={`/games/${g.id}`} className="linkCard">
              <GameCard
                key={g.id}
                name={g.name}
                image={g.image}
                genres={g.genres}
                rating={g.rating}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
