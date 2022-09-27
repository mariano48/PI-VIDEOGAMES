const axios = require("axios");
const { Videogame, Genre } = require("../../db");
const { API_KEY } = process.env;
const api = "https://api.rawg.io/api";

async function getGenres(req, res) {
  try {
    const genresFromDb = await Genre.findAll();
    if (genresFromDb.length) {
      res.status(200).json(genresFromDb);
    } else {
      const json = await axios.get(`${api}/genres`, {
        params: { key: API_KEY },
      });
      const genresFromApi = json.data.results.map((g) => {
        return {
          name: g.name,
        };
      });
      const dbGenres = await Genre.bulkCreate(genresFromApi);
      res.status(200).json(dbGenres);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = { getGenres };
