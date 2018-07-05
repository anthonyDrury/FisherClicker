import initialState from "../store/initialState";

//START HERE
export default function upgradesReducer(state = initialState.upgrades, action) {
  switch (action.type) {
    case "BUY_UPGRADE":
      state[action.id].upgrade = {
        ...action.payload
      };
      return {
        ...state
      };
    // case "BUY_UPGRADE":
    //   return Object.assign({}, state);
    case "SET_UPGRADECLASS":
      console.log(action.id);
      state[action.id] = {
        ...state[action.id],
        ...action.payload
      };
      return {
        ...state
      };
    default:
      return state;
  }
}
