import React from "react";
import Card from "../card/Card";
import styles from "./home.module.css";
// conecta nuestro componente con redux
import { connect } from "react-redux";

function Home({chars}) {
  function renderCharacter() {
    let char = chars[0]
    return <Card {...char}/>;
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
export default connect(mapStateToProps)(Home);
