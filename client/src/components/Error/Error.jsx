import React from "react";
import { useSelector } from "react-redux";
import image from "../../img/gameover.gif";
import "../Error/error.css";

export default function Error() {
  const response = useSelector((state) => state.error);

  return (
    <div className="errorDiv">
      <p>{response}</p>
      <img src={image} alt="LoadingImg" />
    </div>
  );
}
