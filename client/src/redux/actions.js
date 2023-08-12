import axios from "axios";

export const LOADING = "LOADING"
export const GET_GAMES_API = 'GET_GAMES_API';
export const GET_GAMES_DB = 'GET_GAMES_DB';
export const GET_ID = "GET_ID"
export const CLEAN_STATE = "CLEAN_STATE";
export const SEARCH_NAME = 'SEARCH_NAME';
export const GENRES_SORT = 'GENRES_SORT';
export const AZ_SORT = 'AZ_SORT';
export const GET_GENRES = "GET_GENRES";
export const POST_GAME = "POST_GAME";
export const ID_CLEAN = "ID_CLEAN";
export const SET_PAGE = "SET_PAGE";
export const CLEAN_DETAIL = "CLEAN_DETAIL";


export const setLoading = (value)=> {
    return {
        type: LOADING,
        payload : value
    }
};

export const getGames = () => {

    return async (dispatch)=>{
        try {
            const {data} = await axios ('/videogames');

            return(dispatch({
                type : GET_GAMES_API,
                payload : data
                }));
        } catch (error) {
            console.log(error.message)
        }
    }
};

export const getGamesDb = () =>{
    return async (dispatch) =>{
        try {
            const {data} = await axios (`/videogames/db`)
            
            return(dispatch({
                type : GET_GAMES_DB,
                payload : data
            }));
        } catch (error) {
            console.log(error.message)
        }
    }
};

export const getId = (id) =>{
    return async (dispatch) =>{
        try {
            const {data} = await axios (`/videogames/${id}`)
            if(!data){
                console.log('no hay data');  
            }
            return (dispatch({
                type: GET_ID,
                payload: data
            }));
        } catch (error) {
            console.log(error.message)
        }
    }
};

export const cleanID = () => {
    return{
        type : ID_CLEAN
    }
};

export const cleanState = () => {
    return{
        type : CLEAN_STATE
    }
};

export const searchByName = (value)=>{

    return async (dispatch)=>{
        try {
            const {data} = await axios (`/videogames/name?name=${value}`);

            return(dispatch({
                type : SEARCH_NAME,
                payload : data
            }));
        } catch (error) {
            console.log(error.message); 
        }
    }
};

export const genresSort = (genres) => {

    return {
        type : GENRES_SORT,
        payload : genres
    }
};

export const aZSort = (value) => {

    return {
        type : AZ_SORT,
        payload : value
    }
};

export const getGenres = () => {
    return async (dispatch) =>{
        const {data} = await axios ("/videogames/genres");

        return (dispatch({
            type: GET_GENRES,
            payload: data

        }));
    }
};

export const postGame = (form) => {
    return async (dispatch) =>{
        try {
            const {data} = await axios.post('/videogames',form);
    
            return (dispatch({
                type : POST_GAME,
                payload : data
            }));      
        } catch (error) {
            console.log(error.message); 
        }
    }
};

export const setPage = (value) => {
    return{
        type: SET_PAGE,
        payload: value
    }
};

export const cleanDetail = () => {
    return{
        type: CLEAN_DETAIL
    }
}