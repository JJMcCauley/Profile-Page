const startCombat = require("./combat");

const startGame = (party) => {
  startCombat(party);
};

module.exports = startGame;
