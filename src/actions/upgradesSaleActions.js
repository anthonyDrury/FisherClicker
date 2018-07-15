export function buyUpgradeSale(upgrades, id) {
  return {
    type: "BUY_UPGRADESALE",
    id: id,
    payload: upgrades
  };
}

export function setUpgradeSaleClass(id, className) {
  return {
    type: "SET_UPGRADESALECLASS",
    id: id,
    payload: className
  };
}
