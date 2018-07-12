import initialState from "../store/initialState";

export default function scoreReducer(state = initialState.score, action) {
  switch (action.type) {
    case "UPDATE_PERSECOND":
      return Object.assign({}, state, {
        perSecondValue: action.perSecondValue
      });
    case "UPDATE_TOTALVALUE":
      return Object.assign({}, state, {
        totalValue: action.totalValue
      });
    case "UPDATE_SCORE":
      return Object.assign({}, action.score);

    default:
      return state;
  }
}
