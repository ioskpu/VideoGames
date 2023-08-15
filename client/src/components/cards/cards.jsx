import style from './cards.module.css';
import { useNavigate } from 'react-router-dom';

const Card = ({id, name, background_image, rating, genres, platforms, short_screenshots}) => {

    const navigate = useNavigate();

    const handleNav = () => {
        navigate(`/detail/${id}`)
    };
    return (
        <div className={style.wrapper}>
            <div className={style.container} onClick={handleNav}>
                <div className={style.imagenDiv}>
                    <img src={background_image} alt={name} />
                </div>

                <div className={style.text}>
                <div className={style.titulo}>
                    <h1>{name}</h1>
                    <p>&#9733;{rating}</p>
                    <p>{genres.map(el=> " - " + el.name)}</p>
                </div>
                <div className={style.linea}></div>
                {
                    Array.isArray(platforms)
                    ? <p className={style.platforms}>{platforms.map(el=> " - " + el.platform.name)}</p>
                    : <p className={style.platforms}>{platforms}</p>
                }
                </div>
            </div>
        </div>
    )
};

export default Card;