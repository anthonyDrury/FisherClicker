import initialState from "../store/initialState";

//START HERE
export default function upgradesSaleReducer(state = initialState.upgradesSale, action) {
  let id = action.id;
  switch (action.type) {

    case "BUY_UPGRADESALE":
    return Object.assign({}, state, {
      [id]: action.payload
    });

    case "SET_UPGRADESALECLASS":
    return Object.assign({}, state, {
      [id]: Object.assign({}, state[id], {
        disabled: action.payload 
      })
    });
    default:
      return state;
  }
}
