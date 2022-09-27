import React from "react";
import "./gameCard.css";

export default function GameCard({ name, image, genres, rating }) {
  return (
    <div className="Card">
      <img src={image} alt="InvalidIMG" className="imgCard" />
      <div className="cardInfo">
        <div className="infoTop">
          <p className="title">{name}</p>
          <p>{`⭐${rating}/5`}</p>
        </div>
        <p className="genres">
          {genres.map((g, i) => (i === genres.length - 1 ? g : g + ", "))}
        </p>
      </div>
    </div>
  );
}
