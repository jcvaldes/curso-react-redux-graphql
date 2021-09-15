// constantes
import axios from "axios";
let initialData = {
  fetching: false, //para ver si está cargando
  array: [], //array de personajes
  current: {}, // datos del personaje actual
};
let URL = "https://rickandmortyapi.com/api/character";

let GET_CHARACTERS = "GET_CHARACTERS";
let GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";
// reducer: solo se dedica a una parte del store
export default function reducer(state = initialData, action) {
  switch (action.type) {
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
