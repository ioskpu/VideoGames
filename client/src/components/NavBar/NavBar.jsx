import React from "react";
import { Link } from "react-router-dom";
import FilterByGenre from "../FilterByGenre/FilterByGenre";
import FilterApiOrDb from "../FilterApiOrDb/FilterApiOrDb";
import AlphabeticalSort from "../AlphabeticalSort/AlphabeticalSort";
import SortByRating from "../SortByRating/SortByRating";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";
import gitHubIcon from "../../assets/images/icons/github.svg";
import linkedinIcon from "../../assets/images/icons/linkedin.svg";

export default function NavBar({ handleRefresh, handleSetCurrentPage }) {
  return (
    <div>
      <div className={style.titleHome}>
        <h1>Game Over</h1>
        <button
          type="button"
          onClick={(e) => handleRefresh(e)}
          className={style.buttonRefresh}
        >
          Actualizar &#8635;
        </button>
        <div className={style.containerDevInfo}>
          <div className={style.devName}>
            <h5>by Luis Corales</h5>
          </div>
          <div className={style.devGitHub}>
            <a href="https://github.com/ioskpu" target="blank">
              <img src={gitHubIcon} alt="githubIcon" />
            </a>
          </div>
          <div className={style.devLinkedin}>
            <a href="https://www.linkedin.com/in/lrcorales/" target="blank">
              <img src={linkedinIcon} alt="linkedinIcon" />
            </a>
          </div>
        </div>
      </div>
      <div className={style.containerAllMenu}>
        <div className={style.containerFilter}>
          <FilterByGenre handleSetCurrentPage={handleSetCurrentPage} />
        </div>
        <div className={style.containerFilter}>
          <FilterApiOrDb handleSetCurrentPage={handleSetCurrentPage} />
        </div>
        <div className={style.containerFilter}>
          <AlphabeticalSort handleSetCurrentPage={handleSetCurrentPage} />
        </div>
        <div className={style.containerFilter}>
          <SortByRating handleSetCurrentPage={handleSetCurrentPage} />
        </div>
        <div>
          <SearchBar handleSetCurrentPage={handleSetCurrentPage} />
        </div>
        <div className={style.containerButtonCreate}>
          <Link to="/create-videogame">
            <button>Agregar Videojuego</button>
          </Link>
        </div>
        <div className={style.containerButtonCreate}>
          <Link to="/">
            <button>Ir al Landing</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
