export function buyUpgrade(upgrade, id) {
  return {
    type: "BUY_UPGRADE",
    id: id,
    payload: { upgrade }
  };
}

// export function buyUpgrade(upgrades) {
//   return { type: "BUY_UPGRADE", upgrades: upgrades };
// }

export function setUpgradeClass(upgrade, id, className) {
  return {
    type: "SET_UPGRADECLASS",
    id: id,
    payload: { disabled: className }
  };
}
