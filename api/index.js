const server = require("./src/app.js");
const { conn } = require("./src/db.js");
require("dotenv").config();
// const axios = require("axios");
const { loadGenres } = require("./src/controllers/genres.controllers");
const { loadPlatforms } = require("./src/controllers/platforms.controllers");

// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
  await loadGenres(true);
  await loadPlatforms(true);
  server.listen(process.env.PORT, () => {
    console.log(`API server listening at ${process.env.PORT}`); // eslint-disable-line no-console
  });
});