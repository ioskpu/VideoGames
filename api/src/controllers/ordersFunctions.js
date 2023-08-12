
// función para ordenar las props de VideoGames (cuando vienen en el array results).

const mapDataResults = (data)=>{
    const dataOrdenada = data.results.map ((game)=> {
        let{ id,name,description,platforms,background_image,short_screenshots,released,rating,metacritic,genres } = game;   
        // busco solo las platforms y screen que quiero 
        platforms = platforms.map(el => el.platform.name);
        short_screenshots = short_screenshots.map(el=>el.image);
        genres = genres.map (el=>{
            let {id,name}= el
            return({id,name})
        }); 
        return { id,name,description,platforms,background_image,short_screenshots,released,rating,metacritic,genres };
    });
    return dataOrdenada;
};


// función para ordenar las props de VideoGames (cuando viene en forma de objeto)
const destrucData = (data)=>{

    let {id,name,description,platforms,background_image,released,rating,metacritic,genres} = data;
    const newData = {id,name,description,platforms,background_image,released,rating,metacritic,genres};
    newData.platforms = platforms.map(el => el.platform.name);
   
return newData;
};

// función para ordenar las props de VideoGames (cuando vienen en un array).
const mapDataDb = (data)=>{

    const dataOrdenada = data.map ((game)=> {
        let{ id,name,description,platforms,background_image,released,rating,genres } = game;   
        genres = genres.map (el=>{
            let {id,name}= el
            return({id,name})
        }); 
        return { id,name,description,platforms,background_image,released,rating,genres };
    });
    return dataOrdenada;
};




module.exports = {
    mapDataResults,
    destrucData,
    mapDataDb
};