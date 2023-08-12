import {  LOADING ,GET_GAMES_API, GET_GAMES_DB, CLEAN_STATE, SEARCH_NAME, GENRES_SORT, AZ_SORT, GET_GENRES, POST_GAME, GET_ID, ID_CLEAN, SET_PAGE, CLEAN_DETAIL } from "./actions";

const initialState = {
    game: [],
    allGames: [],
    trueGames: [],
    gameId: {},
    api: [],
    db: [],
    genres: [],
    loading: true,
    currentPage: 1,
};

const reducer = (state = initialState, {type, payload}) => {
    
    switch (type) {
        case LOADING : return {...state, loading: payload};

        case SET_PAGE : return {...state, currentPage: payload};

        case GET_GAMES_DB : return {...state, db: payload};

        case GET_GAMES_API : return {...state,
            allGames: [...state.db, ...payload], 
            game: [...state.db, ...payload],
            trueGames: [...state.db, ...payload],
            api: payload};

        case GET_ID : return {...state, gameId: payload};

        case ID_CLEAN : return {...state, gameId: {}};

        case CLEAN_STATE : return {...state, 
            game: [],
            genres: []
        };

        case CLEAN_DETAIL : return {...state, gameId: {}};

        case SEARCH_NAME : return {...state, 
            game: payload,
            allGames: payload,
        };

        case GET_GENRES : return {...state,
            genres: payload,
        };

        case POST_GAME : return {...state,
            db: [...state.db, payload],
        };

        //! ordenamientos

        case GENRES_SORT :
            const filterGenres = state.allGames.filter(element => element.genres.find(gm => gm.name.includes (payload)));

            if(payload === "DB"){
                return {
                    ...state,
                    currentPage: 1,
                    games: state.db,
                    allGames: state.db,};
                }
                
                if(payload === "API"){
                    return {
                        ...state,
                        games: state.api,
                        allGames: state.api,};
                    }

                    return {...state,
                    games: payload === "All" ? [state.trueGames] : filterGenres,
                    };


        case AZ_SORT : //? Creamos una copia de games en cada caso (ya que sort ordena el array y no crea un nuevo array )

                const sortedAZ = [...state.games].sort((a, b) => a.name.localeCompare(b.name)); // Utilizamos localeCompare para realizar la comparación según la region actual.
                const sortedZA = [...state.games].sort((a, b) => b.name.localeCompare(a.name));
                const sortedRatingMayor = [...state.games].sort((a, b) => b.rating - a.rating);
                const sortedRatingMenor = [...state.games].sort((a, b) => a.rating - b.rating);

                if(payload === "AZ"){
                    return {
                        ...state,
                        currentPage: 1,
                        games: sortedAZ,
                    };
                };
                if(payload === "ZA"){
                    return {
                        ...state,                        
                        games: sortedZA,
                    };
                };
                if(payload === "mayor"){
                    return{
                        ...state,
                        games: sortedRatingMayor,
                    };
                };
                if(payload === "menor"){
                    return{
                        ...state,
                        games: sortedRatingMenor,
                    };
                };
                return {...state,}
            

        default : return {...state}
    };
}

export default reducer;