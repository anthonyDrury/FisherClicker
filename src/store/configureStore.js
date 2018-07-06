import { createStore } from "redux";
import rootReducer from "../reducers";
import initialState from "./initialState";

//Load from Cache if present else initialstate
export default function configureStore(cacheState = initialState) {
  return createStore(rootReducer, cacheState);
}
