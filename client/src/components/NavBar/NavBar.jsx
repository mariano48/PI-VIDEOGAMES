import { Link, useLocation } from "react-router-dom";
import "./navBar.css";

export default function NavBar() {
  const location = useLocation();

  return (
    <div className="nav">
      <Link
        to="/games"
        className={location.pathname === "/games" ? "linkUl" : "link"}
      >
        Home
      </Link>
      <Link
        to="/create"
        className={location.pathname === "/create" ? "linkUl" : "link"}
      >
        Create game
      </Link>
    </div>
  );
}
