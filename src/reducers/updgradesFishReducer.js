import initialState from "../store/initialState";
import update from "immutability-helper";
//https://github.com/kolodny/immutability-helper

//START HERE
export default function upgradesFishReducer(state = initialState.upgradesFish, action) {
  switch (action.type) {
    case "BUY_UPGRADEFISH":
      return update(state, {
        [action.id]: { $merge: action.payload }
      });
    case "SET_UPGRADEFISHCLASS":
      return update(state, {
        [action.id]: {
          disabled: { $set: action.payload }
        }
      });
    default:
      return state;
  }
}
