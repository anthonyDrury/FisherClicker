import initialState from "../store/initialState";
import update from "immutability-helper";
//https://github.com/kolodny/immutability-helper

//START HERE
export default function upgradesSaleReducer(state = initialState.upgradesSale, action) {
  switch (action.type) {
    case "BUY_UPGRADESALE":
      return update(state, {
        [action.id]: { $merge: action.payload }
      });
    case "SET_UPGRADESALECLASS":
      return update(state, {
        [action.id]: {
          disabled: { $set: action.payload }
        }
      });
    default:
      return state;
  }
}
