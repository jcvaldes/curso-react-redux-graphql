// constantes
import axios from "axios";
import { getFavs, updateDB } from "../firebase";
let initialData = {
  fetching: false, //para ver si está cargando
  array: [], //array de personajes
  current: {}, // datos del personaje actual
  favorites: [], //array de personajes favoritos
};
let URL = "https://rickandmortyapi.com/api/character";

let GET_CHARACTERS = "GET_CHARACTERS";
let GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";
let ADD_TO_FAVORITES = "ADD_TO_FAVORITES";

// No hago el SUCCESS Y ERROR porque no me comunico con el backend
let REMOVE_CHARACTER = "REMOVE_CHARACTER";

let GET_FAVS = "GET_FAVS";
let GET_FAVS_SUCCESS = "GET_FAVS_SUCCESS";
let GET_FAVS_ERROR = "GET_FAVS_ERROR";

// reducer: solo se dedica a una parte del store
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return { ...state, ...action.payload };
    case GET_FAVS:
      return { ...state, fetching: true };
    case GET_FAVS_SUCCESS:
      return { ...state, favorites: action.payload, fetching: false };
    case GET_FAVS_ERROR:
      return { ...state, fetching: false, error: action.payload };
    case REMOVE_CHARACTER:
      return { ...state, array: action.payload };
    case GET_CHARACTERS:
      return { ...state, fetching: true };
    case GET_CHARACTERS_SUCCESS:
      return { ...state, array: action.payload, fetching: false };
    case GET_CHARACTERS_ERROR:
      return { ...state, fetching: false, error: action.payload };
    default:
      return state;
  }
}

// actions  creators (thunks) y siempre devuelve otra funcion que la va a usar otra
// herramienta que se llama connect()

// export function getCharactersAction() {
//     return (dispatch, getState) => {

//     }
// }

export let getCharactersAction = () => (dispatch, getState) => {
  // lo uso para poner un loading o spinner
  dispatch({
    type: GET_CHARACTERS,
  });
  return axios
    .get(URL)
    .then((res) => {
      dispatch({ type: GET_CHARACTERS_SUCCESS, payload: res.data.results });
    })
    .catch((err) => {
      dispatch({ type: GET_CHARACTERS_ERROR, payload: err.response.message });
    });
};
// si pongo que no me gusta saco el personaje de la lista del state
export let removeCharacterAction = () => (dispatch, getState) => {
  // hay quienes prefieren hacer la logica en el reducer y no en el thunk pero es mejor
  // dejar el reducer lo mas limpio posible

  // ?? donde estan los characters
  let { array } = getState().characters; // getState obtiene todo el store
  // saco el personaje del array
  array.shift();

  dispatch({
    type: REMOVE_CHARACTER,
    payload: [...array],
  });
};

// agrego a la lista de favoritos
export let addToFavoriteAction = () => (dispatch, getState) => {
  // hay quienes prefieren hacer la logica en el reducer y no en el thunk pero es mejor
  // dejar el reducer lo mas limpio posible

  // ?? donde estan los characters
  let { array, favorites } = getState().characters; // getState obtiene todo el store
  // saco el personaje del array
  let { uid } = getState().user;
  let char = array.shift();
  favorites.push(char);

  // agrego a firebase
  updateDB(favorites, uid);
  dispatch({
    type: ADD_TO_FAVORITES,
    payload: { array: [...array], favorites: [...favorites] },
  });
};

export let retrieveFavsAction = () => (dispatch, getState) => {
  dispatch({ type: GET_FAVS });
  let { uid } = getState().user;
  return getFavs(uid)
    .then((array) => {
      dispatch({ type: GET_FAVS_SUCCESS, payload: [...array] });
    })
    .catch((err) => {
      console.error(err);
      dispatch({ type: GET_FAVS_ERROR, payload: err.message });
    });
};
