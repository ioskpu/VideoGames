const { Router } = require('express');
const getGenres = require('../controllers/getGenres');

const genreRouter = Router();

genresRouter.get('/genres', getGenres);

module.exports = Router;   
