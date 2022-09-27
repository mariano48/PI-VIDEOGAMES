const { Router } = require("express");
const { getGenres } = require("./controllers/genres");
const { getPlatforms } = require("./controllers/platforms");
const {
  getVideogames,
  getVideogameById,
  createVideogame,
} = require("./controllers/videogames");

const router = Router();

router.get("/videogames", getVideogames);

router.get("/genres", getGenres);

router.get("/platforms", getPlatforms);

router.get("/videogames/:id", getVideogameById);

router.post("/videogames", createVideogame);

module.exports = router;
