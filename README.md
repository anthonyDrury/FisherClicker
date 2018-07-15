# FisherClicker
FisherClicker is an Idle Clicker game developed using React/Redux.

# Install
To install, simply clone the project to a local folder and run NPM install

# Cache
Idle Clicker caches game data, so when you are debugging or developing, keep that in mind. Either clear the cache when you wish to make changes, or turn it off while developing:

const persistedStore = loadState();
const store = configureStore(persistedStore); //Change to const store = configureStore(); For dev/test

store.subscribe(() => {
  saveState(store.getState());
});


# Upgrades
Upgrades are located in the initial state, if you wish to change these simply edit them there. Remember to update actions and reducers if you are attemping to change functionality. They are split into two main groups, upgradesSale and upgradesFish, each responsible for fishing and selling. Located at:
src/store/initialState.js

If you wish to edit functionality, make sure to edit their respective upgradeSection as well as the score section if required. Located:

src/components/home/upgrades/upgragesFish
src/components/home/upgrades/upgragesSale
src/components/shared/header/score