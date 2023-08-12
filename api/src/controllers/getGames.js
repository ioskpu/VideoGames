require('dotenv').config();
const {API_KEY} = process.env
const axios = require("axios");
const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
const { Videogame, Genres } = require('../db.js');
const { Op } = require('sequelize');
const {mapDataResults, destrucData, mapDataDb} = require ('./ordesFunctions.js'); // importo los ordenamientos personalizados

//¡¡ obtenemos los juegos de la API

const getGames = async (req, res) => {
    try {
        const arrayGames = []      

        for(let i = 1; i <= 5; i++) {
            //como tiene paginados de 20 juegos c/pag , busco los primeros 100 juegos en las 5 primeras pag
            const {data} = await axios.get(URL + `&page=${i}`);
            const dataOrdenada = mapDataResults(data);
            arrayGames.push(...dataOrdenada);
        }

        return res.json(arrayGames);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

// Obtener juegos DB

const getDbGames = async (req, res) => {
    try {
        const game = await Videogame.findAll({
            where: {db: true}, include: {
                model: Genres //incluimos la tabla genres
            }
        })
        const arrayGames = [...game];
        const arrayOrdenado = mapDataDb(arrayGames);

        if(arrayGames) return res.json(arrayOrdenado);
    } catch (error) {
        return res.status(500).json({error: error.message});       
    }
};    

// Obtener Un Juego por ID en DB o API

const getGameById = async (req, res) => {
    try {
        const {id} = req.params;

        if(isNaN(id)){
            const game = await Videogame.findByPk(id, {include: Genres});
            if(game) return res.json(game);
            return res.status(404).json({error: "El juego no existe en la Base de Datos"});
        }

        const { data } = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        const dataId = destrucData(data);

        return res.json(dataId);

    } catch (error) {
        return res.status(500).json({error: error.message});        
    }
};

// Obtener Un Juego por Query ?

const getGameByQuery = async (req, res) => {
    try {
        const {name} = req.query;

        if(!name){
            return res.status(400).json({error: "El nombre es requerido en la consulta"});
        }
        //buscamos en la db
        const dbName = await axios (`${URL}&search=${name}`);
        const dataQuery = mapDataDb(data);
        //concatenamos el array de la API con el array de la DB
        const games = dbName.concat(dataQuery).slice(0, 15);

        games.length
        ? res.json(games)
        : res.status(404).json({error: "No se encontraron Resultados"});
    } catch (error) {
        return res.status(500).json({error: error.message});        
    }
}

module.exports = {
    getGames,
    getGameById,
    getGameByQuery,
    getDbGames
}