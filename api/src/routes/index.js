const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const gamesRouter = require('./videogamesRouter');
const genresRouter = require('./genresRouter');

const router = Router();

router.use("/videogames", genresRouter);
router.use("/videogames", gamesRouter);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
