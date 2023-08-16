import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

export default function LandingPage() {

  const [lista, setLista] = useState([
    'Construir una Single Page Application utlizando las tecnologías: React, Redux, Node, Express y Sequelize.',
    'Poner en práctica recursos básicos de estilo y diseño (UX : UI).',
    'Afirmar y conectar los conceptos aprendidos en la carrera.',
    'Aprender mejores prácticas.',
    'Aprender y practicar el workflow de GIT.',
    'Utilizar y practicar testing.',
  ]);
  return (
    <div className={style.container}>
      <h1 className={style.title}>Game Over</h1>
      <fieldset class="textContainer">
        <legend>SPA soyHenry Bootcamp</legend>
        <textarea readOnly value={lista.map(iten => `- ${iten}`).join("\n")}></textarea>
      </fieldset>
      <h2>Bienvenidos</h2>
      <Link to="/home" className={style.containerButtonHome}>
        <button className={style.buttonHome}>Inicio</button>
      </Link>
    </div>
  );
}
