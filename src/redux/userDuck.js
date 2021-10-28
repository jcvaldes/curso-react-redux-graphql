// constantes
import { loginWithGoogle, signOutGoogle } from "../firebase";
import { retrieveFavsAction } from "./charsDuck";
let initialData = {
  loggedIn: false,
  fetching: false,
};

let LOGIN = "LOGIN";
let LOGIN_SUCCESS = "LOGIN_SUCCESS";
let LOGIN_ERROR = "LOGIN_ERROR";
let LOG_OUT = "LOG_OUT";
// reducer: solo se dedica a una parte del store
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, fetching: true };
    case LOGIN_SUCCESS:
      return { ...state, fetching: false, loggedIn: true, ...action.payload };
    case LOGIN_ERROR:
      return { ...state, fetching: false, error: action.payload };
    case LOG_OUT:
      return { ...initialData };
    default:
      return state;
  }
}
// auxiliar
function saveStorage(storage) {
  // localStorage.setItem("storage", JSON.stringify(storage));
  localStorage.storage = JSON.stringify(storage);
}
// action creators

export let logOutAction = () => (dispatch, getState) => {
  signOutGoogle();
  dispatch({ type: LOG_OUT });
  localStorage.removeItem("storage");
};
// para restaurar la sesion si refresco la pagina
export let restoreSessionAction = () => (dispatch) => {
  let storage = localStorage.getItem("storage");
  storage = JSON.parse(storage);
  if (storage && storage.user) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: storage.user,
    });
  }
};
export let doGoogleLoginAction = () => (dispatch, getState) => {
  dispatch({
    type: LOGIN,
  });
  return loginWithGoogle()
    .then((user) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
      });
      saveStorage(getState());
      // llamo a otra accion desde el action de login
      retrieveFavsAction()(dispatch, getState);
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_ERROR,
        payload: err.message,
      });
    });
};
