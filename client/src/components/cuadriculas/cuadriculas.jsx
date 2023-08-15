import style from './cuadriculas.module.css'
import Card from "../cards/cards";
import Filter from './filters.jsx';
import { useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import { getGames, getGamesDb, setLoading, setPage } from "../../Redux/actions";

const Cuadriculas = (props) => {
  
    // Dispatch + GlobalState
    const dispatch = useDispatch();
    const games = useSelector(state => state.games);
    const loading = useSelector(state => state.loading);
    const currentPage = useSelector(state => state.currentPage);
    
    
    // Manejo de páginas
    const maxGamesPag = 15;
    const startIndex = (currentPage - 1) * maxGamesPag;  // calculo el indice inicial a cortar (slice)
    const endIndex = startIndex + maxGamesPag; // calculo el indice final del slice
    const grupoSlice = games?.slice(startIndex,endIndex); // aguardo la respuesta y luego hago el slice 
    const hasNextPage = endIndex < games.length; // booleano 
    // Calculo el número de paginas y creo un array con el método from de la cantidad de ellas 
    const totalPages = Math.ceil(games?.length / maxGamesPag); 
    const pageRange = Array.from({ length: totalPages }, (_, index) => index + 1); // Mapeo cada index y le sumo 1 para no empezar en 0 (el segundo parámetro es una función de mapeo opcional que se puede utilizar para transformar cada elemento del objeto pasado, antes de agregarlo al array resultante)
  
    // Handler de los button siguiente y anterior 
    const handlePage = (pag)=>{
        dispatch(setPage(pag))
    }

    // Life cicle 
    useEffect (()=>{
        games.length ? dispatch (setLoading(false)) : dispatch(setLoading(true))
        games.length === 0 && dispatch(getGames()).then(()=> dispatch(setLoading(false)));// Uso una promesa para sacar la pantalla de carga
        dispatch(getGamesDb());    
    },[dispatch]);


    //? RENDER
    return(
        
        <div className={style.container}>
        
            {loading 
            ? (<h1 className={style.loading}>Loading...</h1>) 
            : (<div className={style.container}>

            <Filter className={style.filter}/>

            <p className={style.count}>- {currentPage} -</p> 

            <div className={style.botones}>
                
                <button onClick={() => handlePage(currentPage - 1)} name="anterior" className={style.btn} disabled={currentPage === 1}>
                <span className={style.btn__content}>Back</span>
                <span className={style.btn__glitch}></span>
                <span className={style.btn__label}>b0X</span>
                </button>
                

                {pageRange.map((page) => (  // Mapeo el array de paginas en botones ,les creo una key y modifico el estado currentPage para mostrar esa parte del slice
                    <button key={page} onClick={() => dispatch(setPage(page))} className={style.btnPage}>
                     {page} 
                    </button>
                    ))
                }

                <button onClick={() => handlePage(currentPage + 1)} name="siguiente" className={style.btn} disabled={!hasNextPage}>
                <span className={style.btn__content}>Next</span>
                <span className={style.btn__glitch}></span>
                <span className={style.btn__label}>n0X</span>
                </button>
              
            </div>
            
            {/* Carta */}
            <div className={style.grid}>
            { grupoSlice.map(el=>{
                return(
                    <Card
                    key = {el.id}
                    id = {el.id}
                    name = {el.name}
                    background_image={el.background_image}
                    rating={el.rating}
                    genres={el.genres}
                    platforms={el.platforms}
                    short_screenshots={el.short_screenshots}
                    />   
                    )
                    })}
            </div>
                </div>)}

            {/* Botones */}

            
        </div>

    )
};

export default Cuadriculas;