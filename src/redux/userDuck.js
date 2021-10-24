// constantes
let initialData = {
  loggedIn: false,
};

let LOGIN = "LOGIN";
// reducer: solo se dedica a una parte del store
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case LOGIN:
    default:
      return state;
  }
}

// action creators
