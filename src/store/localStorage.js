export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("fisherClicker_state");
    if (serializedState === null) {
      console.log("Serialized state is null");
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("fisherClicker_state", serializedState);
  } catch (err) {
    console.log(err);
  }
};
