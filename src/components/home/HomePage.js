import React from "react";
import Card from "../card/Card";
import styles from "./home.module.css";
// conecta nuestro componente con redux
import { connect } from "react-redux";
import { removeCharacterAction } from "../../redux/charsDuck";
function HomePage({ chars, removeCharacterAction }) {
  function renderCharacter() {
    let char = chars[0];
    return <Card leftClick={nextCharacter} {...char} />;
  }

  function nextCharacter() {
    removeCharacterAction();
  }

  return (
    <div className={styles.container}>
      <h2>Personajes de Rick y Morty</h2>
      <div>{renderCharacter()}</div>
    </div>
  );
}
// saca lo que tiene en el state de redux y lo pone en este componente
function mapStateToProps(state) {
  return {
    chars: state.characters.array, // el array traido del state va a vivir en un prop llamado chars
  };
}

// connect injecta removeCharacterAction (una accion) como props a homePage 
// para que la pueda usar y hacer cambios en el store
export default connect(mapStateToProps, { removeCharacterAction })(HomePage);
