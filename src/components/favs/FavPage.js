import React from "react";
import styles from "./favs.module.css";
import Card from "../card/Card";
// conecta nuestro componente con redux
import { connect } from "react-redux";
function FavPage({ characters = [0] }) {
  function renderCharacter(char, i) {
    return <Card hide {...char} key={i} />;
  }
  return (
    <div className={styles.container}>
      <h2>Favoritos</h2>
      {characters.map(renderCharacter)}
      {!characters.length && <h3>No hay personajes agregados</h3>}
    </div>
  );
}

// saca lo que tiene en el state de redux y lo pone en este componente
function mapStateToProps({ characters }) {
  return {
    characters: characters.favorites, // el array traido del state va a vivir en un prop llamado chars
  };
}

// connect injecta removeCharacterAction (una accion) como props a homePage
// para que la pueda usar y hacer cambios en el store
export default connect(mapStateToProps)(FavPage);
