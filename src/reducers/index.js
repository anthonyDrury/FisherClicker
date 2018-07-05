import { combineReducers } from "redux";
import score from "./scoreReducer";
import upgrades from "./updgradesReducer";

const rootReducer = combineReducers({
  score,
  upgrades
});

export default rootReducer;
