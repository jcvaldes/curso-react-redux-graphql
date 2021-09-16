// createStore crea un strore
// combineReducers combina los diferentes reducers
// compose permite configurar la herramienta de debugging
// applyMiddleware configura las aplicaciones extra que queremos que tenga nuestro store
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
// para poder manejar funciones que devuelven otras funciones a las cuales se le injecta el dispatch y getState de redux usamos redux-thunk
import thunk from "redux-thunk"; 
// import userReducer from "./userDuck";

import charsReducer, { getCharactersAction } from "./charsDuck";

// Reducer principal que convina varios reducers
let rootReducer = combineReducers({
  // user: userReducer,
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
