const library = require("./libraries");
const Item = require("./Item");

class Job {
  constructor(name) {
    this.name = name;
    this.startingHP = library.masterJobList[name].startingHP;
    this.startingMP = library.masterJobList[name].startingMP;
    this.startingStr = library.masterJobList[name].startingStr;
    this.startingDex = library.masterJobList[name].startingDex;
    this.startingSpeed = library.masterJobList[name].startingSpeed;
    this.startingSta = library.masterJobList[name].startingSta;
    this.startingInt = library.masterJobList[name].startingInt;
    this.startingLuck = library.masterJobList[name].startingLuck;
    this.heaviestEquipment = library.masterJobList[name].heaviestEquipment;
    this.startingEquipment = library.masterJobList[name].startingEquipment;
    this.img = library.masterJobList[name].img;
    this.hasSpells = library.masterJobList[name].hasSpells;
    this.hasAbilities = library.masterJobList[name].hasAbilities;
  }

  get spells() {
    if (this.hasSpells) {
      return library.masterJobList[this.name].spells;
    } else return "none";
  }

  get startingArmor() {
    const armor = new Item(this.startingEquipment.armor, "equipment", "armor");
    return armor;
  }

  get startingWeapon() {
    const weapon = new Item(
      this.startingEquipment.weapon,
      "equipment",
      "weapons"
    );
    return weapon;
  }
}

module.exports = Job;
