import style from './filters.module.css'
import {useDispatch} from "react-redux"
import {genresSort, aZSort} from '../../Redux/actions'


const Filter = (props)=>{

    
const dispatch = useDispatch()

const handleGenres = (event)=>{
    dispatch(genresSort(event.target.value));
}

const handleAZ = (event) =>{
    dispatch(aZSort(event.target.value));
}

    return (

        <div className={style.container}>

            <label>Genres :</label>
            <select onChange={handleGenres}>
                <option value="All">All</option>
                <option value="Action">Action</option>
                <option value="Indie">Indie</option>
                <option value="Adventure">Adventure</option>
                <option value="RPG">RPG</option>
                <option value="Strategy">Strategy</option>
                <option value="Shoote">Shoote</option>
                <option value="Casual">Casual</option>
                <option value="Simulation">Simulation</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Arcade">Arcade</option>
                <option value="Platformer">Platformer</option>
                <option value="Massively Multiplayer">Massively Multiplayer</option>
                <option value="Racing">Racing</option>
                <option value="Sports">Sports</option>
                <option value="Fighting">Fighting</option>
                <option value="Family">Family</option>
                <option value="Board Games">Board Games</option>
                <option value="Educational">Educational</option>
                <option value="Card">Card</option>
            </select>

            <label>Origen :</label>
            <select onChange={handleGenres}>
                <option value="API">API</option>
                <option value="DB">Data Base</option>
            </select>
            
            <label>Sort :</label>
            <select onChange={handleAZ}>
                <option value="AZ">Alphabetical A-Z</option>
                <option value="ZA">Alphabetical Z-A</option>
                <option value="mayor">Rating +</option>
                <option value="menor">Rating -</option>
            </select>
        </div>

    )
};

export default Filter