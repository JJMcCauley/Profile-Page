const library = require("./libraries");

class Spell {
  constructor(spellName) {
    this.name = spellName;
    this.type = library.masterSpellList[spellName].type;
    this.target = library.masterSpellList[spellName].target;
    this.shortDesc = library.masterSpellList[spellName].shortDesc;
    if (library.masterSpellList[spellName].hpDamage) {
      this.baseDamage = library.masterSpellList[spellName].hpDamage;
      this.damageRange = library.masterSpellList[spellName].damageRange;
    }
    if (library.masterSpellList[spellName].hpHeal) {
      this.baseHeal = library.masterSpellList[spellName].hpHeal;
    }
    this.mpCost = library.masterSpellList[spellName].mpCost;
    this.speed = library.masterSpellList[spellName].speed;
    if (library.masterSpellList[spellName].specialEffects) {
      this.specialEffects = library.masterSpellList[spellName].specialEffects;
    }
  }
}

module.exports = Spell;
