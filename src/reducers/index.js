import { combineReducers } from "redux";
import score from "./scoreReducer";
import upgradesFish from "./updgradesFishReducer";
import upgradesSale from "./updgradesSaleReducer";

const rootReducer = combineReducers({
  score,
  upgradesFish,
  upgradesSale
});

export default rootReducer;
