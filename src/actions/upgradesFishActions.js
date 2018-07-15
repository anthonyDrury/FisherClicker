export function buyUpgradeFish(upgrades, id) {
  return {
    type: "BUY_UPGRADEFISH",
    id: id,
    payload: upgrades
  };
}

export function setUpgradeFishClass(id, className) {
  return {
    type: "SET_UPGRADEFISHCLASS",
    id: id,
    payload: className
  };
}
