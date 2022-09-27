import { Link } from "react-router-dom";
import "./landing.css";

export default function Landing() {
  return (
    <div className="landing">
      <p>Videogames App</p>
      <Link to="/games">Start!</Link>
    </div>
  );
}
