const { Videogame, Genres } = require ('../db');

const postGames = async (req, res) => {
    try {
        const {name,description,platforms,background_image,released,genres,rating,metacritic,short_screenshots} = req.body

        if(name) {
            const [createGame, created] = await Videogame.findOrCreate({
                where: { name },
                default: {                    
                    description,
                    platforms,
                    background_image,
                    released,                    
                    rating,
                    metacritic,
                    short_screenshots
                }
            });
            if(created){
                const genresDb = await Genres.findAll({ // buscamos los generos cuyos ID se proporcionan en la base de datos
                    where: {
                        id: genres,
                    },
                    attributes: ['id', 'name'], //pedimos los atributos que queremos mostrar
                });
                const genresIds = genresDb.map(genres => genres.id); //recorremos el array y lo guardamos en un array solo con lo id
                await createGame.addGenres(genresIds); //asociamos los generos al juego creado arriba pasandole los ids de los genres

                const response = {
                    id: createGame.id,
                    name: createGame.name,
                    description: createGame.description,
                    platforms: createGame.platforms,
                    background_image: createGame.background_image,
                    released: createGame.released,
                    rating: createGame.rating,
                    genres: createGame.genres, //agregamos los generos al objeto de la repuesta a mostrar
                }
                return res.json(response); //mostramos la respuesta con la estructura con sus generos
            }else{
                return res.status(404).json({error: "El juego no existe en la Base de Datos"});
            }
        }
        return res.status(400).send('El nombre del juego es requerido');
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = postGames;