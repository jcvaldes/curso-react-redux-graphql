import React from "react";
import styles from "./login.module.css";
// conecta nuestro componente con redux
import { connect } from "react-redux";
import { doGoogleLoginAction } from "../../redux/userDuck";

function LoginPage({fetching, doGoogleLoginAction}) {
  function doLogin() {
    doGoogleLoginAction();
  }
  if(fetching) return <h2>Cargando...</h2>
  return (
    <div className={styles.container}>
      <h1>Inicia Sesión con Google</h1>
      <h1>Cierra tu sesión</h1>
      <button onClick={doLogin}>Iniciar</button>
      <button>Cerrar Sesión</button>
    </div>
  );
}

// saca lo que tiene en el state de redux y lo pone en este componente
function mapStateToProps(state) {
    console.log(state)
    return {
      fetching: state.fetching, // el array traido del state va a vivir en un prop llamado chars
    };
}

  
  // connect injecta doGoogleLoginAction (una accion) como props a Login 
  // para que la pueda usar y hacer cambios en el store
  export default connect(mapStateToProps, { doGoogleLoginAction })(LoginPage);