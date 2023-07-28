const library = require("./libraries");
const Party = require("./Party");
const PlayerCharacter = require("./PlayerCharacter");
const intro = require("./intro");
const startGame = require("./gameLogic");

const defaultParty = [
  new PlayerCharacter("Phen", "male", library.jobArray[0]),
  new PlayerCharacter("Nia", "female", library.jobArray[1]),
  new PlayerCharacter("Codan", "male", library.jobArray[2]),
  new PlayerCharacter("Vielna", "female", library.jobArray[3]),
];

let party = new Party(defaultParty);

intro(party)
  .then((updatedParty) => {
    party = updatedParty;
    startGame(party);
    // Continue with the next part of the code here
  })
  .catch((error) => {
    // Handle any errors that occurred during the intro() function
    console.error(error);
  });
