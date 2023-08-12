const { Router } = require('express');
const getGenres = require('../controllers/getGenres');

const genresRouter = Router();

genresRouter.get('/genres', getGenres);

module.exports = genresRouter;   
