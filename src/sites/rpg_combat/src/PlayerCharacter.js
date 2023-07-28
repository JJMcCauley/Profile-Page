const Job = require("./Job");
const PlayerStats = require("./PlayerStats");
const {
  getMasterSpellList,
  randomNumberGenerator,
  isEven,
} = require("./helper");

class PlayerCharacter {
  constructor(name, gender, job) {
    this.name = name;
    this.level = 3;
    this.gender = gender;
    this.job = new Job(job);
    this.equipment = {
      weapon: this.job.startingWeapon,
      helmet: "none",
      armor: this.job.startingArmor,
      accessory: "none",
    };
    this.stats = new PlayerStats(this.job);
    this.status = "none";
    this.isEnemy = false;
    this.damage = 0;
    this.spentMP = 0;
    this.initiative = 0;
    this.currentlyCasting = "";
  }

  get alive() {
    if (this.currentHP <= 0) {
      return false;
    } else return true;
  }

  get attack() {
    let damage = 0;
    let randomInt = randomNumberGenerator(1, 10);
    let attack = this.equipment.weapon.damage;
    if (isEven(randomInt)) {
      attack += randomNumberGenerator(0, this.equipment.weapon.dmgRange);
    } else {
      attack -= randomNumberGenerator(0, this.equipment.weapon.dmgRange);
    }
    if (this.equipment.weapon.weight === "light") {
      damage = Math.round((2 * attack + 2 * this.stats.dex) / 3);
    } else {
      damage = Math.round((2 * attack + this.stats.str) / 3);
    }
    if (damage > 1) return damage;
    else return 1;
  }

  get magicAttack() {
    let damage = 0;
    let randomInt = randomNumberGenerator(1, 10);
    const spell = this.currentlyCasting;
    let magicAttack = spell.baseDamage + this.level;
    if (isEven(randomInt)) {
      magicAttack += randomNumberGenerator(0, spell.damageRange);
    } else {
      magicAttack -= randomNumberGenerator(0, spell.damageRange);
    }
    damage = Math.round((2 * magicAttack + this.stats.int) / 3);
    if (damage > 1) return damage;
    else return 1;
  }

  get currentHP() {
    return this.stats.maxHP - this.damage;
  }

  get currentMP() {
    return this.stats.maxMP - this.spentMP;
  }

  set partyIndex(party) {
    for (let i = 0; i < party.members.length; i++) {
      if (party.members[i].name === this.name) {
        this._partyIndex = i;
        break;
      }
    }
  }

  get partyIndex() {
    return this._partyIndex;
  }

  get pronoun() {
    if (this.gender === "male") {
      return "he";
    } else if (this.gender === "female") {
      return "she";
    } else if (this.gender === "non-binary") {
      return "they";
    }
  }

  get spells() {
    if (this.job.hasSpells) {
      const spellList = [];
      for (let spellLevel in this.job.spells) {
        for (let i = 0; i < this.job.spells[spellLevel].length; i++) {
          if (parseInt(spellLevel) <= this.level) {
            spellList.push(this.job.spells[spellLevel][i]);
          }
        }
      }
      if (spellList.length >= 1) {
        const spellObjects = [];
        for (let i = 0; i < spellList.length; i++) {
          const newSpell = getMasterSpellList().filter(
            (magSpell) => magSpell.name === spellList[i]
          );
          spellObjects.push(newSpell[0]);
        }
        return spellObjects;
      } else return `${capitalizeWord(this.name)} knows no spells yet.`;
    } else return `${capitalizeWord(this.name)} has no spells.`;
  }

  get hasOffensiveSpells() {
    if (typeof this.spells !== "string") {
      for (let i = 0; i < this.spells.length; i++) {
        if (this.spells[i].type === "offensive") {
          return true;
        }
      }
      return false;
    } else return false;
  }

  get hasSupportSpells() {
    if (typeof this.spells !== "string") {
      for (let i = 0; i < this.spells.length; i++) {
        if (this.spells[i].type === "support") {
          return true;
        }
      }
      return false;
    } else return false;
  }

  equipGear(gear) {
    if (gear.type === "melee weapon" || "ranged weapon") {
      this.equipment.weapon = gear;
    } else if (gear.type === "helmet") {
      this.equipment.helmet = gear;
    } else if (gear.type === "armor") {
      this.equipment.armor = gear;
    } else if (gear.type === "accessory") {
      this.equipment.accessory = gear;
    }
    gear.equipped = true;
  }

  removeGear(gear) {
    if (gear.name !== "bare hands") {
      if (gear.type === "melee weapon" || "ranged weapon") {
        this.equipment.weapon = masterItemList.weapons.bareHands.generateItem();
      } else if (gear.type === "helmet") {
        this.equipment.helmet = "";
      } else if (gear.type === "armor") {
        this.equipment.armor = "";
      } else if (gear.type === "accessory") {
        this.equipment.accessory = "";
      }
      gear.equipped = false;
      party.inventory.push(gear);
    }
  }
}

module.exports = PlayerCharacter;
