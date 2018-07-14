export function buyUpgradeSale(upgrades, id) {
  return {
    type: "BUY_UPGRADEFISH",
    id: id,
    payload: { upgrades }
  };
}

export function setUpgradeSaleClass(upgrade, id, className) {
  return {
    type: "SET_UPGRADEFISHCLASS",
    id: id,
    payload: className
  };
}
