const Spell = require("./Spell");
const library = require("./libraries");

function capitalizeWord(word) {
  return `${word[0].toUpperCase()}${word.slice(1)}`;
}

function damageFormula(attack, defense) {
  const dmg = Math.round(attack * (100 / (100 + defense)));
  const msg = `
                    Attack Value: ${attack}
                    Defense Value: ${defense}
                    Total Damage: ${dmg}
    `;
  console.log(msg);
  return dmg;
}

function isEven(number) {
  if (number % 2 === 0) return true;
  else return false;
}

function getScript(scriptLocation) {
  return library.script[scriptLocation];
}

function randomNumberGenerator(min, max) {
  // Returns a random integer from 1 to 10:
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMasterSpellList() {
  const spellList = [];
  for (let spell in library.masterSpellList) {
    const newSpell = new Spell(spell);
    spellList.push(newSpell);
  }
  return spellList;
}

module.exports = {
  capitalizeWord,
  damageFormula,
  isEven,
  getMasterSpellList,
  getScript,
  randomNumberGenerator,
};
