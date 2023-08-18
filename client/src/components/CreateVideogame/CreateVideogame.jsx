import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  postVideogame,
  getGenres,
  getPlatforms,
  resetVideogames,
  getVideogames,
} from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import style from "./CreateVideogame.module.css";

export default function CreateVideogame() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allGenres = useSelector((state) => state.genres);
  let allPlatforms = useSelector((state) => state.platforms);

  allPlatforms = allPlatforms.slice(0, 20);

  const genresNames = {};
  allGenres.forEach(
    (e, i) => (genresNames[allGenres[i].id] = allGenres[i].name)
  );

  const inputs = [
    { name: "text" },
    { image: "text" },
    { description: "textarea" },
    { rating: "text" },
    { released: "date" },
  ];

  const initialInputs = {
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  };

  const [input, setInput] = useState({ ...initialInputs }); 

  /* El código anterior está utilizando el hoock UseeFectect en un componente React.Está enviando una acción
  llamado "GetGenres" para buscar géneros.El hoock UseeFectect se activa cuando el componente se monta y
  Cada vez que cambia la variable "despachar".*/
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPlatforms());
  }, [dispatch]);

  const [inputsErrors, setInputsErrors] = useState({});

  const imgNotFound =
    "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";

  let errors = {};

  const inputsValidator = (form) => {
    let regexName = /^[A-Za-z0-9\s]+$/;
    // let regexDate = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    let regexDate = /^\d{4}-\d{2}-\d{2}$/;
    // let regexImage = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpe?g|gif|png|webp|bmp)/i;

    if (
      !regexName.test(form.name.trim()) ||
      !form.name.trim() ||
      form.name.length > 40 ||
      form.name.length < 4
    )
      errors.name = "*Se requiere un nombre (debe contener min 4 car & max 40 car)";
    //!regexImage.test(form.image)
    if (srcImage.src === imgNotFound) {
      errors.image = "*Se requiere URL de imagen (ingrese una URL de imagen válida)";
    }

    if (
      form.description.trim().length < 10 ||
      form.description.trim().length > 250
    )
      errors.description =
        "*Se requiere una descripción (min 10 caracteres & max 250 caracteres)";

    if (!regexDate.test(form.released))
      errors.released = "*Se requiere la fecha de lanzamiento - formato(mm-dd-yyyy)";

    if (
      isNaN(form.rating) ||
      form.rating < 0 ||
      form.rating > 5 ||
      form.rating.trim() === ""
    )
      errors.rating = "*Se requiere calificación (min 0 & max 5)";

    if (form.genres.length > 5 || form.genres.length === 0)
      errors.genres = "*Seleccione Genero (min 1 & max 5)";

    if (form.platforms.length > 5 || form.platforms.length === 0)
      errors.platforms = "*Seleccione Plataforma (min 1 & max 5)";

    return errors;
  };

  let srcImage = document.getElementById("imgSrc");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputsErrors(
      inputsValidator({
        ...input,
        [name]: value,
      })
    );

    setInput({
      ...input,
      [name]: isNaN(value * 1) ? value : Number.parseFloat(value).toFixed(2),
    });
  };

  const handleSelect = (e) => {
    setInputsErrors(
      inputsValidator({
        ...input,
        [e.target.name]: isNaN(e.target.value * 1)
          ? [...input[`${e.target.name}`], e.target.value]
          : [...input[`${e.target.name}`], e.target.value * 1],
      })
    );

    if (input[`${e.target.name}`].length === 5) {
      setInput({
        ...input,
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: isNaN(e.target.value * 1)
          ? [...new Set([...input[`${e.target.name}`], e.target.value])]
          : Array.from(
              new Set([...input[`${e.target.name}`], e.target.value * 1])
            ),
      });
    }
  };

  const handleDelete = (e, k) => {
    setInputsErrors(
      inputsValidator({
        ...input,
        [k]:
          k === "genres"
            ? input[k].filter((gen) => genresNames[gen] !== e)
            : input[k].filter((plat) => plat !== e),
      })
    );

    setInput({
      ...input,
      [k]:
        k === "genres"
          ? input[k].filter((gen) => genresNames[gen] !== e)
          : input[k].filter((plat) => plat !== e),
    });
  };

  const validator =
    input.name &&
    input.description &&
    input.rating &&
    input.released &&
    input.genres.length &&
    input.platforms.length
      ? true
      : false;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      Object.keys(inputsErrors).length === 0 &&
      validator &&
      srcImage.src !== imgNotFound
    ) {
      dispatch(postVideogame(input));
      alert(`Videogame ${input.name} Agregado!`);
      setInput({ ...initialInputs });
      history.push("/home");
      dispatch(resetVideogames());
      dispatch(getVideogames());
    } else {
      alert("¡Todas las entradas completadas correctamente!");

      setInputsErrors(
        inputsValidator({
          ...input,
        })
      );
    }
  };

  return (
    <div className={style.containerCreateVideogame}>
      <Link to="/home">
        <button className={style.goBackHome}>&#8592; Ir al inicio</button>
      </Link>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={style.formCreateVideogame}
      >
        <h1 className={style.title}>Agregar VideoGame</h1>
        <div className={style.containerInputsAndSelects}>
          <div className={style.containerOne}>
            {inputs.map((e) => {
              return Object.values(e).join() !== "textarea" ? (
                <div className={style.containerInputs}>
                  <div>
                    <label className={style.labels}>
                      {Object.keys(e).join()}:
                    </label>
                  </div>
                  <input
                    id={Object.keys(e).join()}
                    className={style.inputs}
                    type={`${Object.values(e).join()}`}
                    value={input[`"${Object.keys(e).join()}"`]}
                    name={Object.keys(e).join()}
                    placeholder={`${Object.keys(e).join()}`}
                    onChange={(e) => handleChange(e)}
                    onBlur={
                      Object.keys(e).join() === "image"
                        ? (e) => handleChange(e)
                        : null
                    }
                    onFocus={
                      Object.keys(e).join() === "image"
                        ? (e) => handleChange(e)
                        : null
                    }
                    onKeyUp={
                      Object.keys(e).join() === "image"
                        ? (e) => handleChange(e)
                        : null
                    }
                    onMouseOut={
                      Object.keys(e).join() === "image" && validator
                        ? (e) => handleChange(e)
                        : null
                    }
                  ></input>
                  {inputsErrors[`${Object.keys(e).join()}`] && (
                    <p className={style.errorsMessages}>
                      {inputsErrors[`${Object.keys(e).join()}`]}
                    </p>
                  )}
                </div>
              ) : (
                <div className={style.containerInputs}>
                  <div>
                    <label className={style.labels}>
                      {Object.keys(e).join()}:
                    </label>
                  </div>
                  <textarea
                    className={style.textarea}
                    type="text"
                    value={input[`"${Object.keys(e).join()}"`]}
                    name={Object.keys(e).join()}
                    placeholder={`${Object.keys(e).join()}`}
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                  {inputsErrors[`${Object.keys(e).join()}`] && (
                    <p className={style.errorsMessages}>
                      {inputsErrors[`${Object.keys(e).join()}`]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <div className={style.containerTwo}>
            <div className={style.containerSelects}>
              <select
                defaultValue="default"
                name="genres"
                onChange={(e) => handleSelect(e)}
                disabled={input.genres.length === 5}
                className={style.selects}
              >
                <option value="default" disabled>
                  Genres
                </option>
                {allGenres.map((e) => (
                  <option value={e.id}>{e.name}</option>
                ))}
              </select>
              {inputsErrors.genres ? (
                <p className={style.errorsMessages}>{inputsErrors.genres}</p>
              ) : null}

              <div>
                <ul className={style.containerLiSelects}>
                  {input.genres.length ? (
                    input.genres.map((e) => {
                      return (
                        <li className={style.liSelects}>
                          {genresNames[e]}
                          <button
                            type="button"
                            className="buttonDelete"
                            onClick={() =>
                              handleDelete(genresNames[e], "genres")
                            }
                          >
                            X
                          </button>
                        </li>
                      );
                    })
                  ) : (
                    <p className={style.selectEmpty}>
                      Seleccione min 1 Genero & max 5
                    </p>
                  )}
                </ul>
              </div>
            </div>
            <div className={style.containerSelects}>
              <select
                defaultValue="default"
                name="platforms"
                onChange={(e) => handleSelect(e)}
                disabled={input.platforms.length === 5}
                className={style.selects}
              >
                <option value="default" disabled>
                  Plataformas
                </option>
                {allPlatforms.map((e) => (
                  <option value={e.name}>{e.name}</option>
                ))}
              </select>

              {inputsErrors.platforms ? (
                <p className={style.errorsMessages}>{inputsErrors.platforms}</p>
              ) : null}
              <div>
                <ul className={style.containerLiSelects}>
                  {input.platforms.length ? (
                    input.platforms.map((el) => (
                      <li className={style.liSelects}>
                        {el}
                        <button
                          type="button"
                          className="buttonDelete"
                          onClick={() => handleDelete(el, "platforms")}
                        >
                          X
                        </button>
                      </li>
                    ))
                  ) : (
                    <p className={style.selectEmpty}>
                      Seleccione Min 1 Plataforma y Max 5
                    </p>
                  )}
                </ul>
              </div>
            </div>
            <div className={style.containerPreviousImage}>
              <h4>Previsualizar imagen</h4>
              <div className={style.previousImage}>
                <img
                  id="imgSrc"
                  src={input.image}
                  name="previousImage"
                  onError={(e) => {
                    console.log("Hello World!");
                    e.target.src = imgNotFound;
                    e.target.onerror = null;
                  }}
                  alt="Img-Previous"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={style.containerSubmit}>
          {Object.keys(inputsErrors).length || !validator ? (
            <p className={style.infoCompleteInputs}>Por favor complete todos los campos!</p>
          ) : null}
          <button
            type="submit"
            disabled={
              Object.keys(inputsErrors).length || !validator ? true : false
            }
            className={style.buttonSubmit}
          >
            Agregar VideoGame
          </button>
        </div>
      </form>
    </div>
  );
}
