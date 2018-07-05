export function updatePerSecond(perSecondValue) {
  return { type: "UPDATE_PERSECOND", perSecondValue };
}

export function updateTotalValue(totalValue) {
  return { type: "UPDATE_TOTALVALUE", totalValue };
}

//Updates both Total Value and PerSecond
export function updateScore(score) {
  return { type: "UPDATE_SCORE", score };
}
