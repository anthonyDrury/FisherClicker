const initialState = {
  score: { tpsFish: 0, tpsSale: 1, totalFish: 0, totalValue: 0 },   //tps = TotalPerSecond
  upgradesFish: {
    0: {
      id: 0,
      title: "Local Boy",
      price: 10,
      initialPrice: 10,
      perSecondBonus: 1,
      amount: 0,
      target: ["anchovie"],
      disabled: "disabled"
    },
    1: {
      id: 1,
      title: "Amateur Fisher",
      price: 1000,
      initialPrice: 1000,
      perSecondBonus: 10,
      amount: 0,
      target: ["anchovie"],
      disabled: "disabled"
    },
    2: {
      id: 2,
      title: "Local Legend",
      price: 10000,
      initialPrice: 10000,
      perSecondBonus: 100,
      amount: 0,
      target: ["anchovie"],
      disabled: "disabled"
    },
    3: {
      id: 3,
      title: "Pro Fisher",
      price: 100000,
      initialPrice: 100000,
      perSecondBonus: 500,
      amount: 0,
      target: ["anchovie"],
      disabled: "disabled"
    },
    4: {
      id: 4,
      title: "David",
      price: 500000,
      initialPrice: 500000,
      perSecondBonus: 1000,
      amount: 0,
      target: ["anchovie"],
      disabled: "disabled"
    },
    5: {
      id: 5,
      title: "Tinny",
      price: 1000000,
      initialPrice: 1000000,
      perSecondBonus: 2000,
      amount: 0,
      target: ["anchovie"],
      disabled: "disabled"
    },
    6: {
      id: 6,
      title: "Fishing Trawler",
      price: 10000000,
      initialPrice: 10000000,
      perSecondBonus: 5000,
      amount: 0,
      target: ["anchovie"],
      disabled: "disabled"
    },
    7: {
      id: 7,
      title: "Pro Vessel",
      price: 15000000,
      initialPrice: 15000000,
      perSecondBonus: 8000,
      amount: 0,
      target: ["anchovie"],
      disabled: "disabled"
    },
    8: {
      id: 7,
      title: "Pequod",
      price: 35000000,
      initialPrice: 35000000,
      perSecondBonus: 10000,
      amount: 0,
      target: ["anchovie"],
      disabled: "disabled"
    },
    9: {
      id: 8,
      title: "Maui",
      price: 100000000,
      initialPrice: 100000000,
      perSecondBonus: 100000,
      amount: 0,
      target: ["anchovie"],
      disabled: "disabled"
    }
  },
  upgradesSale: {
    0: {
      id: 0,
      title: "Street Merchant",
      price: 10,
      initialPrice: 10,
      perSecondBonus: 1,
      amount: 0,
      target: ["anchovie"],
      disabled: "disabled"
    },
    1: {
      id: 1,
      title: "Fish Biker",
      price: 1000,
      initialPrice: 1000,
      perSecondBonus: 10,
      amount: 0,
      target: ["anchovie"],
      disabled: "disabled"
    },
    2: {
      id: 2,
      title: "Fish Cart",
      price: 10000,
      initialPrice: 10000,
      perSecondBonus: 100,
      amount: 0,
      target: ["anchovie"],
      disabled: "disabled"
    },
    3: {
      id: 3,
      title: "Entrepreneur",
      price: 100000,
      initialPrice: 100000,
      perSecondBonus: 500,
      amount: 0,
      target: ["anchovie"],
      disabled: "disabled"
    },
    4: {
      id: 4,
      title: "Fish'n'Shop",
      price: 500000,
      initialPrice: 500000,
      perSecondBonus: 1000,
      amount: 0,
      target: ["anchovie"],
      disabled: "disabled"
    },
    5: {
      id: 5,
      title: "Fish R Us",
      price: 1000000,
      initialPrice: 1000000,
      perSecondBonus: 2000,
      amount: 0,
      target: ["anchovie"],
      disabled: "disabled"
    },
    6: {
      id: 6,
      title: "Fish 2 U",
      price: 10000000,
      initialPrice: 10000000,
      perSecondBonus: 5000,
      amount: 0,
      target: ["anchovie"],
      disabled: "disabled"
    },
    7: {
      id: 7,
      title: "Fish Coin",
      price: 15000000,
      initialPrice: 15000000,
      perSecondBonus: 8000,
      amount: 0,
      target: ["anchovie"],
      disabled: "disabled"
    },
    8: {
      id: 7,
      title: "Fish Pill",
      price: 35000000,
      initialPrice: 35000000,
      perSecondBonus: 10000,
      amount: 0,
      target: ["anchovie"],
      disabled: "disabled"
    },
    9: {
      id: 8,
      title: "~Fysh~",
      price: 100000000,
      initialPrice: 100000000,
      perSecondBonus: 100000,
      amount: 0,
      target: ["anchovie"],
      disabled: "disabled"
    }
  }
};

export default initialState;
