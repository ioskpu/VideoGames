import style from "./detail.module.css"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getId, cleanDetail} from "../../Redux/actions";

const Detail = () => {
    
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getId(id));

        return () => {
            dispatch(cleanDetail());
          };
    }, [dispatch, id]);

    const gameID = useSelector((state) => state.gameID);
    const hasProperties = Object.keys(gameID).length > 0; // verificamos si tengo juego ya en detail para renderizar el loading

    const renderDescription = () => {
        return { __html: gameID.description };
    };

    return (
        !hasProperties 
        ? <h1 className={style.loading}>Loading...</h1> 
        : <div key={id} className={style.container}>

            <h1>{gameID.name}</h1>

            <div className={style.genres}>
                {gameID?.genres && gameID.genres.map(el =><p key={el.id}>- {el.name}</p>)}
            </div>

            <img src={gameID.background_image} alt={gameID.name} className={style.image} />

            <div className={style.platforms}>
                {
                Array.isArray(gameID?.platforms) 
                ? gameID.platforms.map(el => <p key={el}>- {el}</p>)
                : <p>{gameID.platforms}</p>
                }
            </div>

            <div className={style.description} dangerouslySetInnerHTML={renderDescription()} />

            <div className={gameID.platforms}></div>

            <h4>Rating: &#9733; {gameID.rating}</h4>
            <h4>Metacritic: 🎖️ {gameID.metacritic}</h4>

            <h5>- Release Date: {gameID.released} -</h5>
            
        </div>
    );
};

export default Detail;