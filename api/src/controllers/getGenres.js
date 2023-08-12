require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const URL = `https://api.rawg.io/api/genres?key=${API_KEY}`;
const { GetGenres } = require('../db');

const GetGenres = async () => {
    try {
        let genres = await Genres.findAll({attributes: ['id', 'name']}); //se incluye los atributos que quiero ver
        
        if(genres.length === 0) { //cargamos la tabla con la API
            const {data} = await axios.get(URL);
            const genMap = data.results.map(genre => {let {name} = genre; return ({name})});
            genres = genMap;

            await Genres.bulkCreate(genres); //esto nos permite crear multiples registros en la base de datos
        }

        return res.json(genres);
    } catch (error) {
        return new Error({error: error.message});
    }
}

module.exports = GetGenres;