const initialState = {
  score: { perSecondValue: 2, totalValue: 0 },
  upgrades: {
    0: {
      id: 0,
      title: "Local Boy",
      price: 10,
      perSecondBonus: 1,
      amount: 0,
      disabled: "disabled"
    },
    1: {
      id: 1,
      title: "Amateur Fisher",
      price: 100,
      perSecondBonus: 5,
      amount: 0,
      disabled: "disabled"
    }
  }
};

export default initialState;
