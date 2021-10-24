import React from "react";
import styles from "./login.module.css";
// conecta nuestro componente con redux
import { connect } from "react-redux";
import { doGoogleLoginAction, logOutAction } from "../../redux/userDuck";

function LoginPage({ loggedIn, fetching, doGoogleLoginAction, logOutAction }) {
  function doLogin() {
    doGoogleLoginAction();
  }
  function logOut() {
    logOutAction();
  }
  if (fetching) return <h2>Cargando...</h2>;
  return (
    <div className={styles.container}>
      {loggedIn ? (
        <>
          <h1>Cierra tu sesión</h1>{" "}
          <button onClick={logOut}>Cerrar Sesión</button>{" "}
        </>
      ) : (
        <>
          <h1>Inicia Sesión con Google</h1>{" "}
          <button onClick={doLogin}>Iniciar</button>
        </>
      )}
    </div>
  );
}

// saca lo que tiene en el state de redux y lo pone en este componente
function mapStateToProps({ user: { fetching, loggedIn } }) {
  return {
    // el array traido del state va a vivir en un prop llamado chars
    fetching,
    loggedIn,
  };
}

// connect injecta doGoogleLoginAction (una accion) como props a Login
// para que la pueda usar y hacer cambios en el store
export default connect(mapStateToProps, { doGoogleLoginAction, logOutAction })(
  LoginPage
);
