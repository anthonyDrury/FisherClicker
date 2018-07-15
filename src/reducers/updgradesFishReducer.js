import initialState from "../store/initialState";

//START HERE
export default function upgradesFishReducer(state = initialState.upgradesFish, action) {
  let id = action.id;
  switch (action.type) {

    case "BUY_UPGRADEFISH":
      return Object.assign({}, state, {
        [id]: action.payload
      });

    case "SET_UPGRADEFISHCLASS":
      return Object.assign({}, state,
        [{ ...state[id], disabled: action.payload }]
      );

    default:
      return state;
  }
}
