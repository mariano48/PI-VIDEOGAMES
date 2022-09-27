const axios = require("axios");
const { Videogame, Genre } = require("../../db");
const { API_KEY } = process.env;
const api = "https://api.rawg.io/api";

async function getVideogames(req, res) {
  const { search } = req.query;
  try {
    const dbVideogames = await getDbVideogames(search);
    const apiVideogames = await getApiVideogames(search);
    const realDbVideogames = dbVideogames.map((v) => {
      return {
        ...v.get({ plain: true }),
        genres: v.genres.map((g) => {
          g.get({ plain: true });
          return g.dataValues.name;
        }),
      };
    });
    const allVideogames = realDbVideogames.concat(apiVideogames);
    res.status(200).json(allVideogames);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function getDbVideogames(search) {
  if (search) {
    const dbVideogames = await Videogame.findAll({
      where: { name: search },
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      raw: true,
    });
    return dbVideogames;
  } else {
    const dbVideogames = await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return dbVideogames;
  }
}

async function getApiVideogames(search) {
  if (search) {
    const json = await axios.get(`${api}/games`, {
      params: { key: API_KEY, search, page_size: 15 },
    });
    if (json.data.results.length) {
      const videogamesApi = json.data.results.map((v) => {
        return {
          id: v.id,
          name: v.name,
          genres: v.genres.map((g) => g.name),
          image: v.background_image,
          platforms: v.platforms.map((p) => p.platform.name),
          rating: v.rating,
        };
      });
      return videogamesApi;
    } else {
      return "No games matches that search term";
    }
  } else {
    const array = [{}, {}, {}, {}];
    const res = array.map((_, i) => {
      const parameters = { key: API_KEY, page_size: 25, page: i + 1 };
      return axios.get(`${api}/games`, { params: parameters });
    });

    const jsons = await Promise.all(res);
    const results = jsons.flatMap((r) => r.data.results);
    const videogamesApi = results.map((v) => {
      const genres = v.genres.map((g) => g.name);
      return {
        id: v.id,
        name: v.name,
        genres: genres,
        image: v.background_image,
        rating: v.rating,
        released: v.released,
        platforms: v.platforms.map((p) => p.platform.name),
        created: false,
      };
    });
    return videogamesApi;
  }
}

async function getVideogameById(req, res) {
  const { id } = req.params;
  try {
    if (isNaN(id)) {
      const videogame = await Videogame.findByPk(id, {
        include: [
          {
            model: Genre,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      });
      res.status(200).json(videogame);
    } else {
      const json = await axios.get(`${api}/games/${id}`, {
        params: { key: API_KEY },
      });
      const videogame = json.data;
      const response = {
        id: videogame.id,
        name: videogame.name,
        description: videogame.description_raw,
        released: videogame.released,
        rating: videogame.rating,
        image: videogame.background_image,
        platforms: videogame.platforms.map((p) => p.platform.name),
        genres: videogame.genres.map((g) => g.name),
      };
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
}

async function createVideogame(req, res) {
  const { name, description, released, rating, image, platforms, genres } =
    req.body;
  try {
    if (
      !name ||
      !description ||
      !released ||
      !rating ||
      !platforms ||
      !genres
    ) {
      res.status(400).send("Please insert all required fields");
    } else {
      const videogame = await Videogame.create({
        name,
        description,
        released,
        rating: Number(rating),
        image,
        platforms,
        created: true,
      });
      genres.forEach(async (g) => {
        const genre = await Genre.findAll({ where: { name: g } });
        videogame.addGenre(genre);
      });
      res.status(200).send("Game created succesfully");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = {
  getVideogames,
  getVideogameById,
  createVideogame,
};
