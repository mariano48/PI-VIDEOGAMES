export function filter(games, values) {
  let filtered = [];

  if (values.genre === "All" && values.created === "All") {
    filtered = games;
  } else if (values.genre !== "All" && values.created === "All") {
    filtered = games.filter((g) => g.genres.includes(values.genre));
  } else if (values.genre === "All" && values.created !== "All") {
    if (values.created === "db") {
      filtered = games.filter((g) => g.created === true);
    } else {
      filtered = games.filter((g) => g.created === false);
    }
  } else if (values.genre !== "All" && values.created !== "All") {
    if (values.created === "db") {
      filtered = games.filter((g) => {
        return g.created === true && g.genres.includes(values.genre);
      });
    } else {
      filtered = games.filter((g) => {
        return g.created === false && g.genres.includes(values.genre);
      });
    }
  }
  return filtered;
}

export function sort(list, values) {
  let games = [...list];
  let sorted = [];
  if (values === "AZ") {
    sorted = games.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else return 0;
    });
  } else if (values === "ZA") {
    sorted = games.sort((a, b) => {
      if (a.name < b.name) {
        return 1;
      } else if (a.name > b.name) {
        return -1;
      } else return 0;
    });
  } else if (values === "rASC") {
    sorted = games.sort((a, b) => {
      if (a.rating > b.rating) {
        return 1;
      } else if (a.rating < b.rating) {
        return -1;
      } else return 0;
    });
  } else if (values === "rDESC") {
    sorted = games.sort((a, b) => {
      if (a.rating < b.rating) {
        return 1;
      } else if (a.rating > b.rating) {
        return -1;
      } else return 0;
    });
  }
  return sorted;
}
