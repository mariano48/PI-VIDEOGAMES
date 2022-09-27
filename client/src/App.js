import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Games from "./components/Games/Games";
import GameDetail from "./components/GameDetail/GameDetail";
import CreateGame from "./components/CreateGame/CreateGame";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Landing} />
      <Route exact path="/games" component={Games} />
      <Route exact path="/create" component={CreateGame} />
      <Route exact path="/games/:id" component={GameDetail} />
    </BrowserRouter>
  );
}

export default App;
