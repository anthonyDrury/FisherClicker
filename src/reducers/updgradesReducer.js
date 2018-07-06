import initialState from "../store/initialState";
import update from "immutability-helper";
//https://github.com/kolodny/immutability-helper

//START HERE
export default function upgradesReducer(state = initialState.upgrades, action) {
  switch (action.type) {
    case "BUY_UPGRADE":
      return update(state, {
        [action.id]: { $merge: action.payload }
      });
    case "SET_UPGRADECLASS":
      return update(state, {
        [action.id]: {
          disabled: { $set: action.payload }
        }
      });
    default:
      return state;
  }
}
