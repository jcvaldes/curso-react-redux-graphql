// createStore crea un strore
// combineReducers combina los diferentes reducers
// compose permite configurar la herramienta de debugging
// applyMiddleware configura las aplicaciones extra que queremos que tenga nuestro store
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // para poder manejar promesas
// import userReducer from "./userDuck";

import charsReducer, { getCharactersAction } from "./charsDuck";
import userReducer from './userDuck'

// Reducer principal que convina varios reducers
let rootReducer = combineReducers({
  user: userReducer,
  characters: charsReducer,
});

// herramienta de debugging
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  // creo el store
  const store = createStore(
    rootReducer,
    //applyMiddleware(thunk)  // sin soporte a debugging
    composeEnhancers(applyMiddleware(thunk)) // con soporte a debugging
  );

  // ejecuto la accion para conseguir los personajes por primera vez
  getCharactersAction()(store.dispatch, store.getState);
  return store;
}
