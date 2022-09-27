const axios = require("axios");
const { API_KEY } = process.env;
const api = "https://api.rawg.io/api";

async function getPlatforms(req, res) {
  try {
    const json1 = await axios.get(`${api}/platforms`, {
      params: { key: API_KEY },
    });
    const json2 = await axios.get(`${api}/platforms`, {
      params: { key: API_KEY, page: 2 },
    });
    const platformPromises = [...json1.data.results, ...json2.data.results];
    const platforms = platformPromises.map((p) => p.name);
    res.status(200).json(platforms);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = { getPlatforms };
