const library = require("./libraries");
const EnemyStats = require("./EnemyStats");
const { randomNumberGenerator } = require("./helper");

class Enemy {
  constructor(name, index, number = 1) {
    this.name = library.masterEnemyList[name].name;
    this.stats = new EnemyStats(name);
    this.damage = 0;
    this.status = "attacking!";
    this.index = `${this.name}-${index}`;
    this.number = number;
    this.img = library.masterEnemyList[name].img;
    this.initiative = 0;
    this.isEnemy = true;
  }

  get alive() {
    if (this.currentHP <= 0) {
      return false;
    } else return true;
  }

  get attacks() {
    const attacks = {};
    const attackList = library.masterEnemyList[this.name].attacks;
    for (let i = 0; i < attackList.length; i++) {
      attacks[attackList[i]] = library.masterSkillList[attackList[i]];
    }
    return attacks;
  }

  get attack() {
    return this.attacks["bash"];
  }

  get currentHP() {
    return this.stats.maxHP - this.damage;
  }
  get gold() {
    return randomNumberGenerator(this.stats.goldMin, this.stats.goldMax);
  }

  get encounterName() {
    return `${this.name} ${this.number}`;
  }

  get healthState() {
    const healthPercent = this.currentHP / this.stats.maxHP;
    if (healthPercent === 1) {
      return `is <span class='green'>perfectly healthy</span>.`;
    } else if (healthPercent >= 0.75) {
      return `is <span class='green'>slightly wounded</span>.`;
    } else if (healthPercent >= 0.5) {
      return `is <span class='yellow'>wounded and breathing heavily</span>.`;
    } else if (healthPercent >= 0.25) {
      return `is <span class='orange'>grievously wounded</span>.`;
    } else if (healthPercent > 0) {
      return `is <span class='red'>struggling to stay standing</span>.`;
    } else {
      return `has <span class='red'>been defeated</span>.`;
    }
  }
}

module.exports = Enemy;
